import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { createDeploymentPlan, uploadDeployment, verifyDeployment } from './deploy-static.mjs';

function releaseFixture(t) {
    const root = mkdtempSync(resolve(tmpdir(), 'calendar-deploy-test-'));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    mkdirSync(resolve(root, 'built/nested'), { recursive: true });
    const files = {
        'index.html':
            '<meta name="app-version" content="abcd"><script src="/built/main.12345678.js"></script><link href="/built/main.12345678.css">',
        'service-worker.js': 'self.skipWaiting();',
        version: 'abcd',
        'built/version': '"abcd"',
        'built/version.json': '"abcd"',
        'built/main.12345678.js': 'console.log("abcd");\n',
        'built/main.12345678.js.map': '{}',
        'built/main.12345678.css': 'body {}',
        'built/nested/12345678.woff2': 'font',
        'manifest.json': '{}',
    };
    for (const [file, contents] of Object.entries(files)) writeFileSync(resolve(root, file), contents);
    return root;
}

function servedFile(root, file, policy) {
    return Buffer.concat([readFileSync(resolve(root, file)), Buffer.from(`\n200\n${policy}`)]);
}

test('assets precede shell; stable entrypoints get no-cache; old assets are never deleted', (t) => {
    const root = releaseFixture(t);
    const plan = createDeploymentPlan(root);
    assert.equal(plan.release, 'abcd');
    assert.equal(plan.assets[0][0], 'sync');
    assert.ok(plan.assets[0].includes('--add-header=Cache-Control:public, max-age=31536000, immutable'));
    assert.ok(plan.assets[0].includes('--exclude=version'));
    assert.ok(plan.assets[0].includes('--exclude=version.json'));
    const mutable = plan.assets[1];
    assert.ok(mutable.includes('--exclude=built/*'));
    assert.ok(!mutable.some((arg) => arg.startsWith('--add-header=')));
    for (const file of ['index.html', 'service-worker.js', 'version', 'built/version', 'built/version.json']) {
        assert.ok(mutable.includes(`--exclude=${file}`));
    }
    for (const command of plan.assets.filter((args) => args[0] === 'sync')) {
        assert.ok(command.includes('--no-delete-removed'));
        assert.ok(!command.includes('--delete-removed'));
    }
    assert.deepEqual(
        plan.shell.map((args) => args.at(-1)),
        ['s3://molitva.app/index.html', 's3://molitva.app/service-worker.js']
    );
    assert.equal(plan.announcements.at(-1).at(-1), 's3://molitva.app/built/version.json');
    for (const args of [...plan.shell, ...plan.announcements]) {
        assert.equal(args[0], 'put');
        assert.ok(args.includes('--add-header=Cache-Control:no-cache'));
    }
    assert.deepEqual(
        plan.assets.slice(2).map((args) => args[0]),
        ['put', 'put']
    );
});

test('preflight rejects missing, dev and inconsistent releases or unhashed build files', (t) => {
    for (const [file, contents] of [
        ['built/version.json', '"dev"'],
        ['built/version.json', 'null'],
        ['built/version.json', 'invalid json'],
        ['version', 'ffff'],
        ['built/version', '"ffff"'],
        ['index.html', '<meta name="app-version" content="ffff">'],
        ['index.html', '<meta name="app-version" content="abcd">'],
        ['index.html', '<meta name="app-version" content="abcd"><script src="/built/main.unhashed.js"></script>'],
        ['built/unhashed.js', 'mutable'],
    ]) {
        const root = releaseFixture(t);
        writeFileSync(resolve(root, file), contents);
        assert.throws(() => createDeploymentPlan(root), undefined, file);
    }
    const root = releaseFixture(t);
    rmSync(resolve(root, 'built/main.12345678.js'));
    assert.throws(() => createDeploymentPlan(root), /ENOENT/);
    const missingWorker = releaseFixture(t);
    rmSync(resolve(missingWorker, 'service-worker.js'));
    assert.throws(() => createDeploymentPlan(missingWorker), /ENOENT/);
});

test('verification checks exact bytes and Cache-Control, including binary bodies', (t) => {
    const root = releaseFixture(t);
    const plan = createDeploymentPlan(root);
    const policy = 'public, max-age=31536000, immutable';
    writeFileSync(resolve(root, 'built/nested/12345678.woff2'), Buffer.from([0, 255, 10, 13]));
    verifyDeployment(plan, ['built/nested/12345678.woff2'], () =>
        servedFile(root, 'built/nested/12345678.woff2', policy)
    );
    verifyDeployment(plan, ['index.html'], () => servedFile(root, 'index.html', 'no-cache'));
    for (const response of [
        servedFile(root, 'index.html', ''),
        servedFile(root, 'index.html', 'no-store'),
        Buffer.from('old shell\n200\nno-cache'),
        Buffer.from('not found\n404\nno-cache'),
    ])
        assert.throws(() => verifyDeployment(plan, ['index.html'], () => response), /verification failed/);
});

test('announce only after served shell verification; no uploads continue on failure', (t) => {
    const root = releaseFixture(t);
    const plan = createDeploymentPlan(root);
    const calls = [];
    const run = (command, args) => {
        calls.push([command, args]);
        if (command === 'curl') {
            const file = new URL(args.at(-1)).pathname.slice(1);
            return servedFile(
                root,
                file,
                plan.shellChecks.slice(0, 2).includes(file) ? 'public, max-age=31536000, immutable' : 'no-cache'
            );
        }
    };
    uploadDeployment(plan, run);
    const firstAnnouncement = calls.findIndex(
        ([command, args]) => command === 's3cmd' && args.at(-1) === 's3://molitva.app/version'
    );
    assert.equal(
        calls.slice(0, firstAnnouncement).filter(([command]) => command === 'curl').length,
        plan.shellChecks.length
    );
    assert.equal(calls.slice(firstAnnouncement).filter(([command]) => command === 'curl').length, 3);

    const failed = [];
    assert.throws(
        () =>
            uploadDeployment(plan, (command, args) => {
                failed.push([command, args]);
                if (command === 'curl') return Buffer.from('stale\n200\nno-cache');
            }),
        /verification failed/
    );
    assert.ok(
        !failed.some(
            ([command, args]) => command === 's3cmd' && plan.announcements.some((entry) => entry.at(-1) === args.at(-1))
        )
    );
    let attempts = 0;
    assert.throws(
        () =>
            uploadDeployment(plan, () => {
                attempts++;
                throw new Error('upload failed');
            }),
        /upload failed/
    );
    assert.equal(attempts, 1);
});

test('CLI rejects unknown modes before building or uploading', () => {
    const result = spawnSync(process.execPath, ['scripts/deploy-static.mjs', '--unknown'], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Usage:/);
});
