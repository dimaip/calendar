let version: string | null = null;
let cacheTime = 0;
let versionRequest: Promise<string | null> | null = null;
let updateRequest: Promise<void> | null = null;
let reloading = false;

const dismissedVersions = new Set<string>();
const reloadedVersions = new Set<string>();
const dismissedKey = 'app-updates:dismissed:v1';
const reloadedKey = 'app-updates:reloaded:v1';

for (const [key, versions] of [
    [dismissedKey, dismissedVersions],
    [reloadedKey, reloadedVersions],
] as const) {
    try {
        const stored: unknown = JSON.parse(window.sessionStorage.getItem(key) || '[]');
        if (Array.isArray(stored)) {
            stored.forEach((item: unknown) => {
                if (typeof item === 'string') versions.add(item);
            });
        }
    } catch {
        // Storage can be unavailable; the current page still remembers dismissal.
    }
}

export function dismissUpdate(pendingVersion: string): void {
    dismissedVersions.add(pendingVersion);
    try {
        window.sessionStorage.setItem(dismissedKey, JSON.stringify(Array.from(dismissedVersions)));
    } catch {
        // Keep the in-memory choice when browser storage is unavailable.
    }
}

async function fetchVersion(signal: AbortSignal): Promise<string | null> {
    const response = await fetch(`${process.env.PUBLIC_URL}/built/version.json`, { cache: 'no-store', signal });
    if (!response.ok) return null;
    const value: unknown = await response.json();
    return typeof value === 'string' && /^[a-z0-9]{4,40}$/i.test(value) ? value : null;
}

// Detection announces availability. Installation/reload belongs to the user's click.
const checkVersion = async (manual = false): Promise<string | null> => {
    if (
        process.env.NODE_ENV !== 'production' ||
        !('serviceWorker' in navigator) ||
        typeof AbortController === 'undefined' ||
        navigator.onLine === false
    ) {
        return null;
    }
    if (!versionRequest && (manual || !cacheTime || Date.now() - cacheTime > 60 * 1000)) {
        cacheTime = Date.now();
        versionRequest = (async () => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);
            try {
                version = await fetchVersion(controller.signal);
            } catch {
                version = null;
            } finally {
                clearTimeout(timeout);
                versionRequest = null;
            }
            return version;
        })();
    }
    const available = versionRequest ? await versionRequest : version;
    if (
        !available ||
        available === VERSION ||
        (!manual && (dismissedVersions.has(available) || reloadedVersions.has(available)))
    ) {
        return null;
    }
    try {
        const registration = await navigator.serviceWorker.getRegistration();
        // A banner can be dismissed while an earlier navigation check is pending.
        return registration && (manual || (!dismissedVersions.has(available) && !reloadedVersions.has(available)))
            ? available
            : null;
    } catch {
        return null;
    }
};

export async function applyUpdate(pendingVersion: string): Promise<void> {
    if (updateRequest) return updateRequest;
    if (reloading) return Promise.resolve();

    updateRequest = (async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 120000);
        const timedOut = new Promise<never>((_resolve, reject) => {
            controller.signal.onabort = () => reject(new Error('Update timed out'));
        });
        try {
            if (navigator.onLine === false) throw new Error('Update requires a connection');
            const registration = await Promise.race([navigator.serviceWorker.getRegistration(), timedOut]);
            if (!registration) throw new Error('No update registration');

            // update() resolves before installation finishes. Bound it as well as
            // the activation wait; an unavailable server must never force a reload.
            await Promise.race([registration.update(), timedOut]);
            const worker = registration.installing || registration.waiting || registration.active;
            if (!worker) throw new Error('No worker available');

            await new Promise<void>((resolve, reject) => {
                const cleanup = () => {
                    worker.removeEventListener('statechange', inspect);
                    navigator.serviceWorker.removeEventListener('controllerchange', inspect);
                    controller.signal.removeEventListener('abort', inspect);
                };
                const inspect = () => {
                    if (controller.signal.aborted || worker.state === 'redundant') {
                        cleanup();
                        reject(new Error('Update did not activate'));
                    } else if (
                        worker.state === 'activated' &&
                        registration.active === worker &&
                        navigator.serviceWorker.controller === worker
                    ) {
                        cleanup();
                        resolve();
                    }
                };
                worker.addEventListener('statechange', inspect);
                navigator.serviceWorker.addEventListener('controllerchange', inspect);
                controller.signal.addEventListener('abort', inspect, { once: true });
                inspect();
            });

            if ((await fetchVersion(controller.signal)) !== pendingVersion)
                throw new Error('Advertised release changed');
            const response = await fetch(window.location.href.split('#')[0], {
                cache: 'no-store',
                signal: controller.signal,
            });
            if (!response.ok) throw new Error('Updated app is unavailable');
            // Read through the active worker, preserving the actual homescreen URL.
            // An activated old worker or partially staged release is not enough.
            const shell = new DOMParser().parseFromString(await response.text(), 'text/html');
            const nextMain = shell.querySelector<HTMLScriptElement>('script[src*="/built/main."]');
            const currentMain = document.querySelector<HTMLScriptElement>('script[src*="/built/main."]');
            if (
                !nextMain ||
                !currentMain ||
                new URL(nextMain.getAttribute('src') || '', window.location.href).href === currentMain.src
            ) {
                throw new Error('The updated app is not ready');
            }
            if (controller.signal.aborted) throw new Error('Update timed out');

            // Persist before navigating. If a delivery/cache race still returns the
            // old document, ordinary navigation cannot prompt another reload loop.
            reloadedVersions.add(pendingVersion);
            try {
                window.sessionStorage.setItem(reloadedKey, JSON.stringify(Array.from(reloadedVersions)));
            } catch {
                // Reload is only ever caused by an explicit click, even without storage.
            }
            reloading = true;
            window.location.reload();
        } finally {
            clearTimeout(timeout);
            controller.signal.onabort = null;
            controller.abort();
        }
    })().finally(() => {
        updateRequest = null;
    });
    return updateRequest;
}

export default checkVersion;
