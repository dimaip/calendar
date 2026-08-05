import type { Metric } from 'web-vitals';

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
    renderKey?: string;
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

    const milestones: ServiceMilestones = {};
    let settledTimer: number | undefined;

    const scheduleSettledReport = () => {
        if (milestones.complete === undefined || milestones.tocReady === undefined) {
            return;
        }

        window.clearTimeout(settledTimer);
        settledTimer = window.setTimeout(() => {
            const settled = performance.now();
            performance.clearMarks?.('service_settled');
            performance.mark?.('service_settled');
            pushPerformanceEvent({
                event: 'service_performance',
                completeCommit: milestones.complete,
                renderKey: milestones.renderKey,
                settled,
                tocReady: milestones.tocReady,
            });
            milestones.complete = undefined;
            milestones.renderKey = undefined;
            milestones.tocReady = undefined;
        }, 750);
    };

    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name === 'service_complete_commit') {
                milestones.complete = entry.startTime;
                const detail = (entry as PerformanceMark).detail as { renderKey?: unknown } | null;
                milestones.renderKey = typeof detail?.renderKey === 'string' ? detail.renderKey : undefined;
                scheduleSettledReport();
            } else if (entry.name === 'service_toc_ready') {
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
