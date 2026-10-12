import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
    constants,
    copyFileSync,
    cpSync,
    mkdirSync,
    mkdtempSync,
    readFileSync,
    readdirSync,
    rmSync,
    symlinkSync,
    unlinkSync,
    writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { assertLocalDependencies } from './assert-local-dependencies.mjs';
import { compareBuildOutput } from './compare-build-output.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
assertLocalDependencies(root);
const fixture = mkdtempSync(join(tmpdir(), 'calendar-reproducibility-'));
const env = { ...process.env, VERCEL_GITHUB_COMMIT_SHA: 'b17d' };

function build(directory) {
    const start = Date.now();
    const result = spawnSync('yarn', ['build', '--stats=errors-warnings'], {
        cwd: directory,
        env,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
    });
    if (result.error || result.status !== 0) {
        throw new Error(`Build failed: ${result.error || result.stderr}\n${result.stdout}`);
    }
    console.log(`Built ${directory} in ${((Date.now() - start) / 1000).toFixed(1)}s`);
}

try {
    // Copy tracked inputs, including staged additions, but never unrelated
    // untracked files, credentials, local caches, or generated build output.
    const tracked = spawnSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' });
    assert.equal(tracked.status, 0, tracked.stderr);
    for (const file of tracked.stdout.split('\0').filter(Boolean)) {
        const target = join(fixture, file);
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(join(root, file), target);
    }

    // Exercise the actual production-config gate before a build can emit files.
    symlinkSync(join(root, 'node_modules'), join(fixture, 'node_modules'), 'junction');
    const shared = spawnSync(process.execPath, ['--input-type=module', '--eval', "await import('./webpack.prod.js')"], {
        cwd: fixture,
        env,
        encoding: 'utf8',
    });
    assert.notEqual(shared.status, 0, 'A shared dependency layout must not build');
    assert.match(shared.stderr, /checkout-local node_modules/);
    unlinkSync(join(fixture, 'node_modules'));

    // Use the exact installed dependency bytes in an independent, local tree.
    // Reflinks are an optimization where supported, not a prerequisite.
    cpSync(join(root, 'node_modules'), join(fixture, 'node_modules'), {
        recursive: true,
        verbatimSymlinks: true,
        mode: constants.COPYFILE_FICLONE,
    });
    build(root);
    build(fixture);
    const count = compareBuildOutput(join(root, 'www'), join(fixture, 'www'));
    console.log(`Cross-checkout equivalence: ${count} production files match (excluding maps and shell nonces).`);

    // A genuine UI-only edit must change the shell, not every lazy MDX chunk.
    const main = join(fixture, 'app/containers/Main/Main.tsx');
    const source = readFileSync(main, 'utf8');
    assert.ok(source.includes('Богослужебные чтения'), 'UI probe target is missing');
    writeFileSync(main, source.replace('Богослужебные чтения', 'Богослужебные чтения — build probe'));
    build(fixture);
    const originalBuilt = join(root, 'www/built');
    const candidateBuilt = join(fixture, 'www/built');
    const numbered = (directory) =>
        readdirSync(directory)
            .filter((file) => /^\d+\.[a-f0-9]+\.js$/.test(file))
            .sort();
    const chunks = numbered(originalBuilt);
    assert.deepEqual(numbered(candidateBuilt), chunks, 'A UI edit changed unrelated lazy chunk names');
    for (const file of chunks) {
        assert.ok(readFileSync(join(originalBuilt, file)).equals(readFileSync(join(candidateBuilt, file))), file);
    }
    assert.notDeepEqual(
        readdirSync(originalBuilt).filter((file) => /^main\..+\.js$/.test(file)),
        readdirSync(candidateBuilt).filter((file) => /^main\..+\.js$/.test(file)),
        'The UI probe must actually change the main bundle'
    );
    console.log(`UI-only edit: all ${chunks.length} numbered lazy chunks keep identical names and bytes.`);
} finally {
    rmSync(fixture, { recursive: true, force: true });
}
