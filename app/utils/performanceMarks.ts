export interface NavigationMeasurement {
    key: string;
    sequence: number;
}

type PerformanceDetail = Record<string, unknown>;

let navigationSequence = 0;
let currentNavigation: NavigationMeasurement | undefined;

const createNavigationMeasurement = (prefix: 'startup' | 'navigation'): NavigationMeasurement => {
    navigationSequence += 1;
    return {
        key: `${prefix}-${navigationSequence}`,
        sequence: navigationSequence,
    };
};

export const getCurrentNavigationMeasurement = (): NavigationMeasurement => {
    if (!currentNavigation) {
        currentNavigation = createNavigationMeasurement('startup');
    }
    return currentNavigation;
};

export const markPerformance = (
    name: string,
    detail: PerformanceDetail = {},
    navigation = getCurrentNavigationMeasurement()
) => {
    if (typeof performance === 'undefined' || !performance.mark) {
        return;
    }

    try {
        performance.mark(name, {
            detail: {
                ...detail,
                navigationKey: navigation.key,
                navigationSequence: navigation.sequence,
            },
        });
    } catch {
        performance.mark(name);
    }
};

export const markNavigationIntent = (detail: PerformanceDetail): NavigationMeasurement => {
    currentNavigation = createNavigationMeasurement('navigation');
    markPerformance('navigation_intent', detail, currentNavigation);
    return currentNavigation;
};
