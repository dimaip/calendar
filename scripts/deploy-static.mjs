import { readdirSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const bucket = 's3://molitva.app/';
const origin = 'https://molitva.app/';
const immutable = 'public, max-age=31536000, immutable';
const announcements = ['version', 'built/version', 'built/version.json'];
const entrypoints = ['index.html', 'service-worker.js', ...announcements];
const hashedFile = /^(?:.*\/)?(?:[^/]+\.)?[a-f0-9]{8,}\.[^/]+$/;

// Validate the entire release before allowing any uploads. Only built files
// with content hashes may receive an immutable policy.
export function createDeploymentPlan(root) {
    const release = JSON.parse(readFileSync(resolve(root, 'built/version.json'), 'utf8'));
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    if (
        typeof release !== 'string' ||
        !/^[a-z0-9]{4,40}$/i.test(release) ||
        !html.includes(`<meta name="app-version" content="${release}">`) ||
        readFileSync(resolve(root, 'version'), 'utf8').trim() !== release ||
        JSON.parse(readFileSync(resolve(root, 'built/version'), 'utf8')) !== release
    ) {
        throw new Error('Missing or inconsistent production release identity; rebuild with a commit ID');
    }
    const builtFiles = readdirSync(resolve(root, 'built'), { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => relative(resolve(root, 'built'), resolve(entry.parentPath, entry.name)));
    if (builtFiles.some((file) => !['version', 'version.json'].includes(file) && !hashedFile.test(file))) {
        throw new Error('Unhashed files in built/: refusing to cache them as immutable');
    }
    const shellAssets = [
        ...new Set([...html.matchAll(/(?:src|href)="\/built\/([^"?#]+)"/g)].map((match) => `built/${match[1]}`)),
    ];
    if (!shellAssets.some((file) => /^built\/main\..+\.js$/.test(file))) {
        throw new Error('The app shell has no hashed main bundle');
    }
    for (const file of [...entrypoints, ...shellAssets]) {
        readFileSync(resolve(root, file));
        if (file.startsWith('built/') && !announcements.includes(file) && !hashedFile.test(file.slice(6))) {
            throw new Error(`Unhashed shell asset: ${file}`);
        }
    }
    const put = (file, policy) => [
        'put',
        `--add-header=Cache-Control:${policy}`,
        resolve(root, file),
        `${bucket}${file}`,
    ];
    return {
        root,
        release,
        assets: [
            [
                'sync',
                '--no-delete-removed',
                `--add-header=Cache-Control:${immutable}`,
                '--exclude=version',
                '--exclude=version.json',
                `${resolve(root, 'built')}/`,
                `${bucket}built/`,
            ],
            [
                'sync',
                '--no-delete-removed',
                '--exclude=built/*',
                ...entrypoints.map((file) => `--exclude=${file}`),
                `${resolve(root)}/`,
                bucket,
            ],
            // Sync skips unchanged bytes even when metadata is wrong. PUT the
            // small set of shell assets to make their headers self-correcting.
            ...shellAssets.map((file) => put(file, immutable)),
        ],
        shell: ['index.html', 'service-worker.js'].map((file) => put(file, 'no-cache')),
        announcements: announcements.map((file) => put(file, 'no-cache')),
        shellChecks: [...shellAssets, 'index.html', 'service-worker.js'],
    };
}

function runCommand(command, args, options = {}) {
    const result = spawnSync(command, args, { stdio: 'inherit', ...options });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`${command} failed (${result.status}): ${result.stderr || ''}`);
    return result.stdout;
}

export function verifyDeployment(plan, files, run = runCommand) {
    for (const file of files) {
        const output = run(
            'curl',
            [
                '--ipv4',
                '--fail',
                '--silent',
                '--show-error',
                '--retry',
                '2',
                '--retry-all-errors',
                '--connect-timeout',
                '10',
                '--max-time',
                '45',
                '--header',
                'Cache-Control: no-cache',
                '--write-out',
                '\n%{http_code}\n%header{cache-control}',
                new URL(file, origin).href,
            ],
            { stdio: 'pipe', maxBuffer: 20 * 1024 * 1024 }
        );
        // curl appends status/header metadata after the unmodified response body.
        const headerSeparator = output.lastIndexOf(10);
        const statusSeparator = output.lastIndexOf(10, headerSeparator - 1);
        const policy = output
            .subarray(headerSeparator + 1)
            .toString()
            .trim();
        const status = output.subarray(statusSeparator + 1, headerSeparator).toString();
        const expectedPolicy = entrypoints.includes(file) ? 'no-cache' : immutable;
        if (
            status !== '200' ||
            policy !== expectedPolicy ||
            !output.subarray(0, statusSeparator).equals(readFileSync(resolve(plan.root, file)))
        ) {
            throw new Error(`Production verification failed for ${file}: status ${status}, Cache-Control ${policy}`);
        }
        console.log(`Verified ${file}: ${policy}`);
    }
}

export function uploadDeployment(plan, run = runCommand) {
    for (const args of [...plan.assets, ...plan.shell]) run('s3cmd', args);
    // Do not announce a new version until its shell and controlling worker
    // are actually served with the intended bytes and headers.
    verifyDeployment(plan, plan.shellChecks, run);
    for (const args of plan.announcements) run('s3cmd', args);
    verifyDeployment(plan, announcements, run);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const mode = process.argv.slice(2);
        if (mode.length > 1 || (mode.length && !['--dry-run', '--verify-only'].includes(mode[0]))) {
            throw new Error('Usage: node scripts/deploy-static.mjs [--dry-run | --verify-only]');
        }
        const project = resolve(fileURLToPath(new URL('..', import.meta.url)));
        if (!mode.length) {
            const commit = runCommand('git', ['rev-parse', 'HEAD'], {
                cwd: project,
                stdio: 'pipe',
                encoding: 'utf8',
            }).trim();
            runCommand('yarn', ['build'], { cwd: project, env: { ...process.env, VERCEL_GITHUB_COMMIT_SHA: commit } });
        }
        const plan = createDeploymentPlan(resolve(project, 'www'));
        if (mode[0] === '--dry-run') {
            console.log(`Existing build ${plan.release}; no build, upload or network requests. Planned commands:`);
            for (const args of [...plan.assets, ...plan.shell, ...plan.announcements]) {
                console.log(['s3cmd', ...args].map((arg) => JSON.stringify(arg)).join(' '));
            }
            console.log('Verify shell bytes/headers before announcing; verify version endpoints afterward.');
        } else if (mode[0] === '--verify-only') {
            verifyDeployment(plan, [...plan.shellChecks, ...announcements]);
        } else {
            uploadDeployment(plan);
        }
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
