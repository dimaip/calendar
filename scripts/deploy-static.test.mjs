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
    assert.equal(plan.assets.length, 2);
    assert.deepEqual(plan.shellAssets, ['built/main.12345678.js', 'built/main.12345678.css']);
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
                plan.shellAssets.includes(file) ? 'public, max-age=31536000, immutable' : 'no-cache'
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
    const firstShellUpload = calls.findIndex(
        ([command, args]) => command === 's3cmd' && args.at(-1) === 's3://molitva.app/index.html'
    );
    assert.equal(
        calls.slice(0, firstShellUpload).filter(([command]) => command === 'curl').length,
        plan.shellAssets.length
    );

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

test('new assets upload once and unchanged assets never upload during a repeat deployment', (t) => {
    const root = releaseFixture(t);
    const plan = createDeploymentPlan(root);
    const policy = 'public, max-age=31536000, immutable';
    const css = 'built/main.12345678.css';
    const remote = new Map([[css, { body: readFileSync(resolve(root, css)), policy }]]);
    const uploadedAssets = [];
    const requests = [];
    const run = (command, args) => {
        if (command === 'curl') {
            const file = new URL(args.at(-1)).pathname.slice(1);
            requests.push(file);
            const stored = remote.get(file);
            assert.ok(stored, `Must upload ${file} before verification`);
            return Buffer.concat([stored.body, Buffer.from(`\n200\n${stored.policy}`)]);
        }
        if (args[0] === 'sync' && args.at(-1) === 's3://molitva.app/built/') {
            for (const file of plan.shellAssets) {
                const body = readFileSync(resolve(root, file));
                if (!remote.get(file)?.body.equals(body)) {
                    uploadedAssets.push(file);
                    remote.set(file, { body, policy });
                }
            }
        } else if (args[0] === 'put') {
            const file = new URL(args.at(-1)).pathname.slice(1);
            if (plan.shellAssets.includes(file)) uploadedAssets.push(file);
            remote.set(file, {
                body: readFileSync(resolve(root, file)),
                policy: args.find((arg) => arg.startsWith('--add-header=Cache-Control:')).split(':')[1],
            });
        }
    };
    uploadDeployment(plan, run);
    assert.deepEqual(uploadedAssets, ['built/main.12345678.js']);
    assert.equal(requests.length, plan.shellChecks.length + plan.announcements.length);
    uploadedAssets.length = 0;
    requests.length = 0;
    uploadDeployment(plan, run);
    assert.deepEqual(uploadedAssets, []);
    assert.equal(requests.length, plan.shellChecks.length + plan.announcements.length);
});

test('only incorrect cache headers trigger a repair, verified before publishing the shell', (t) => {
    const root = releaseFixture(t);
    const plan = createDeploymentPlan(root);
    const broken = plan.shellAssets[0];
    for (const incorrectPolicy of ['', 'no-cache']) {
        const calls = [];
        let repaired = false;
        uploadDeployment(plan, (command, args) => {
            const file = new URL(args.at(-1)).pathname.slice(1);
            calls.push({ command, action: args[0], file });
            if (command === 's3cmd' && args[0] === 'put' && file === broken) {
                assert.ok(args.includes('--add-header=Cache-Control:public, max-age=31536000, immutable'));
                repaired = true;
            }
            if (command === 'curl') {
                return servedFile(
                    root,
                    file,
                    file === broken && !repaired
                        ? incorrectPolicy
                        : plan.shellAssets.includes(file)
                          ? 'public, max-age=31536000, immutable'
                          : 'no-cache'
                );
            }
        });
        const firstShellUpload = calls.findIndex(({ action, file }) => action === 'put' && file === 'index.html');
        assert.deepEqual(
            calls.slice(0, firstShellUpload).filter(({ file }) => file === broken),
            [
                { command: 'curl', action: '--ipv4', file: broken },
                { command: 's3cmd', action: 'put', file: broken },
                { command: 'curl', action: '--ipv4', file: broken },
            ]
        );
        assert.equal(calls.filter(({ action, file }) => action === 'put' && plan.shellAssets.includes(file)).length, 1);
    }
});

test('bad asset responses and failed repairs block the shell without retrying PUTs', (t) => {
    const root = releaseFixture(t);
    const plan = createDeploymentPlan(root);
    const broken = plan.shellAssets[0];
    for (const failure of ['wrong bytes', 'not found', 'network', 'upload', 'unchanged header', 'corrupt repair']) {
        const puts = [];
        assert.throws(
            () =>
                uploadDeployment(plan, (command, args) => {
                    if (command === 's3cmd' && args[0] === 'put') {
                        puts.push(new URL(args.at(-1)).pathname.slice(1));
                        if (failure === 'upload') throw new Error('repair upload failed');
                    }
                    if (command !== 'curl') return;
                    if (failure === 'network') throw new Error('network failed');
                    if (failure === 'not found') return Buffer.from('not found\n404\nno-cache');
                    if (failure === 'wrong bytes' || (failure === 'corrupt repair' && puts.length)) {
                        return Buffer.from('incorrect bytes\n200\npublic, max-age=31536000, immutable');
                    }
                    return servedFile(root, broken, 'no-cache');
                }),
            /failed/,
            failure
        );
        assert.deepEqual(puts, ['upload', 'unchanged header', 'corrupt repair'].includes(failure) ? [broken] : []);
    }
});

test('CLI rejects unknown modes before building or uploading', () => {
    const result = spawnSync(process.execPath, ['scripts/deploy-static.mjs', '--unknown'], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Usage:/);
});
