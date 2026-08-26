import { gzipSync } from 'node:zlib';

const requestedTraceCategories = [
    'devtools.timeline',
    'disabled-by-default-devtools.timeline',
    'disabled-by-default-devtools.timeline.frame',
    'disabled-by-default-devtools.timeline.inputs',
    'disabled-by-default-devtools.timeline.stack',
    'disabled-by-default-v8.cpu_profiler',
    'blink.animations',
    'blink.user_timing',
    'cc',
    'gpu',
    'input',
    'input.scrolling',
    'latency',
    'latencyInfo',
    'loading',
    'rail',
    'renderer.scheduler',
    'v8',
];

export const configureCdp = async (session, profile, { offline = false } = {}) => {
    await session.send('Performance.enable');
    await session.send('Network.enable');
    await session.send('Emulation.setCPUThrottlingRate', { rate: profile.cpuRate });
    await session.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await session.send('Network.emulateNetworkConditions', {
        connectionType: profile.latencyMs > 0 ? 'cellular4g' : 'none',
        downloadThroughput: profile.downloadBytesPerSecond,
        latency: profile.latencyMs,
        offline,
        uploadThroughput: profile.uploadBytesPerSecond,
    });
};

export const readPerformanceMetrics = async (session) => {
    const response = await session.send('Performance.getMetrics');
    return Object.fromEntries(response.metrics.map(({ name, value }) => [name, value]));
};

export const subtractPerformanceMetrics = (before, after) => {
    const milliseconds = ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration'];
    const counts = ['LayoutCount', 'RecalcStyleCount'];
    const result = {};
    for (const name of milliseconds) {
        result[`${name}Ms`] = ((after[name] ?? 0) - (before[name] ?? 0)) * 1000;
    }
    for (const name of counts) {
        result[name] = (after[name] ?? 0) - (before[name] ?? 0);
    }
    result.JSHeapTotalBytes = after.JSHeapTotalSize ?? 0;
    result.JSHeapUsedBytes = after.JSHeapUsedSize ?? 0;
    return result;
};

export const startTrace = async (session) => {
    const { categories: available } = await session.send('Tracing.getCategories');
    const categories = requestedTraceCategories.filter((category) => available.includes(category));
    await session.send('Tracing.start', {
        categories: categories.join(','),
        options: 'sampling-frequency=10000',
        transferMode: 'ReturnAsStream',
    });
    return categories;
};

const readTraceStream = async (session, handle) => {
    const chunks = [];
    let eof = false;
    while (!eof) {
        const result = await session.send('IO.read', { handle });
        chunks.push(result.base64Encoded ? Buffer.from(result.data, 'base64') : Buffer.from(result.data));
        eof = result.eof;
    }
    await session.send('IO.close', { handle });
    return Buffer.concat(chunks);
};

export const stopTrace = async (session, timeoutMs = 30_000) => {
    const completed = new Promise((resolve) => session.once('Tracing.tracingComplete', resolve));
    await session.send('Tracing.end');
    const { stream } = await Promise.race([
        completed,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timed out after ${timeoutMs} ms while stopping the trace.`)), timeoutMs)
        ),
    ]);
    if (!stream) return null;
    return gzipSync(await readTraceStream(session, stream), { level: 9 });
};

export const collectRuntimeSnapshot = async (page, session, label) => {
    try {
        await session.send('HeapProfiler.collectGarbage');
    } catch {}

    const [performanceMetrics, domCounters, windowObject, browser] = await Promise.all([
        readPerformanceMetrics(session),
        session.send('Memory.getDOMCounters'),
        session.send('Runtime.evaluate', { expression: 'window' }),
        page.evaluate(() => {
            const state = window.__experiencePerformance;
            return {
                emotionStyleElements: document.querySelectorAll('style[data-emotion]').length,
                jsHeapUsedBytes: performance.memory?.usedJSHeapSize ?? null,
                observerCounts: state?.observerCounts ?? null,
                workers: state?.workers ?? null,
            };
        }),
    ]);

    let listeners = [];
    const objectId = windowObject.result.objectId;
    if (objectId) {
        try {
            listeners = (await session.send('DOMDebugger.getEventListeners', { objectId })).listeners;
        } catch {}
    }

    return {
        ...browser,
        documents: domCounters.documents,
        jsEventListeners: domCounters.jsEventListeners ?? performanceMetrics.JSEventListeners ?? null,
        jsHeapUsedBytes: performanceMetrics.JSHeapUsedSize ?? browser.jsHeapUsedBytes,
        label,
        nodes: domCounters.nodes,
        nonPassiveTouchListeners: listeners.filter(
            ({ passive, type }) => !passive && (type === 'touchstart' || type === 'touchmove' || type === 'wheel')
        ).length,
    };
};

export const traceCategories = requestedTraceCategories;
