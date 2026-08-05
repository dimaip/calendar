import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import {
    loadThirdPartyRuntimeSnapshot,
    matchKnownThirdPartyRuntimeSink,
    matchThirdPartyScriptUrl,
    THIRD_PARTY_RUNTIME_POLICY,
    THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
    THIRD_PARTY_SCRIPT_CLASSES,
} from './third-party-runtime.mjs';

const digest = (body) => createHash('sha256').update(body).digest('hex');

const canonicalTimestamp = (value) =>
    typeof value === 'string' && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;

const urlForDiagnostics = (value) => {
    try {
        const url = new URL(value);
        return `${url.origin}${url.pathname}`;
    } catch {
        return '[invalid URL]';
    }
};

export const createThirdPartyRuntimeCaptureCollector = ({ applicationOrigin }) => {
    const expectedOrigin = new URL(applicationOrigin).origin;
    const requestCounts = Object.fromEntries(THIRD_PARTY_SCRIPT_CLASSES.map((className) => [className, 0]));
    const responseCounts = Object.fromEntries(THIRD_PARTY_SCRIPT_CLASSES.map((className) => [className, 0]));
    const entries = new Map();
    const failures = [];
    let lastExternalScriptActivityAt = null;

    const recordFailure = (message) => {
        failures.push(message);
        lastExternalScriptActivityAt = Date.now();
    };

    const inspectRequest = ({ method = 'GET', postData = null, redirectedFrom = false, resourceType, url }) => {
        let requestUrl;
        try {
            requestUrl = new URL(url);
        } catch {
            recordFailure(`External script request has an invalid URL: ${JSON.stringify(url)}.`);
            return { action: 'abort', match: null };
        }
        if (requestUrl.origin === expectedOrigin) return { action: 'continue', match: null };
        // Capture has no reason to send product API calls or telemetry. Only the
        // five allowlisted script responses are permitted to leave the context.
        if (resourceType !== 'script') return { action: 'abort', match: null };
        if (matchKnownThirdPartyRuntimeSink(method, resourceType, requestUrl, postData)) {
            return { action: 'abort', match: null };
        }

        lastExternalScriptActivityAt = Date.now();
        const match = matchThirdPartyScriptUrl(url);
        if (!match) {
            recordFailure(`Unknown external script request: ${urlForDiagnostics(url)}.`);
            return { action: 'abort', match: null };
        }

        requestCounts[match.className] += 1;
        if (redirectedFrom) {
            recordFailure(`Redirected third-party script request is forbidden: ${urlForDiagnostics(url)}.`);
        }
        if (requestCounts[match.className] !== 1) {
            recordFailure(`Third-party script ${match.className} was requested more than once.`);
        }
        return { action: failures.length === 0 ? 'continue' : 'abort', match };
    };

    const recordResponse = ({ body, contentType, redirectedFrom = false, resourceType, status, url }) => {
        if (resourceType !== 'script') return;

        let responseUrl;
        try {
            responseUrl = new URL(url);
        } catch {
            recordFailure(`External script response has an invalid URL: ${JSON.stringify(url)}.`);
            return;
        }
        if (responseUrl.origin === expectedOrigin) return;

        lastExternalScriptActivityAt = Date.now();
        const match = matchThirdPartyScriptUrl(url);
        if (!match) {
            recordFailure(`Unknown external script response: ${urlForDiagnostics(url)}.`);
            return;
        }

        responseCounts[match.className] += 1;
        if (redirectedFrom || (status >= 300 && status < 400)) {
            recordFailure(`Redirected third-party script response is forbidden: ${status} ${urlForDiagnostics(url)}.`);
        }
        if (responseCounts[match.className] !== 1) {
            recordFailure(`Third-party script ${match.className} returned more than one response.`);
        }
        if (status !== 200) {
            recordFailure(`Third-party script ${match.className} returned status ${status}; expected 200.`);
        }
        if (typeof contentType !== 'string' || !/javascript/iu.test(contentType)) {
            recordFailure(`Third-party script ${match.className} returned a non-JavaScript content type.`);
        }
        if (!Buffer.isBuffer(body) || body.byteLength === 0) {
            recordFailure(`Third-party script ${match.className} returned an empty or invalid body.`);
        }
        if (failures.length > 0) return;

        entries.set(match.className, {
            body,
            bytes: body.byteLength,
            canonicalUrl: match.canonicalUrl,
            className: match.className,
            contentType,
            sha256: digest(body),
            status,
            // Persist only the canonical allowlisted URL. Volatile cx/gtm values are not fixture provenance.
            url: match.canonicalUrl,
        });
    };

    const assertHealthy = () => {
        if (failures.length > 0) {
            throw new Error(`Third-party script capture failed: ${failures.join(' ')}`);
        }
    };

    const assertComplete = () => {
        const missing = THIRD_PARTY_SCRIPT_CLASSES.filter(
            (className) => requestCounts[className] !== 1 || responseCounts[className] !== 1 || !entries.has(className)
        );
        if (failures.length > 0 || missing.length > 0) {
            throw new Error(
                `Third-party script capture was incomplete: ${JSON.stringify({
                    failures,
                    missing,
                    requestCounts,
                    responseCounts,
                })}.`
            );
        }
        return THIRD_PARTY_SCRIPT_CLASSES.map((className) => entries.get(className));
    };

    return {
        assertComplete,
        assertHealthy,
        inspectRequest,
        isComplete: () =>
            failures.length === 0 &&
            THIRD_PARTY_SCRIPT_CLASSES.every(
                (className) =>
                    requestCounts[className] === 1 && responseCounts[className] === 1 && entries.has(className)
            ),
        lastExternalScriptActivityAt: () => lastExternalScriptActivityAt,
        recordFailure,
        recordResponse,
    };
};

export const assertThirdPartyRuntimeCaptureOutputAvailable = async (outputDirectory) => {
    const absoluteOutputDirectory = path.resolve(outputDirectory);
    const parent = path.dirname(absoluteOutputDirectory);
    const parentStat = await fs.stat(parent).catch((error) => {
        if (error?.code === 'ENOENT') {
            throw new Error(`Capture output parent directory does not exist: ${parent}.`);
        }
        throw error;
    });
    if (!parentStat.isDirectory()) throw new Error(`Capture output parent is not a directory: ${parent}.`);

    const outputStat = await fs.lstat(absoluteOutputDirectory).catch((error) => {
        if (error?.code === 'ENOENT') return null;
        throw error;
    });
    if (outputStat?.isSymbolicLink() || (outputStat && !outputStat.isDirectory())) {
        throw new Error('Capture output must be a new path or an existing empty directory, not a file or symlink.');
    }
    if (outputStat && (await fs.readdir(absoluteOutputDirectory)).length > 0) {
        throw new Error(`Capture output directory must be empty: ${absoluteOutputDirectory}.`);
    }
    return { absoluteOutputDirectory, existed: Boolean(outputStat), parent };
};

export const writeThirdPartyRuntimeCapture = async ({ capturedAt, entries, outputDirectory }) => {
    if (!canonicalTimestamp(capturedAt)) {
        throw new Error('Third-party capture timestamp must be a canonical ISO timestamp.');
    }
    if (!Array.isArray(entries) || entries.length !== THIRD_PARTY_SCRIPT_CLASSES.length) {
        throw new Error(`Third-party capture must contain exactly ${THIRD_PARTY_SCRIPT_CLASSES.length} entries.`);
    }

    const destination = await assertThirdPartyRuntimeCaptureOutputAvailable(outputDirectory);
    const stagingDirectory = await fs.mkdtemp(
        path.join(destination.parent, `.${path.basename(destination.absoluteOutputDirectory)}.capture-`)
    );
    let published = false;
    try {
        const manifestEntries = [];
        for (const className of THIRD_PARTY_SCRIPT_CLASSES) {
            const entry = entries.find((candidate) => candidate.className === className);
            if (!entry || !Buffer.isBuffer(entry.body) || entry.body.byteLength === 0) {
                throw new Error(`Third-party capture is missing a nonempty body for ${className}.`);
            }
            const match = matchThirdPartyScriptUrl(entry.url);
            if (!match || match.className !== className || match.canonicalUrl !== entry.canonicalUrl) {
                throw new Error(`Third-party capture entry ${className} does not match its production URL class.`);
            }
            if (
                entry.status !== 200 ||
                typeof entry.contentType !== 'string' ||
                !/javascript/iu.test(entry.contentType)
            ) {
                throw new Error(`Third-party capture entry ${className} has invalid response metadata.`);
            }
            if (entry.bytes !== entry.body.byteLength || entry.sha256 !== digest(entry.body)) {
                throw new Error(`Third-party capture entry ${className} has invalid body metadata.`);
            }

            const body = `${className}.js`;
            await fs.writeFile(path.join(stagingDirectory, body), entry.body, { flag: 'wx' });
            manifestEntries.push({
                body,
                bytes: entry.bytes,
                canonicalUrl: entry.canonicalUrl,
                className,
                contentType: entry.contentType,
                sha256: entry.sha256,
                status: entry.status,
                url: match.canonicalUrl,
            });
        }

        const manifestPath = path.join(stagingDirectory, 'manifest.json');
        await fs.writeFile(
            manifestPath,
            `${JSON.stringify(
                {
                    capturedAt,
                    policy: THIRD_PARTY_RUNTIME_POLICY,
                    schemaVersion: THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
                    scripts: manifestEntries,
                },
                null,
                2
            )}\n`,
            { flag: 'wx' }
        );
        loadThirdPartyRuntimeSnapshot(manifestPath);

        // Recheck immediately before publishing so a concurrent writer cannot be overwritten.
        const currentDestination = await assertThirdPartyRuntimeCaptureOutputAvailable(
            destination.absoluteOutputDirectory
        );
        if (currentDestination.existed) await fs.rmdir(destination.absoluteOutputDirectory);
        await fs.rename(stagingDirectory, destination.absoluteOutputDirectory);
        published = true;

        const publishedManifestPath = path.join(destination.absoluteOutputDirectory, 'manifest.json');
        return {
            manifestPath: publishedManifestPath,
            provenance: loadThirdPartyRuntimeSnapshot(publishedManifestPath).provenance,
        };
    } finally {
        if (!published) await fs.rm(stagingDirectory, { force: true, recursive: true });
    }
};
