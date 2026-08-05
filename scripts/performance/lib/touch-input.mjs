const interpolate = (start, end, progress) => start + (end - start) * progress;

export const dispatchTrustedTouchGesture = async ({ durationMs, end, page, session, start, steps }) => {
    const before = await page.evaluate(() => ({
        hash: window.location.hash,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        startedAt: performance.now(),
        frameSamplingStarted: Boolean(
            window.__experienceStartFrames && (window.__experienceStopFrames = window.__experienceStartFrames())
        ),
    }));

    await session.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ force: 1, radiusX: 2, radiusY: 2, x: start.x, y: start.y }],
    });
    const stepDelay = durationMs / steps;
    for (let index = 1; index <= steps; index += 1) {
        const progress = index / steps;
        await new Promise((resolve) => setTimeout(resolve, stepDelay));
        await session.send('Input.dispatchTouchEvent', {
            type: 'touchMove',
            touchPoints: [
                {
                    force: 1,
                    radiusX: 2,
                    radiusY: 2,
                    x: interpolate(start.x, end.x, progress),
                    y: interpolate(start.y, end.y, progress),
                },
            ],
        });
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    return await page.evaluate((initial) => {
        window.__experienceStopFrames?.();
        window.__experienceStopFrames = undefined;
        const state = window.__experiencePerformance;
        const events = state.events.filter((event) => event.startTime >= initial.startedAt);
        const inputEvents = state.inputEvents.filter((event) => event.startTime >= initial.startedAt);
        return {
            durationMs: performance.now() - initial.startedAt,
            endHash: window.location.hash,
            endScrollX: window.scrollX,
            endScrollY: window.scrollY,
            eventCount: events.length,
            events,
            hashChanged: initial.hash !== window.location.hash,
            scrollDeltaX: window.scrollX - initial.scrollX,
            scrollDeltaY: window.scrollY - initial.scrollY,
            startHash: initial.hash,
            trustedInputEvents: inputEvents,
            trustedInputObserved: inputEvents.some((event) => event.trusted),
        };
    }, before);
};

export const verticalGesture = ({ height, kind, width }) => {
    const precision = kind === 'precision';
    return {
        durationMs: precision ? 900 : 300,
        end: { x: width * 0.5, y: height * (precision ? 0.42 : 0.18) },
        start: { x: width * 0.5, y: height * 0.82 },
        steps: precision ? 45 : 18,
    };
};

export const horizontalGesture = ({ direction, height, width }) => ({
    durationMs: 350,
    end: { x: direction === 'left' ? width * 0.12 : width * 0.88, y: height * 0.5 },
    start: { x: direction === 'left' ? width * 0.88 : width * 0.12, y: height * 0.5 },
    steps: 20,
});
