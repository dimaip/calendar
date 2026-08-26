import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const BUILD_FINGERPRINT_POLICY = 'self-verified-build-artifacts-v1';
export const HARNESS_FINGERPRINT_POLICY = 'self-verified-performance-harness-v1';

const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const describeFile = (root, relativePath) => {
    const absolutePath = path.join(root, relativePath);
    if (!fs.statSync(absolutePath, { throwIfNoEntry: false })?.isFile()) {
        throw new Error(`Build fingerprint requires ${relativePath} under ${root}.`);
    }
    const content = fs.readFileSync(absolutePath);
    return {
        bytes: content.byteLength,
        path: relativePath.split(path.sep).join('/'),
        sha256: sha256(content),
    };
};

const listFiles = (root, relativeDirectory) => {
    const directory = path.join(root, relativeDirectory);
    if (!fs.statSync(directory, { throwIfNoEntry: false })?.isDirectory()) {
        throw new Error(`Build fingerprint requires ${relativeDirectory}/ under ${root}.`);
    }

    const files = [];
    const visit = (absoluteDirectory) => {
        for (const entry of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
            const absolutePath = path.join(absoluteDirectory, entry.name);
            if (entry.isDirectory()) {
                visit(absolutePath);
            } else if (entry.isFile()) {
                files.push(path.relative(root, absolutePath));
            }
        }
    };
    visit(directory);
    return files.sort();
};

export const createBuildFingerprint = (buildRoot) => {
    const root = path.resolve(buildRoot);
    const index = describeFile(root, 'index.html');
    const serviceWorker = describeFile(root, 'service-worker.js');
    const assets = listFiles(root, 'built').map((relativePath) => describeFile(root, relativePath));
    const precache = assets.filter(({ path: assetPath }) => /(?:^|\/)precache(?:[.-]|$)/u.test(assetPath));
    if (precache.length === 0) {
        throw new Error(`Build fingerprint found no precache artifact under ${path.join(root, 'built')}.`);
    }

    const assetInventory = {
        bytes: assets.reduce((total, asset) => total + asset.bytes, 0),
        count: assets.length,
        digest: sha256(JSON.stringify(assets)),
    };
    const material = {
        assetInventory,
        index,
        precache,
        serviceWorker,
    };

    return {
        algorithm: 'sha256',
        assetInventory,
        digest: sha256(JSON.stringify(material)),
        index,
        policy: BUILD_FINGERPRINT_POLICY,
        precache,
        root,
        schemaVersion: 1,
        serviceWorker,
    };
};

export const createHarnessFingerprint = (projectRoot) => {
    const root = path.resolve(projectRoot);
    const files = [
        ...listFiles(root, 'scripts/performance').filter(
            (relativePath) => relativePath.endsWith('.mjs') && !relativePath.endsWith('.test.mjs')
        ),
        'package.json',
        'yarn.lock',
    ]
        .sort()
        .map((relativePath) => describeFile(root, relativePath));
    const inventory = {
        bytes: files.reduce((total, file) => total + file.bytes, 0),
        count: files.length,
        digest: sha256(JSON.stringify(files)),
    };
    return {
        algorithm: 'sha256',
        digest: sha256(JSON.stringify({ inventory, policy: HARNESS_FINGERPRINT_POLICY })),
        inventory,
        policy: HARNESS_FINGERPRINT_POLICY,
        root,
        schemaVersion: 1,
    };
};

export const verifyBuildFingerprint = (recorded, buildRoot) => {
    const issues = [];
    if (!recorded || typeof recorded !== 'object' || Array.isArray(recorded)) {
        return { actual: null, issues: ['buildFingerprint must be an object.'], valid: false };
    }
    if (recorded.algorithm !== 'sha256') issues.push('buildFingerprint.algorithm must be "sha256".');
    if (recorded.policy !== BUILD_FINGERPRINT_POLICY) {
        issues.push(`buildFingerprint.policy must be "${BUILD_FINGERPRINT_POLICY}".`);
    }
    if (typeof buildRoot !== 'string' || buildRoot.length === 0) {
        issues.push('Build provenance is missing its root path.');
        return { actual: null, issues, valid: false };
    }

    const expectedRoot = path.resolve(buildRoot);
    if (recorded.root !== expectedRoot) {
        issues.push(
            `buildFingerprint.root is ${JSON.stringify(recorded.root)}; expected ${JSON.stringify(expectedRoot)}.`
        );
    }

    let actual = null;
    try {
        actual = createBuildFingerprint(expectedRoot);
        for (const property of [
            'algorithm',
            'assetInventory',
            'digest',
            'index',
            'policy',
            'precache',
            'root',
            'schemaVersion',
            'serviceWorker',
        ]) {
            if (JSON.stringify(recorded[property]) !== JSON.stringify(actual[property])) {
                issues.push(`buildFingerprint.${property} does not match the build artifacts at ${expectedRoot}.`);
            }
        }
    } catch (error) {
        issues.push(`Build fingerprint could not be verified at ${expectedRoot}: ${String(error?.message ?? error)}`);
    }

    return { actual, issues, valid: issues.length === 0 };
};

export const verifyHarnessFingerprint = (recorded, projectRoot) => {
    const issues = [];
    if (!recorded || typeof recorded !== 'object' || Array.isArray(recorded)) {
        return { actual: null, issues: ['harnessFingerprint must be an object.'], valid: false };
    }
    if (recorded.algorithm !== 'sha256') issues.push('harnessFingerprint.algorithm must be "sha256".');
    if (recorded.policy !== HARNESS_FINGERPRINT_POLICY) {
        issues.push(`harnessFingerprint.policy must be "${HARNESS_FINGERPRINT_POLICY}".`);
    }
    if (typeof projectRoot !== 'string' || projectRoot.length === 0) {
        issues.push('Harness provenance is missing its project root path.');
        return { actual: null, issues, valid: false };
    }

    const expectedRoot = path.resolve(projectRoot);
    if (recorded.root !== expectedRoot) {
        issues.push(
            `harnessFingerprint.root is ${JSON.stringify(recorded.root)}; expected ${JSON.stringify(expectedRoot)}.`
        );
    }
    let actual = null;
    try {
        actual = createHarnessFingerprint(expectedRoot);
        for (const property of ['algorithm', 'digest', 'inventory', 'policy', 'root', 'schemaVersion']) {
            if (JSON.stringify(recorded[property]) !== JSON.stringify(actual[property])) {
                issues.push(`harnessFingerprint.${property} does not match the harness sources at ${expectedRoot}.`);
            }
        }
    } catch (error) {
        issues.push(`Harness fingerprint could not be verified at ${expectedRoot}: ${String(error?.message ?? error)}`);
    }
    return { actual, issues, valid: issues.length === 0 };
};
