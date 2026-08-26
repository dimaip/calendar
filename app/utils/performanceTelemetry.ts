import type { Metric } from 'web-vitals';

import { markPerformance } from 'utils/performanceMarks';
import type { NavigationMeasurement } from 'utils/performanceMarks';

interface PerformanceConnection {
    effectiveType?: string;
    saveData?: boolean;
}

interface PerformanceNavigator extends Navigator {
    connection?: PerformanceConnection;
    deviceMemory?: number;
}

interface ServiceMilestones {
    complete?: number;
    intent?: number;
    navigation: NavigationMeasurement;
    renderKey?: string;
    settledTimer?: number;
    tocReady?: number;
}

const pushPerformanceEvent = (event: Record<string, unknown>) => {
    const telemetryWindow = window as unknown as {
        dataLayer?: Array<Record<string, unknown>>;
    };
    const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    telemetryWindow.dataLayer = telemetryWindow.dataLayer || [];
    telemetryWindow.dataLayer.push({
        appMode: window.origin.includes('capacitor://') ? 'capacitor' : standalone ? 'standalone' : 'browser',
        release: VERSION,
        deviceMemory: (navigator as PerformanceNavigator).deviceMemory,
        effectiveConnectionType: (navigator as PerformanceNavigator).connection?.effectiveType,
        hardwareConcurrency: navigator.hardwareConcurrency,
        saveData: (navigator as PerformanceNavigator).connection?.saveData,
        serviceWorkerControlled: Boolean(navigator.serviceWorker?.controller),
        standalone,
        ...event,
    });
};

const observeServiceMilestones = () => {
    if (typeof PerformanceObserver === 'undefined') {
        return;
    }

    let milestones: ServiceMilestones | undefined;

    const scheduleSettledReport = () => {
        if (
            !milestones ||
            milestones.complete === undefined ||
            milestones.tocReady === undefined ||
            milestones.tocReady < milestones.complete
        ) {
            return;
        }

        window.clearTimeout(milestones.settledTimer);
        const expectedMilestones = milestones;
        const complete = milestones.complete;
        const tocReady = milestones.tocReady;
        const { intent, navigation, renderKey } = expectedMilestones;
        expectedMilestones.settledTimer = window.setTimeout(() => {
            if (
                milestones !== expectedMilestones ||
                milestones.complete !== complete ||
                milestones.intent !== intent ||
                milestones.renderKey !== renderKey ||
                milestones.tocReady !== tocReady
            ) {
                return;
            }

            const settled = performance.now();
            const intentDurations =
                intent === undefined
                    ? {}
                    : {
                          completeFromIntent: complete - intent,
                          navigationIntent: intent,
                          settledFromIntent: settled - intent,
                          tocReadyFromIntent: tocReady - intent,
                      };
            performance.clearMarks?.('service_settled');
            markPerformance(
                'service_settled',
                { completeCommit: complete, ...intentDurations, renderKey, settled, tocReady },
                navigation
            );
            pushPerformanceEvent({
                completeCommit: complete,
                event: 'service_performance',
                ...intentDurations,
                navigationKey: navigation.key,
                navigationSequence: navigation.sequence,
                renderKey,
                settled,
                tocReady,
            });
            expectedMilestones.complete = undefined;
            expectedMilestones.intent = undefined;
            expectedMilestones.renderKey = undefined;
            expectedMilestones.settledTimer = undefined;
            expectedMilestones.tocReady = undefined;
        }, 750);
    };

    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (
                entry.name !== 'navigation_intent' &&
                entry.name !== 'service_complete_commit' &&
                entry.name !== 'service_toc_ready'
            ) {
                continue;
            }

            const detail = (entry as PerformanceMark).detail as {
                navigationKey?: unknown;
                navigationSequence?: unknown;
                renderKey?: unknown;
            } | null;
            if (
                typeof detail?.navigationKey !== 'string' ||
                typeof detail.navigationSequence !== 'number' ||
                !Number.isFinite(detail.navigationSequence)
            ) {
                continue;
            }

            if (
                !milestones ||
                detail.navigationSequence > milestones.navigation.sequence ||
                (detail.navigationSequence === milestones.navigation.sequence &&
                    detail.navigationKey !== milestones.navigation.key)
            ) {
                window.clearTimeout(milestones?.settledTimer);
                milestones = {
                    navigation: {
                        key: detail.navigationKey,
                        sequence: detail.navigationSequence,
                    },
                };
            } else if (
                detail.navigationSequence < milestones.navigation.sequence ||
                detail.navigationKey !== milestones.navigation.key
            ) {
                continue;
            }

            if (entry.name === 'navigation_intent') {
                milestones.intent = entry.startTime;
                scheduleSettledReport();
                continue;
            }

            if (entry.name === 'service_complete_commit') {
                milestones.complete = entry.startTime;
                milestones.renderKey = typeof detail?.renderKey === 'string' ? detail.renderKey : undefined;
                scheduleSettledReport();
            } else {
                milestones.tocReady = entry.startTime;
                scheduleSettledReport();
            }
        }
    });

    try {
        observer.observe({ entryTypes: ['mark'] });
    } catch {
        observer.disconnect();
    }
};

export const startPerformanceTelemetry = () => {
    observeServiceMilestones();

    const loadWebVitals = () => {
        void import(/* webpackChunkName: "performance-telemetry" */ 'web-vitals')
            .then(({ onCLS, onINP, onLCP, onTTFB }) => {
                const report = ({ delta, id, name, rating, value }: Metric) => {
                    pushPerformanceEvent({
                        event: 'web_vital',
                        metricDelta: delta,
                        metricId: id,
                        metricName: name,
                        metricRating: rating,
                        metricValue: value,
                    });
                };

                onCLS(report);
                onINP(report);
                onLCP(report);
                onTTFB(report);
            })
            .catch(() => undefined);
    };

    const scheduleWebVitals = () => window.setTimeout(loadWebVitals, 4000);
    if (document.readyState === 'complete') {
        scheduleWebVitals();
    } else {
        window.addEventListener('load', scheduleWebVitals, { once: true });
    }
};
