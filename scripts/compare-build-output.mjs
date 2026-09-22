import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function normalizeShellRevisions(worker) {
    const shellUrls = new Set([
        '/',
        '/?utm_source=homescreen',
        '/?utm_source=homescreen&from_home',
        '/?utm_source=homescreen&from_twa',
    ]);
    const found = new Set();
    const normalized = worker.replace(/\{'revision':'([^']+)','url':'([^']+)'\}/g, (entry, revision, url) => {
        if (!shellUrls.has(url)) return entry;
        assert.ok(!found.has(url), `Duplicate shell manifest entry: ${url}`);
        found.add(url);
        return `{'revision':'BUILD_NONCE','url':'${url}'}`;
    });
    assert.deepEqual(found, shellUrls, 'Expected all four original shell cache variants');
    return normalized;
}

export function compareBuildOutput(baselineDirectory, candidateDirectory) {
    const files = (directory) =>
        fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
            const name = path.join(directory, entry.name);
            return entry.isDirectory() ? files(name) : [name];
        });
    const baselineFiles = files(baselineDirectory)
        .map((file) => path.relative(baselineDirectory, file))
        .filter((file) => !file.endsWith('.map'))
        .sort();
    const candidateFiles = files(candidateDirectory)
        .map((file) => path.relative(candidateDirectory, file))
        .filter((file) => !file.endsWith('.map'))
        .sort();
    assert.deepEqual(candidateFiles, baselineFiles, 'Production file/chunk names changed');
    for (const file of baselineFiles) {
        const before = fs.readFileSync(path.join(baselineDirectory, file));
        const after = fs.readFileSync(path.join(candidateDirectory, file));
        if (file === 'service-worker.js') {
            assert.equal(
                normalizeShellRevisions(after.toString()),
                normalizeShellRevisions(before.toString()),
                'Service worker or precache changed beyond its existing random shell revisions'
            );
        } else {
            assert.ok(before.equals(after), `Production bytes changed: ${file}`);
        }
    }
    return baselineFiles.length;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const [, , baseline, candidate] = process.argv;
    assert.ok(
        baseline && candidate,
        'Usage: node scripts/compare-build-output.mjs BASELINE_WWW CANDIDATE_WWW (build both with identical version/environment)'
    );
    console.log(
        `Build equivalence passed: ${compareBuildOutput(path.resolve(baseline), path.resolve(candidate))} production files. Only source maps and existing random shell revisions excluded.`
    );
}
