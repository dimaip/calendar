export const installExperienceObservers = async (context, { diagnosticCounters = false } = {}) => {
    await context.addInitScript(
        ({ collectDiagnosticCounters }) => {
            const state = {
                events: [],
                frames: [],
                inputEvents: [],
                layoutShifts: [],
                longAnimationFrames: [],
                longTasks: [],
                marks: [],
                observerCounts: {
                    intersectionConstructed: 0,
                    intersectionDisconnected: 0,
                    intersectionLive: 0,
                    mutationConstructed: 0,
                    mutationDisconnected: 0,
                    mutationLive: 0,
                    resizeConstructed: 0,
                    resizeDisconnected: 0,
                    resizeLive: 0,
                },
                touchListeners: {
                    nonPassiveAdded: 0,
                    removed: 0,
                },
                workers: {
                    constructed: 0,
                    terminated: 0,
                },
            };
            window.__experiencePerformance = state;

            const wrapObserver = (name, NativeObserver) => {
                if (typeof NativeObserver !== 'function') return NativeObserver;
                return class InstrumentedObserver extends NativeObserver {
                    constructor(callback, options) {
                        super(callback, options);
                        state.observerCounts[`${name}Constructed`] += 1;
                        state.observerCounts[`${name}Live`] += 1;
                        let disconnected = false;
                        const nativeDisconnect = this.disconnect.bind(this);
                        this.disconnect = () => {
                            if (!disconnected) {
                                disconnected = true;
                                state.observerCounts[`${name}Disconnected`] += 1;
                                state.observerCounts[`${name}Live`] -= 1;
                            }
                            return nativeDisconnect();
                        };
                    }
                };
            };

            const nativeAddEventListener = EventTarget.prototype.addEventListener;
            const nativeRemoveEventListener = EventTarget.prototype.removeEventListener;

            if (collectDiagnosticCounters) {
                window.IntersectionObserver = wrapObserver('intersection', window.IntersectionObserver);
                window.MutationObserver = wrapObserver('mutation', window.MutationObserver);
                if (typeof window.ResizeObserver === 'function') {
                    window.ResizeObserver = wrapObserver('resize', window.ResizeObserver);
                }

                EventTarget.prototype.addEventListener = function (type, listener, options) {
                    const passive = typeof options === 'object' && options !== null ? options.passive : undefined;
                    if ((type === 'touchstart' || type === 'touchmove' || type === 'wheel') && passive !== true) {
                        state.touchListeners.nonPassiveAdded += 1;
                    }
                    return nativeAddEventListener.call(this, type, listener, options);
                };
                EventTarget.prototype.removeEventListener = function (type, listener, options) {
                    if (type === 'touchstart' || type === 'touchmove' || type === 'wheel') {
                        state.touchListeners.removed += 1;
                    }
                    return nativeRemoveEventListener.call(this, type, listener, options);
                };
            }

            for (const type of ['pointerdown', 'pointerup', 'touchstart', 'touchend']) {
                nativeAddEventListener.call(
                    window,
                    type,
                    (event) => {
                        state.inputEvents.push({ name: type, startTime: event.timeStamp, trusted: event.isTrusted });
                    },
                    { capture: true, passive: true }
                );
            }

            const NativeWorker = window.Worker;
            if (collectDiagnosticCounters && typeof NativeWorker === 'function') {
                window.Worker = class InstrumentedWorker extends NativeWorker {
                    constructor(...args) {
                        super(...args);
                        state.workers.constructed += 1;
                        let terminated = false;
                        const nativeTerminate = this.terminate.bind(this);
                        this.terminate = () => {
                            if (!terminated) {
                                terminated = true;
                                state.workers.terminated += 1;
                            }
                            return nativeTerminate();
                        };
                    }
                };
            }

            const observe = (type, callback, options = { type, buffered: true }) => {
                try {
                    new PerformanceObserver(callback).observe(options);
                } catch {}
            };
            observe('mark', (list) => {
                state.marks.push(
                    ...list.getEntries().map((entry) => ({
                        detail: entry.detail ?? null,
                        name: entry.name,
                        startTime: entry.startTime,
                    }))
                );
            });
            observe('longtask', (list) => {
                state.longTasks.push(
                    ...list.getEntries().map((entry) => ({ duration: entry.duration, startTime: entry.startTime }))
                );
            });
            observe('long-animation-frame', (list) => {
                state.longAnimationFrames.push(
                    ...list.getEntries().map((entry) => ({ duration: entry.duration, startTime: entry.startTime }))
                );
            });
            observe(
                'event',
                (list) => {
                    state.events.push(
                        ...list.getEntries().map((entry) => ({
                            duration: entry.duration,
                            interactionId: entry.interactionId,
                            name: entry.name,
                            processingEnd: entry.processingEnd,
                            processingStart: entry.processingStart,
                            startTime: entry.startTime,
                        }))
                    );
                },
                { type: 'event', buffered: true, durationThreshold: 16 }
            );
            observe('layout-shift', (list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        state.layoutShifts.push({ startTime: entry.startTime, value: entry.value });
                    }
                }
            });

            window.__experienceStartFrames = () => {
                state.frames = [];
                let previous = performance.now();
                let active = true;
                const sample = (now) => {
                    if (!active) return;
                    state.frames.push(now - previous);
                    previous = now;
                    requestAnimationFrame(sample);
                };
                requestAnimationFrame(sample);
                return () => {
                    active = false;
                };
            };
        },
        { collectDiagnosticCounters: diagnosticCounters }
    );
};

const quantile = (values, percentile) => {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((left, right) => left - right);
    const position = (sorted.length - 1) * percentile;
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    const weight = position - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};

export const milestoneFromPhase = (milestoneMs, phaseStartMs) =>
    typeof milestoneMs === 'number' && Number.isFinite(milestoneMs) && milestoneMs >= phaseStartMs
        ? milestoneMs - phaseStartMs
        : null;

export const collectObserverMetrics = async (page, startedAt = 0, endedAt) =>
    await page.evaluate(
        ({ phaseEnd, phaseStart, quantiles }) => {
            const state = window.__experiencePerformance;
            const marks = state.marks.filter((entry) => entry.startTime >= phaseStart && entry.startTime <= phaseEnd);
            const longTasks = state.longTasks.filter(
                (entry) => entry.startTime >= phaseStart && entry.startTime <= phaseEnd
            );
            const longAnimationFrames = state.longAnimationFrames.filter(
                (entry) => entry.startTime >= phaseStart && entry.startTime <= phaseEnd
            );
            const events = state.events.filter((entry) => entry.startTime >= phaseStart && entry.startTime <= phaseEnd);
            const layoutShifts = state.layoutShifts.filter(
                (entry) => entry.startTime >= phaseStart && entry.startTime <= phaseEnd
            );
            let cls = 0;
            let sessionValue = 0;
            let sessionStart = 0;
            let previousShift = 0;
            for (const entry of layoutShifts) {
                if (
                    sessionValue === 0 ||
                    entry.startTime - previousShift > 1000 ||
                    entry.startTime - sessionStart > 5000
                ) {
                    sessionStart = entry.startTime;
                    sessionValue = entry.value;
                } else {
                    sessionValue += entry.value;
                }
                previousShift = entry.startTime;
                cls = Math.max(cls, sessionValue);
            }
            const frames = state.frames;
            const milestoneNames = {
                above_fold_stable: 'aboveFoldStableMs',
                app_header_ready: 'appHeaderReadyMs',
                background_precache_started: 'backgroundPrecacheStartedMs',
                bundle_evaluated: 'bundleEvaluatedMs',
                date_primary_content_ready: 'datePrimaryContentReadyMs',
                inline_loader_hidden: 'inlineLoaderHiddenMs',
                react_render_requested: 'reactRenderRequestedMs',
                route_chunk_loaded: 'routeChunkLoadedMs',
                service_complete_commit: 'serviceCompleteCommitMs',
                service_settled: 'serviceSettledMs',
                service_shell_ready: 'serviceShellReadyMs',
                service_toc_ready: 'serviceTocReadyMs',
            };
            const milestones = {};
            for (const entry of marks) {
                const milestoneName = milestoneNames[entry.name];
                if (milestoneName && milestones[milestoneName] === undefined) {
                    milestones[milestoneName] = entry.startTime - phaseStart;
                }
            }
            const sorted = [...frames].sort((left, right) => left - right);
            const at = (percentile) => {
                if (!sorted.length) return 0;
                const position = (sorted.length - 1) * percentile;
                const lower = Math.floor(position);
                const upper = Math.ceil(position);
                return sorted[lower] * (1 - (position - lower)) + sorted[upper] * (position - lower);
            };
            return {
                cls,
                durationMs: phaseEnd - phaseStart,
                eventCount: events.length,
                eventDurationMaxMs: Math.max(0, ...events.map((entry) => entry.duration)),
                events,
                inputEvents: state.inputEvents.filter(
                    (entry) => entry.startTime >= phaseStart && entry.startTime <= phaseEnd
                ),
                frameCount: frames.length,
                frameIntervalMaxMs: Math.max(0, ...frames),
                frameIntervalMedianMs: at(quantiles.median),
                frameIntervalP75Ms: at(quantiles.p75),
                frameIntervalP95Ms: at(quantiles.p95),
                framesOver33Ms: frames.filter((duration) => duration > 33).length,
                framesOver50Ms: frames.filter((duration) => duration > 50).length,
                longAnimationFrameCount: longAnimationFrames.length,
                longAnimationFrameMaxMs: Math.max(0, ...longAnimationFrames.map((entry) => entry.duration)),
                longTaskCount: longTasks.length,
                longTaskMaxMs: Math.max(0, ...longTasks.map((entry) => entry.duration)),
                longTaskTotalMs: longTasks.reduce((total, entry) => total + entry.duration, 0),
                marks,
                milestones,
                observerCounts: state.observerCounts,
                touchListeners: state.touchListeners,
                workers: state.workers,
            };
        },
        {
            phaseEnd: typeof endedAt === 'number' ? endedAt : await page.evaluate(() => performance.now()),
            phaseStart: startedAt,
            quantiles: { median: 0.5, p75: 0.75, p95: 0.95 },
        }
    );

export { quantile };
