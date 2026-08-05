#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';

import {
    assertThirdPartyRuntimeCaptureOutputAvailable,
    createThirdPartyRuntimeCaptureCollector,
    writeThirdPartyRuntimeCapture,
} from './lib/third-party-runtime-capture.mjs';

export const THIRD_PARTY_CAPTURE_USAGE = `Usage:
  yarn perf:capture-third-party-runtime --url https://molitva.app/ --output OUTPUT_DIRECTORY [options]

Required:
  --url URL               Final application URL whose production scripts should be captured.
  --output DIRECTORY      New path or existing empty directory for manifest.json and five script bodies.

Options:
  --headless true|false   Run Chromium headlessly (default: true).
  --timeout-ms NUMBER     Overall navigation and capture timeout (default: 60000).
  --quiet-ms NUMBER       Required quiet period after the fifth response (default: 1500).
  --help                  Show this message.
`;

const positiveInteger = (value, name) => {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`--${name} must be a positive integer.`);
    return parsed;
};

export const parseThirdPartyCaptureArguments = (argv = process.argv.slice(2)) => {
    if (argv.length === 1 && argv[0] === '--help') return { help: true };
    if (argv.length % 2 !== 0) throw new Error('Expected --name value argument pairs.');

    const values = new Map();
    const supported = new Set(['headless', 'output', 'quiet-ms', 'timeout-ms', 'url']);
    for (let index = 0; index < argv.length; index += 2) {
        const argument = argv[index];
        if (!argument?.startsWith('--') || !supported.has(argument.slice(2))) {
            throw new Error(`Unknown argument: ${argument ?? ''}.`);
        }
        const name = argument.slice(2);
        if (values.has(name)) throw new Error(`Argument --${name} may be supplied only once.`);
        values.set(name, argv[index + 1]);
    }

    const target = values.get('url');
    const output = values.get('output');
    if (!target || !output) throw new Error('Required arguments: --url URL --output OUTPUT_DIRECTORY.');

    let targetUrl;
    try {
        targetUrl = new URL(target);
    } catch {
        throw new Error('--url must be an absolute HTTP or HTTPS URL.');
    }
    if (!['http:', 'https:'].includes(targetUrl.protocol) || targetUrl.username || targetUrl.password) {
        throw new Error('--url must be an absolute HTTP or HTTPS URL without embedded credentials.');
    }
    const headless = values.get('headless') ?? 'true';
    if (!['true', 'false'].includes(headless)) throw new Error('--headless must be true or false.');

    return {
        headless: headless === 'true',
        outputDirectory: path.resolve(output),
        quietMs: positiveInteger(values.get('quiet-ms') ?? '1500', 'quiet-ms'),
        targetUrl: targetUrl.href,
        timeoutMs: positiveInteger(values.get('timeout-ms') ?? '60000', 'timeout-ms'),
    };
};

const beforeDeadline = (promise, deadline, operation) =>
    new Promise((resolve, reject) => {
        const remainingMs = deadline - Date.now();
        if (remainingMs <= 0) {
            reject(new Error(`Third-party script capture timed out while ${operation}.`));
            return;
        }
        const timeout = setTimeout(
            () => reject(new Error(`Third-party script capture timed out while ${operation}.`)),
            remainingMs
        );
        Promise.resolve(promise).then(
            (value) => {
                clearTimeout(timeout);
                resolve(value);
            },
            (error) => {
                clearTimeout(timeout);
                reject(error);
            }
        );
    });

const waitForPendingResponses = async (pendingResponses, deadline) => {
    while (pendingResponses.size > 0) {
        await beforeDeadline(Promise.all([...pendingResponses]), deadline, 'reading response bodies');
    }
};

export const finalizeThirdPartyRuntimeCapture = async ({
    closeContext,
    collector,
    deadline,
    pendingResponses,
    quietMs,
}) => {
    await beforeDeadline(closeContext(), deadline, 'closing the isolated browser context');
    await waitForPendingResponses(pendingResponses, deadline);
    const entries = collector.assertComplete();
    const lastActivityAt = collector.lastExternalScriptActivityAt();
    if (lastActivityAt === null || Date.now() - lastActivityAt < quietMs) {
        throw new Error(`Third-party script capture did not become quiet for ${quietMs} ms before timeout.`);
    }
    return entries;
};

export const captureThirdPartyRuntime = async ({ headless, outputDirectory, quietMs, targetUrl, timeoutMs }) => {
    if (quietMs >= timeoutMs) throw new Error('--quiet-ms must be smaller than --timeout-ms.');
    await assertThirdPartyRuntimeCaptureOutputAvailable(outputDirectory);

    const applicationOrigin = new URL(targetUrl).origin;
    const collector = createThirdPartyRuntimeCaptureCollector({ applicationOrigin });
    const browser = await chromium.launch({ headless });
    let context = null;
    try {
        context = await browser.newContext({ serviceWorkers: 'block' });
        const rejectedRequests = new WeakSet();
        const pendingResponses = new Set();
        await context.route('**/*', async (route) => {
            const request = route.request();
            const decision = collector.inspectRequest({
                method: request.method(),
                postData: request.postData(),
                redirectedFrom: Boolean(request.redirectedFrom()),
                resourceType: request.resourceType(),
                url: request.url(),
            });
            if (decision.action === 'abort') {
                rejectedRequests.add(request);
                await route.abort('blockedbyclient');
                return;
            }
            await route.continue();
        });

        const page = await context.newPage();
        page.on('response', (response) => {
            const request = response.request();
            const pending = (async () => {
                if (request.resourceType() !== 'script') return;
                let responseUrl;
                try {
                    responseUrl = new URL(response.url());
                } catch {
                    collector.recordFailure(`Script response has an invalid URL: ${JSON.stringify(response.url())}.`);
                    return;
                }
                if (responseUrl.origin === applicationOrigin) return;
                try {
                    collector.recordResponse({
                        body: await response.body(),
                        contentType: await response.headerValue('content-type'),
                        redirectedFrom: Boolean(request.redirectedFrom()),
                        resourceType: request.resourceType(),
                        status: response.status(),
                        url: response.url(),
                    });
                } catch (error) {
                    collector.recordFailure(
                        `Could not read third-party script response ${responseUrl.origin}${responseUrl.pathname}: ${String(
                            error?.message ?? error
                        )}.`
                    );
                }
            })();
            pendingResponses.add(pending);
            void pending.finally(() => pendingResponses.delete(pending));
        });
        page.on('requestfailed', (request) => {
            if (rejectedRequests.has(request) || request.resourceType() !== 'script') return;
            const requestUrl = new URL(request.url());
            if (requestUrl.origin !== applicationOrigin) {
                collector.recordFailure(
                    `Third-party script request failed: ${requestUrl.origin}${requestUrl.pathname} (${request.failure()?.errorText ?? 'unknown error'}).`
                );
            }
        });

        const startedAt = Date.now();
        await page.goto(targetUrl, { timeout: timeoutMs, waitUntil: 'domcontentloaded' });
        if (new URL(page.url()).origin !== applicationOrigin) {
            throw new Error(
                `Application navigation changed origin from ${applicationOrigin} to ${new URL(page.url()).origin}.`
            );
        }

        const deadline = startedAt + timeoutMs;
        while (Date.now() < deadline) {
            await waitForPendingResponses(pendingResponses, deadline);
            collector.assertHealthy();
            const lastActivityAt = collector.lastExternalScriptActivityAt();
            if (collector.isComplete() && lastActivityAt !== null && Date.now() - lastActivityAt >= quietMs) break;
            await new Promise((resolve) => setTimeout(resolve, 25));
        }
        const entries = await finalizeThirdPartyRuntimeCapture({
            closeContext: () => context.close(),
            collector,
            deadline,
            pendingResponses,
            quietMs,
        });
        context = null;

        return await writeThirdPartyRuntimeCapture({
            capturedAt: new Date().toISOString(),
            entries,
            outputDirectory,
        });
    } finally {
        if (context) await context.close();
        await browser.close();
    }
};

const main = async () => {
    try {
        const options = parseThirdPartyCaptureArguments();
        if (options.help) {
            process.stdout.write(THIRD_PARTY_CAPTURE_USAGE);
            return;
        }
        const result = await captureThirdPartyRuntime(options);
        process.stdout.write(
            `${JSON.stringify(
                {
                    fixtureDigest: result.provenance.fixtureDigest,
                    manifestPath: result.manifestPath,
                    scripts: result.provenance.inventory.length,
                },
                null,
                2
            )}\n`
        );
    } catch (error) {
        process.stderr.write(`${String(error?.message ?? error)}\n\n${THIRD_PARTY_CAPTURE_USAGE}`);
        process.exitCode = 1;
    }
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
