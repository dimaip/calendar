import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDeploymentPlan } from './deploy-static.mjs';

const bucket = 's3://molitva.app/';
const origin = 'https://molitva.app/';
const immutable = 'public, max-age=31536000, immutable';
const nativeVersionPattern = /^\d+\.\d+\.\d+$/;
const checksumPattern = /^[a-f0-9]{64}$/;

function runCommand(command, args, options = {}) {
    const result = spawnSync(command, args, { stdio: 'inherit', ...options });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`${command} failed (${result.status})`);
    return result.stdout;
}

export function prepareIosUpdate(root, nativeVersion, output, run = runCommand) {
    if (!nativeVersionPattern.test(nativeVersion)) throw new Error('Expected an iOS marketing version, such as 1.0.47');
    const { release } = createDeploymentPlan(root);
    if (resolve(output) === resolve(root) || resolve(output).startsWith(resolve(root) + sep)) {
        throw new Error('Prepare iOS artifacts outside the web deployment directory');
    }
    mkdirSync(dirname(output), { recursive: true });
    mkdirSync(output);
    const temporaryZip = join(output, 'bundle.zip');
    const files = readdirSync(root, { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => relative(root, join(entry.parentPath, entry.name)))
        .filter((file) => !file.startsWith('.') && !file.startsWith('service-worker.js') && !file.endsWith('.map'))
        .sort();
    run('zip', ['-X', '-q', temporaryZip, '-@'], {
        cwd: root,
        input: files.join('\n') + '\n',
        stdio: ['pipe', 'inherit', 'inherit'],
    });

    const sha256 = createHash('sha256').update(readFileSync(temporaryZip)).digest('hex');
    const manifest = { nativeVersion, release, sha256 };
    writeFileSync(join(output, 'manifest.json'), JSON.stringify(manifest) + '\n');
    return manifest;
}

function putAndVerify(localPath, remotePath, type, policy, run) {
    run('s3cmd', [
        'put',
        `--mime-type=${type}`,
        `--add-header=Cache-Control:${policy}`,
        localPath,
        `${bucket}${remotePath}`,
    ]);
    const temp = mkdtempSync(join(tmpdir(), 'molitva-ios-verify-'));
    try {
        const responsePath = join(temp, 'response');
        const headers = run(
            'curl',
            [
                '--fail',
                '--silent',
                '--show-error',
                '--connect-timeout',
                '10',
                '--max-time',
                '90',
                '--header',
                'Cache-Control: no-cache',
                '--output',
                responsePath,
                '--write-out',
                '%{http_code}\n%header{cache-control}\n%header{content-type}',
                new URL(remotePath, origin).href,
            ],
            { stdio: 'pipe', encoding: 'utf8' }
        );
        const [status, cacheControl, contentType] = headers.split('\n');
        if (
            status !== '200' ||
            cacheControl !== policy ||
            contentType.split(';')[0] !== type ||
            !readFileSync(responsePath).equals(readFileSync(localPath))
        ) {
            throw new Error(`Verification failed for ${remotePath}`);
        }
    } finally {
        rmSync(temp, { recursive: true, force: true });
    }
}

export function publishIosUpdate(directory, run = runCommand) {
    const manifestPath = join(directory, 'manifest.json');
    const bundlePath = join(directory, 'bundle.zip');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    if (
        !manifest ||
        typeof manifest.nativeVersion !== 'string' ||
        !nativeVersionPattern.test(manifest.nativeVersion) ||
        typeof manifest.sha256 !== 'string' ||
        !checksumPattern.test(manifest.sha256) ||
        createHash('sha256').update(readFileSync(bundlePath)).digest('hex') !== manifest.sha256
    ) {
        throw new Error('The manifest does not match the iOS bundle');
    }

    const prefix = `ios-updates/${manifest.nativeVersion}`;
    putAndVerify(bundlePath, `${prefix}/bundles/${manifest.sha256}.zip`, 'application/zip', immutable, run);
    putAndVerify(manifestPath, `${prefix}/manifest.json`, 'application/json', 'no-store', run);
    return manifest;
}

function pauseIosUpdates(nativeVersion) {
    if (!nativeVersionPattern.test(nativeVersion)) throw new Error('Expected an iOS marketing version');
    const temporary = mkdtempSync(join(tmpdir(), 'molitva-ios-pause-'));
    try {
        const manifest = join(temporary, 'manifest.json');
        writeFileSync(manifest, 'null\n');
        putAndVerify(
            manifest,
            `ios-updates/${nativeVersion}/manifest.json`,
            'application/json',
            'no-store',
            runCommand
        );
    } finally {
        rmSync(temporary, { recursive: true, force: true });
    }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const [command, target, output, ...extra] = process.argv.slice(2);
        if (command === 'prepare' && target && output && !extra.length) {
            const { release } = prepareIosUpdate(
                fileURLToPath(new URL('../www', import.meta.url)),
                target,
                resolve(output)
            );
            console.log(`Prepared ${release} for iOS ${target} in ${resolve(output)}`);
        } else if (command === 'publish' && target && !output) {
            const { release, nativeVersion } = publishIosUpdate(resolve(target));
            console.log(`Published ${release} for iOS ${nativeVersion}`);
        } else if (command === 'pause' && target && !output) {
            pauseIosUpdates(target);
            console.log(`Paused new downloads for iOS ${target}`);
        } else {
            throw new Error(
                'Usage: yarn ios:updates prepare <native-version> <new-output-dir> | publish <output-dir> | pause <native-version>'
            );
        }
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
