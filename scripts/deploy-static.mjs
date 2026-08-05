import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { createGzip, constants as zlibConstants } from 'node:zlib';

import {
    IMMUTABLE_CACHE_CONTROL,
    REVALIDATE_CACHE_CONTROL,
    isCompressibleStaticAsset,
    isImmutableBuiltAsset,
} from '../app/utils/staticDelivery.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const staticRoot = path.join(repositoryRoot, 'www');
const argumentsSet = new Set(process.argv.slice(2));
const dryRun = argumentsSet.has('--dry-run');
const prepareOnly = argumentsSet.has('--prepare-only');
const bucketArgument = process.argv.find((argument) => argument.startsWith('--bucket='));
const bucket = (bucketArgument?.slice('--bucket='.length) || 's3://molitva.app').replace(/\/+$/u, '');

const listFiles = (directory) => {
    const files = [];
    const pendingDirectories = [directory];

    while (pendingDirectories.length > 0) {
        const currentDirectory = pendingDirectories.pop();
        for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
            const entryPath = path.join(currentDirectory, entry.name);
            if (entry.isDirectory()) {
                pendingDirectories.push(entryPath);
            } else if (entry.isFile()) {
                files.push(entryPath);
            }
        }
    }

    return files;
};

const runS3cmd = (commandArguments) => {
    const dryRunArguments = dryRun ? ['--dry-run'] : [];
    const result = spawnSync('s3cmd', [...commandArguments, ...dryRunArguments], {
        cwd: repositoryRoot,
        stdio: 'inherit',
    });

    if (result.error) {
        throw result.error;
    }
    if (result.status !== 0) {
        throw new Error(`s3cmd exited with status ${result.status ?? 'unknown'}.`);
    }
};

export const createDeploymentPlan = ({
    deploymentBucket,
    immutableRoot,
    revalidateRoot,
    sourceRoot,
    versionFiles = ['version', 'version.json'].filter((versionFile) =>
        fs.existsSync(path.join(sourceRoot, 'built', versionFile))
    ),
}) => [
    {
        phase: 'immutable-uncompressed',
        commandArguments: [
            'sync',
            `${path.join(sourceRoot, 'built')}/`,
            `${deploymentBucket}/built/`,
            '--exclude=version',
            '--exclude=version.json',
            `--add-header=Cache-Control:${IMMUTABLE_CACHE_CONTROL}`,
        ],
    },
    {
        phase: 'immutable-gzip',
        commandArguments: [
            'sync',
            `${immutableRoot}/`,
            `${deploymentBucket}/`,
            '--add-header=Content-Encoding:gzip',
            `--add-header=Cache-Control:${IMMUTABLE_CACHE_CONTROL}`,
        ],
    },
    {
        phase: 'mutable-shell',
        commandArguments: [
            'sync',
            `${sourceRoot}/`,
            `${deploymentBucket}/`,
            '--exclude=built/*',
            `--add-header=Cache-Control:${REVALIDATE_CACHE_CONTROL}`,
        ],
    },
    ...versionFiles.map((versionFile) => ({
        phase: `mutable-version:${versionFile}`,
        commandArguments: [
            'put',
            path.join(sourceRoot, 'built', versionFile),
            `${deploymentBucket}/built/${versionFile}`,
            `--add-header=Cache-Control:${REVALIDATE_CACHE_CONTROL}`,
        ],
    })),
    {
        phase: 'mutable-gzip',
        commandArguments: [
            'sync',
            `${revalidateRoot}/`,
            `${deploymentBucket}/`,
            '--add-header=Content-Encoding:gzip',
            `--add-header=Cache-Control:${REVALIDATE_CACHE_CONTROL}`,
        ],
    },
];

const compressStaticFiles = async (temporaryRoot) => {
    const immutableRoot = path.join(temporaryRoot, 'immutable');
    const revalidateRoot = path.join(temporaryRoot, 'revalidate');
    let compressedFiles = 0;
    let originalBytes = 0;
    let compressedBytes = 0;

    for (const sourcePath of listFiles(staticRoot)) {
        const relativePath = path.relative(staticRoot, sourcePath);
        if (!isCompressibleStaticAsset(relativePath)) {
            continue;
        }

        const targetRoot = isImmutableBuiltAsset(relativePath) ? immutableRoot : revalidateRoot;
        const targetPath = path.join(targetRoot, relativePath);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        await pipeline(
            fs.createReadStream(sourcePath),
            createGzip({
                level: zlibConstants.Z_BEST_COMPRESSION,
            }),
            fs.createWriteStream(targetPath)
        );

        compressedFiles += 1;
        originalBytes += fs.statSync(sourcePath).size;
        compressedBytes += fs.statSync(targetPath).size;
    }

    return {
        compressedFiles,
        originalBytes,
        compressedBytes,
        immutableRoot,
        revalidateRoot,
    };
};

const deploy = async () => {
    if (!fs.existsSync(path.join(staticRoot, 'index.html'))) {
        throw new Error('No production build found below www/. Run yarn build first.');
    }

    const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'molitva-static-deploy-'));

    try {
        const compressed = await compressStaticFiles(temporaryRoot);
        const ratio = compressed.originalBytes
            ? ((1 - compressed.compressedBytes / compressed.originalBytes) * 100).toFixed(2)
            : '0.00';

        if (prepareOnly) {
            console.log(
                `Prepared ${compressed.compressedFiles} compressed files: ` +
                    `${compressed.originalBytes} B -> ${compressed.compressedBytes} B (${ratio}% smaller).`
            );
            process.exitCode = 0;
        } else {
            // Publish all content-addressed assets before any shell, service worker,
            // or version metadata can expose references to them. Deliberately omit
            // --delete-removed so already-open clients retain their older hashes.
            const deploymentPlan = createDeploymentPlan({
                deploymentBucket: bucket,
                immutableRoot: compressed.immutableRoot,
                revalidateRoot: compressed.revalidateRoot,
                sourceRoot: staticRoot,
            });
            for (const step of deploymentPlan) {
                runS3cmd(step.commandArguments);
            }

            console.log(
                `${dryRun ? 'Dry run prepared' : 'Deployed'} ${compressed.compressedFiles} compressed files: ` +
                    `${compressed.originalBytes} B -> ${compressed.compressedBytes} B (${ratio}% smaller).`
            );
        }
    } finally {
        fs.rmSync(temporaryRoot, { recursive: true, force: true });
    }
};

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
    await deploy();
}
