import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { prepareIosUpdate, publishIosUpdate } from './publish-ios-update.mjs';

function release(t) {
    const temp = mkdtempSync(join(tmpdir(), 'molitva-ios-package-test-'));
    t.after(() => rmSync(temp, { recursive: true, force: true }));
    const root = join(temp, 'www');
    mkdirSync(join(root, 'built'), { recursive: true });
    for (const [path, content] of Object.entries({
        'index.html': '<meta name="app-version" content="abcd"><script src="/built/main.11223344.js"></script>',
        version: 'abcd',
        'built/version': '"abcd"',
        'built/version.json': '"abcd"',
        'built/main.11223344.js': 'entrypoint',
        'built/reading.55667788.js': 'lazy chunk',
        'built/reading.55667788.js.map': '{}',
        'service-worker.js': 'web worker',
    }))
        writeFileSync(join(root, path), content);
    const output = join(temp, 'release');
    return { root, output, manifest: prepareIosUpdate(root, '1.0.47', output) };
}

test('the iOS archive includes the shell and lazy chunks, with the shell at the archive root', (t) => {
    const { output, manifest } = release(t);
    const entries = execFileSync('unzip', ['-Z1', join(output, 'bundle.zip')], { encoding: 'utf8' })
        .trim()
        .split('\n');
    assert.deepEqual(entries, [
        'built/main.11223344.js',
        'built/reading.55667788.js',
        'built/version',
        'built/version.json',
        'index.html',
        'version',
    ]);
    assert.match(manifest.sha256, /^[a-f0-9]{64}$/);
    assert.equal(manifest.nativeVersion, '1.0.47');
    assert.equal(manifest.release, 'abcd');
});

test('publishing verifies the archive before exposing its manifest', (t) => {
    const { output, manifest } = release(t);
    const objects = new Map();
    const operations = [];
    publishIosUpdate(output, (command, args) => {
        if (command === 's3cmd') {
            const [, , cache, local, destination] = args;
            const remote = destination.slice('s3://molitva.app/'.length);
            objects.set(remote, {
                body: readFileSync(local),
                policy: cache.split(':')[1],
                type: args[1].split('=')[1],
            });
            operations.push(['put', remote]);
        } else {
            assert.equal(command, 'curl');
            const path = new URL(args.at(-1)).pathname.slice(1);
            const { body, policy, type } = objects.get(path);
            writeFileSync(args[args.indexOf('--output') + 1], body);
            operations.push(['verify', path]);
            return `200\n${policy}\n${type}`;
        }
    });
    const archive = `ios-updates/1.0.47/bundles/${manifest.sha256}.zip`;
    const pointer = 'ios-updates/1.0.47/manifest.json';
    assert.deepEqual(operations, [
        ['put', archive],
        ['verify', archive],
        ['put', pointer],
        ['verify', pointer],
    ]);
});

test('a corrupt archive, or an archive missing from the public origin, cannot advance the manifest', (t) => {
    const { output } = release(t);
    const commands = [];
    assert.throws(
        () =>
            publishIosUpdate(output, (command, args) => {
                commands.push([command, args]);
                if (command === 'curl') throw new Error('Archive missing from origin');
            }),
        /Archive missing from origin/
    );
    assert.deepEqual(
        commands.map(([command]) => command),
        ['s3cmd', 'curl']
    );
    writeFileSync(join(output, 'bundle.zip'), 'corrupted');
    assert.throws(
        () => publishIosUpdate(output, () => assert.fail('Corrupt archive must never upload')),
        /does not match/
    );
});
