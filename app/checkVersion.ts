import waitForControllingWorker from './waitForControllingWorker';

let version: string | null = null;
let cacheTime = 0;
let versionRequest: Promise<string | null> | null = null;
let updateRequest: Promise<void> | null = null;
let reloading = false;

const suppressedVersions = new Set<string>();
const suppressedKey = 'app-updates:suppressed:v1';

try {
    const stored: unknown = JSON.parse(window.sessionStorage.getItem(suppressedKey) || '[]');
    if (Array.isArray(stored)) {
        stored.forEach((item: unknown) => {
            if (typeof item === 'string') suppressedVersions.add(item);
        });
    }
} catch {
    // Storage can be unavailable; the current page still remembers the choice.
}

// Dismissal and accepting an update both stop repeated automatic notices.
export function suppressUpdateNotice(pendingVersion: string): void {
    suppressedVersions.add(pendingVersion);
    try {
        window.sessionStorage.setItem(suppressedKey, JSON.stringify(Array.from(suppressedVersions)));
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
    if (!available || available === VERSION || (!manual && suppressedVersions.has(available))) {
        return null;
    }
    try {
        const registration = await navigator.serviceWorker.getRegistration();
        // A banner can be dismissed while an earlier navigation check is pending.
        return registration && (manual || !suppressedVersions.has(available)) ? available : null;
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
            await waitForControllingWorker(registration, controller.signal);

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
            if (shell.querySelector('meta[name="app-version"]')?.getAttribute('content') !== pendingVersion) {
                throw new Error('The updated app is not ready');
            }
            if (controller.signal.aborted) throw new Error('Update timed out');

            // Persist before navigating. If a delivery/cache race still returns the
            // old document, ordinary navigation cannot prompt another reload loop.
            suppressUpdateNotice(pendingVersion);
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
