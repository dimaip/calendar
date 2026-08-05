import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const THIRD_PARTY_RUNTIME_POLICY = 'production-third-party-script-snapshot-v1';
export const THIRD_PARTY_RUNTIME_SCHEMA_VERSION = 1;

export const THIRD_PARTY_SCRIPT_CLASSES = [
    'yandex-metrika-tag',
    'google-tag-manager',
    'google-tag',
    'google-tag-destination',
    'google-analytics',
];

const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const hasExactQueryKeys = (url, allowed) => [...url.searchParams.keys()].every((key) => allowed.includes(key));

const hasSingleNonemptyParameter = (url, name) => {
    const values = url.searchParams.getAll(name);
    return values.length === 1 && values[0].length > 0;
};

const hasSingleNonemptyBodyParameter = (body, name) => {
    if (typeof body !== 'string') return false;
    const values = new URLSearchParams(body).getAll(name);
    return values.length === 1 && values[0].length > 0;
};

const canonicalQuery = (url, names) => {
    const query = new URLSearchParams();
    for (const name of names) {
        for (const value of url.searchParams.getAll(name)) query.append(name, value);
    }
    const value = query.toString();
    return value ? `?${value}` : '';
};

const isPlainHttpsUrl = (url) =>
    url.protocol === 'https:' && url.port === '' && url.username === '' && url.password === '' && url.hash === '';

export const matchThirdPartyScriptUrl = (input) => {
    let url;
    try {
        url = new URL(input);
    } catch {
        return null;
    }
    if (!isPlainHttpsUrl(url)) return null;

    if (url.hostname === 'mc.yandex.ru' && url.pathname === '/metrika/tag.js' && url.search === '') {
        return { className: 'yandex-metrika-tag', canonicalUrl: 'https://mc.yandex.ru/metrika/tag.js' };
    }

    if (
        url.hostname === 'www.googletagmanager.com' &&
        url.pathname === '/gtm.js' &&
        hasSingleNonemptyParameter(url, 'id') &&
        url.searchParams.get('id') === 'GTM-MSCF98P' &&
        url.searchParams.getAll('gtm_auth').length <= 1 &&
        (!url.searchParams.has('gtm_auth') || url.searchParams.get('gtm_auth') === '') &&
        url.searchParams.getAll('gtm_preview').length <= 1 &&
        (!url.searchParams.has('gtm_preview') || url.searchParams.get('gtm_preview') === '') &&
        url.searchParams.getAll('gtm_cookies_win').length <= 1 &&
        (!url.searchParams.has('gtm_cookies_win') || url.searchParams.get('gtm_cookies_win') === 'x') &&
        hasExactQueryKeys(url, ['id', 'gtm_auth', 'gtm_preview', 'gtm_cookies_win'])
    ) {
        return {
            className: 'google-tag-manager',
            canonicalUrl: `https://www.googletagmanager.com/gtm.js${canonicalQuery(url, ['id', 'gtm_cookies_win'])}`,
        };
    }

    if (
        url.hostname === 'www.googletagmanager.com' &&
        (url.pathname === '/gtag/js' || url.pathname === '/gtag/destination') &&
        hasSingleNonemptyParameter(url, 'id') &&
        (!url.searchParams.has('cx') || hasSingleNonemptyParameter(url, 'cx')) &&
        (!url.searchParams.has('gtm') || hasSingleNonemptyParameter(url, 'gtm')) &&
        hasExactQueryKeys(url, ['id', 'cx', 'gtm'])
    ) {
        return {
            className: url.pathname === '/gtag/js' ? 'google-tag' : 'google-tag-destination',
            canonicalUrl: `https://www.googletagmanager.com${url.pathname}${canonicalQuery(url, ['id'])}`,
        };
    }

    if (url.hostname === 'www.google-analytics.com' && url.pathname === '/analytics.js' && url.search === '') {
        return { className: 'google-analytics', canonicalUrl: 'https://www.google-analytics.com/analytics.js' };
    }

    return null;
};

const validateRelativeBodyPath = (manifestDirectory, bodyPath) => {
    if (typeof bodyPath !== 'string' || bodyPath.length === 0 || path.isAbsolute(bodyPath)) {
        throw new Error('Every third-party snapshot script must have a nonempty relative body path.');
    }
    const resolved = path.resolve(manifestDirectory, bodyPath);
    const realManifestDirectory = fs.realpathSync(manifestDirectory);
    const realResolved = fs.realpathSync(resolved);
    const relative = path.relative(realManifestDirectory, realResolved);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
        throw new Error(`Third-party snapshot body path escapes the manifest directory: ${JSON.stringify(bodyPath)}.`);
    }
    return realResolved;
};

const validateSha256 = (value, label) => {
    if (typeof value !== 'string' || !/^[a-f0-9]{64}$/u.test(value)) {
        throw new Error(`${label} must be a lowercase SHA-256 digest.`);
    }
};

export const loadThirdPartyRuntimeSnapshot = (manifestPath) => {
    const absoluteManifestPath = path.resolve(manifestPath);
    const manifestBuffer = fs.readFileSync(absoluteManifestPath);
    let manifest;
    try {
        manifest = JSON.parse(manifestBuffer.toString('utf8'));
    } catch (error) {
        throw new Error(`Third-party snapshot manifest is not valid JSON: ${String(error?.message ?? error)}.`);
    }
    if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
        throw new Error('Third-party snapshot manifest must be a JSON object.');
    }
    if (manifest.policy !== THIRD_PARTY_RUNTIME_POLICY) {
        throw new Error(`Third-party snapshot policy must be ${JSON.stringify(THIRD_PARTY_RUNTIME_POLICY)}.`);
    }
    if (manifest.schemaVersion !== THIRD_PARTY_RUNTIME_SCHEMA_VERSION) {
        throw new Error(`Third-party snapshot schemaVersion must be ${THIRD_PARTY_RUNTIME_SCHEMA_VERSION}.`);
    }
    if (
        typeof manifest.capturedAt !== 'string' ||
        !Number.isFinite(Date.parse(manifest.capturedAt)) ||
        new Date(manifest.capturedAt).toISOString() !== manifest.capturedAt
    ) {
        throw new Error('Third-party snapshot capturedAt must be a canonical ISO timestamp.');
    }
    if (!Array.isArray(manifest.scripts) || manifest.scripts.length !== THIRD_PARTY_SCRIPT_CLASSES.length) {
        throw new Error(
            `Third-party snapshot must contain exactly ${THIRD_PARTY_SCRIPT_CLASSES.length} script entries.`
        );
    }

    const manifestDirectory = path.dirname(absoluteManifestPath);
    const scripts = manifest.scripts.map((entry, index) => {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
            throw new Error(`Third-party snapshot script ${index + 1} must be an object.`);
        }
        const match = matchThirdPartyScriptUrl(entry.url);
        if (!match || match.className !== entry.className) {
            throw new Error(
                `Third-party snapshot script ${index + 1} URL does not match class ${JSON.stringify(entry.className)}.`
            );
        }
        if (entry.canonicalUrl !== match.canonicalUrl) {
            throw new Error(
                `Third-party snapshot script ${JSON.stringify(entry.className)} has a stale or invalid canonicalUrl.`
            );
        }
        if (entry.status !== 200) {
            throw new Error(`Third-party snapshot script ${JSON.stringify(entry.className)} must have status 200.`);
        }
        if (typeof entry.contentType !== 'string' || !/javascript/iu.test(entry.contentType)) {
            throw new Error(
                `Third-party snapshot script ${JSON.stringify(entry.className)} must have a JavaScript contentType.`
            );
        }
        validateSha256(entry.sha256, `Third-party snapshot script ${JSON.stringify(entry.className)} sha256`);
        const bodyFile = validateRelativeBodyPath(manifestDirectory, entry.body);
        const body = fs.readFileSync(bodyFile);
        const bodyDigest = sha256(body);
        if (bodyDigest !== entry.sha256) {
            throw new Error(
                `Third-party snapshot body hash mismatch for ${JSON.stringify(entry.className)}: expected ${entry.sha256}, received ${bodyDigest}.`
            );
        }
        if (body.byteLength === 0) {
            throw new Error(`Third-party snapshot body for ${JSON.stringify(entry.className)} must not be empty.`);
        }
        if (entry.bytes !== body.byteLength) {
            throw new Error(
                `Third-party snapshot body size mismatch for ${JSON.stringify(entry.className)}: expected ${JSON.stringify(entry.bytes)}, received ${body.byteLength}.`
            );
        }
        return {
            body,
            bodyPath: entry.body,
            bytes: body.byteLength,
            canonicalUrl: match.canonicalUrl,
            className: match.className,
            contentType: entry.contentType,
            sha256: bodyDigest,
            status: entry.status,
            url: entry.url,
        };
    });

    const actualClasses = scripts.map(({ className }) => className).sort();
    const expectedClasses = [...THIRD_PARTY_SCRIPT_CLASSES].sort();
    if (JSON.stringify(actualClasses) !== JSON.stringify(expectedClasses)) {
        throw new Error(`Third-party snapshot must contain each production script class exactly once.`);
    }
    const canonicalUrls = scripts.map(({ canonicalUrl }) => canonicalUrl);
    if (new Set(canonicalUrls).size !== canonicalUrls.length) {
        throw new Error('Third-party snapshot canonical script URLs must be unique.');
    }

    const inventory = scripts.map(({ bytes, canonicalUrl, className, contentType, sha256, status }) => ({
        bytes,
        canonicalUrl,
        className,
        contentType,
        sha256,
        status,
    }));
    const fixtureDigest = sha256(
        JSON.stringify({
            capturedAt: manifest.capturedAt,
            inventory,
            policy: manifest.policy,
            schemaVersion: manifest.schemaVersion,
        })
    );
    return {
        entriesByCanonicalUrl: new Map(scripts.map((entry) => [entry.canonicalUrl, entry])),
        provenance: {
            capturedAt: manifest.capturedAt,
            fixtureDigest,
            inventory,
            manifestPath: absoluteManifestPath,
            manifestSha256: sha256(manifestBuffer),
            policy: THIRD_PARTY_RUNTIME_POLICY,
            schemaVersion: THIRD_PARTY_RUNTIME_SCHEMA_VERSION,
        },
    };
};

export const matchKnownThirdPartyRuntimeSink = (method, resourceType, url, postData) => {
    if (!isPlainHttpsUrl(url)) return null;
    const telemetryResource = ['fetch', 'image', 'other', 'ping', 'xhr'].includes(resourceType);
    if (
        (telemetryResource || resourceType === 'script') &&
        ['mc.yandex.com', 'mc.yandex.ru'].includes(url.hostname) &&
        ((url.pathname.replace(/\/$/u, '') === '/watch/99820027' && ['GET', 'POST'].includes(method)) ||
            (/^\/(?:clmap|webvisor)\/99820027\/?$/u.test(url.pathname) && method === 'POST'))
    ) {
        return 'yandex-metrika';
    }
    if (!telemetryResource) return null;
    if (
        ['analytics.google.com', 'region1.google-analytics.com', 'www.google-analytics.com', 'www.google.com'].includes(
            url.hostname
        ) &&
        ['/collect', '/g/collect', '/j/collect'].includes(url.pathname) &&
        ((method === 'GET' && hasSingleNonemptyParameter(url, 'tid')) ||
            (method === 'POST' &&
                (hasSingleNonemptyParameter(url, 'tid') || hasSingleNonemptyBodyParameter(postData, 'tid'))))
    ) {
        return 'google-analytics';
    }
    if (
        url.hostname === 'stats.g.doubleclick.net' &&
        url.pathname === '/g/collect' &&
        ((method === 'GET' && hasSingleNonemptyParameter(url, 'tid')) ||
            (method === 'POST' && hasSingleNonemptyBodyParameter(postData, 'tid')))
    ) {
        return 'google-doubleclick';
    }
    if (
        url.hostname === 'o360342.ingest.sentry.io' &&
        /^\/api\/3629452\/(?:envelope|store)\/?$/u.test(url.pathname) &&
        method === 'POST' &&
        ['fetch', 'xhr'].includes(resourceType)
    ) {
        return 'sentry';
    }
    return null;
};

const isKnownBlockedProductRequest = (url) =>
    url.hostname === 'api.c.psmb.ru' || url.hostname === 'psmb.ru' || url.hostname.endsWith('.convex.cloud');

export const configureThirdPartyRuntimeSnapshot = async ({ baseUrl, context, snapshot }) => {
    const baseOrigin = new URL(baseUrl).origin;
    const counts = Object.fromEntries(THIRD_PARTY_SCRIPT_CLASSES.map((className) => [className, 0]));
    const responses = Object.fromEntries(THIRD_PARTY_SCRIPT_CLASSES.map((className) => [className, 0]));
    const failures = [];
    const sinks = {};
    let executed = null;
    let fulfilled = 0;
    let lastExternalActivityAt = Date.now();

    await context.addInitScript(() => {
        window.__PERFORMANCE_THIRD_PARTY_SCRIPT_LOADS__ = [];
        document.addEventListener(
            'load',
            (event) => {
                if (event.target instanceof HTMLScriptElement && event.target.src) {
                    window.__PERFORMANCE_THIRD_PARTY_SCRIPT_LOADS__.push(event.target.src);
                }
            },
            true
        );
    });

    await context.route('**/*', async (route) => {
        const request = route.request();
        const requestUrl = request.url();
        const url = new URL(requestUrl);
        if (url.origin === baseOrigin) {
            await route.continue();
            return;
        }
        lastExternalActivityAt = Date.now();

        const sink = matchKnownThirdPartyRuntimeSink(request.method(), request.resourceType(), url, request.postData());
        if (sink) {
            sinks[sink] = (sinks[sink] ?? 0) + 1;
            if (request.resourceType() === 'script') {
                await route.abort('blockedbyclient');
            } else {
                fulfilled += 1;
                await route.fulfill({ body: '', headers: { 'cache-control': 'no-store' }, status: 204 });
            }
            return;
        }

        if (request.resourceType() === 'script') {
            const match = matchThirdPartyScriptUrl(requestUrl);
            const entry = match ? snapshot.entriesByCanonicalUrl.get(match.canonicalUrl) : null;
            if (!match || !entry || entry.className !== match.className) {
                failures.push(`Unknown external script request: ${requestUrl}`);
                await route.abort('blockedbyclient');
                return;
            }
            counts[match.className] += 1;
            if (counts[match.className] !== 1) {
                failures.push(`Third-party script ${match.className} was requested more than once.`);
                await route.abort('blockedbyclient');
                return;
            }
            fulfilled += 1;
            await route.fulfill({
                body: entry.body,
                contentType: entry.contentType,
                headers: {
                    'cache-control': 'no-store',
                    'x-performance-fixture-sha256': entry.sha256,
                },
                status: entry.status,
            });
            responses[match.className] += 1;
            return;
        }

        if (isKnownBlockedProductRequest(url)) {
            await route.abort('blockedbyclient');
            return;
        }

        failures.push(`Unknown external request: ${request.method()} ${requestUrl}`);
        await route.abort('blockedbyclient');
    });

    const activity = () => ({
        counts: { ...counts },
        executed: executed ? { ...executed } : null,
        failures: [...failures],
        fulfilled,
        responses: { ...responses },
        sinks: { ...sinks },
    });
    const assertComplete = () => {
        const missingOrDuplicate = [...Object.values(counts), ...Object.values(responses)].some((count) => count !== 1);
        if (missingOrDuplicate || failures.length) {
            throw new Error(
                `Third-party runtime snapshot replay was incomplete: ${JSON.stringify({ failures, counts, responses })}.`
            );
        }
        return activity();
    };
    const waitForResponses = async ({ timeoutMs = 30_000 } = {}) => {
        const deadline = Date.now() + timeoutMs;
        while (Date.now() < deadline) {
            if (failures.length) return assertComplete();
            if (Object.values(responses).every((count) => count === 1)) return assertComplete();
            await new Promise((resolve) => setTimeout(resolve, 25));
        }
        return assertComplete();
    };

    const waitForExecution = async ({ page, timeoutMs = 30_000 }) => {
        await waitForResponses({ timeoutMs });
        await page.waitForFunction(
            ({ expected, origin }) =>
                window.__PERFORMANCE_THIRD_PARTY_SCRIPT_LOADS__.filter(
                    (url) => new URL(url, location.href).origin !== origin
                ).length >= expected,
            { expected: THIRD_PARTY_SCRIPT_CLASSES.length, origin: baseOrigin },
            { timeout: timeoutMs }
        );
        const loadedUrls = await page.evaluate(() => [...window.__PERFORMANCE_THIRD_PARTY_SCRIPT_LOADS__]);
        executed = Object.fromEntries(THIRD_PARTY_SCRIPT_CLASSES.map((className) => [className, 0]));
        for (const loadedUrl of loadedUrls) {
            const url = new URL(loadedUrl);
            if (url.origin === baseOrigin) continue;
            const match = matchThirdPartyScriptUrl(loadedUrl);
            if (!match || !snapshot.entriesByCanonicalUrl.has(match.canonicalUrl)) {
                failures.push(`Unknown external script executed: ${loadedUrl}`);
                continue;
            }
            executed[match.className] += 1;
        }
        const invalidExecutionCount = Object.values(executed).some((count) => count !== 1);
        if (invalidExecutionCount || failures.length) {
            throw new Error(
                `Third-party runtime script execution was incomplete: ${JSON.stringify({ executed, failures })}.`
            );
        }
        // Require a fresh quiet window after the last script has actually executed.
        lastExternalActivityAt = Date.now();
        return { ...assertComplete(), executed };
    };

    const assertSettled = () => {
        assertComplete();
        if (!executed || Object.values(executed).some((count) => count !== 1)) {
            throw new Error(
                `Third-party runtime script execution has not settled: ${JSON.stringify({ executed, failures })}.`
            );
        }
        return activity();
    };

    const waitForQuiescence = async ({ quietMs = 750, timeoutMs = 5_000 } = {}) => {
        const deadline = Date.now() + timeoutMs;
        while (Date.now() < deadline) {
            if (failures.length) return assertSettled();
            if (Date.now() - lastExternalActivityAt >= quietMs) return assertSettled();
            await new Promise((resolve) => setTimeout(resolve, 25));
        }
        throw new Error(`Third-party runtime did not become quiet for ${quietMs} ms: ${JSON.stringify(activity())}.`);
    };

    return { activity, assertComplete, assertSettled, waitForExecution, waitForQuiescence, waitForResponses };
};

const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);

export const validateThirdPartyRuntimeProvenance = ({ manifestPath, mode, recorded }) => {
    const issues = [];
    if (!['blocked', 'snapshot'].includes(mode)) {
        return { issues: [`thirdPartyRuntime mode must be "blocked" or "snapshot".`], valid: false };
    }
    if (!recorded || typeof recorded !== 'object' || Array.isArray(recorded) || recorded.mode !== mode) {
        return { issues: [`thirdPartyRuntime provenance must record mode ${JSON.stringify(mode)}.`], valid: false };
    }
    const expectedServiceWorkerPolicy = mode === 'snapshot' ? 'unregister-and-block' : 'allow';
    if (recorded.serviceWorkerPolicy !== expectedServiceWorkerPolicy) {
        issues.push(
            `thirdPartyRuntime provenance must record serviceWorkerPolicy=${JSON.stringify(expectedServiceWorkerPolicy)}.`
        );
    }
    if (mode === 'blocked') {
        if (recorded.snapshot !== null) issues.push('Blocked thirdPartyRuntime provenance must have snapshot=null.');
        if (manifestPath != null) issues.push('Blocked thirdPartyRuntime must not declare a snapshot manifest path.');
        return { issues, valid: issues.length === 0 };
    }
    if (typeof manifestPath !== 'string' || manifestPath.length === 0) {
        return { issues: ['Snapshot thirdPartyRuntime must declare its manifest path.'], valid: false };
    }
    try {
        const actual = loadThirdPartyRuntimeSnapshot(manifestPath).provenance;
        if (!sameJson(recorded.snapshot, actual)) {
            issues.push('thirdPartyRuntime snapshot provenance does not match its manifest and script bodies.');
        }
    } catch (error) {
        issues.push(`thirdPartyRuntime snapshot could not be verified: ${String(error?.message ?? error)}`);
    }
    return { issues, valid: issues.length === 0 };
};
