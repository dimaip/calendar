import { App } from '@capacitor/app';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { addBreadcrumb, captureException, Severity } from '@sentry/react';

const updateOrigin = 'https://molitva.app/ios-updates/';
const checkInterval = 5 * 60 * 1000;
let started = false;
let checking = false;
let lastCheck = -Infinity;

export async function startIosLiveUpdates() {
    if (started || Capacitor.getPlatform() !== 'ios' || !Capacitor.isPluginAvailable('CapacitorUpdater')) return;
    started = true;

    try {
        // This runs after React commits. A broken startup never acknowledges the bundle.
        await CapacitorUpdater.notifyAppReady();
        const { version } = await App.getInfo();
        if (!/^\d+\.\d+\.\d+$/.test(version)) return;
        const endpoint = `${updateOrigin}${version}/`;

        const check = async () => {
            if (
                checking ||
                Date.now() - lastCheck < checkInterval ||
                navigator.onLine === false ||
                document.visibilityState !== 'visible'
            ) {
                return;
            }
            checking = true;
            lastCheck = Date.now();
            try {
                const response = await CapacitorHttp.get({
                    url: `${endpoint}manifest.json`,
                    headers: { 'Cache-Control': 'no-cache' },
                    responseType: 'json',
                    disableRedirects: true,
                    connectTimeout: 5000,
                    readTimeout: 10000,
                });
                // An unpublished or paused channel leaves the current bundle in place.
                if (response.status !== 200 || response.data === null) return;
                const manifest: unknown = response.data;
                if (
                    typeof manifest !== 'object' ||
                    !manifest ||
                    !('nativeVersion' in manifest) ||
                    manifest.nativeVersion !== version ||
                    !('sha256' in manifest) ||
                    typeof manifest.sha256 !== 'string' ||
                    !/^[a-f0-9]{64}$/.test(manifest.sha256)
                ) {
                    return;
                }
                const checksum = manifest.sha256;
                const [{ bundle: current }, pending, { bundles }] = await Promise.all([
                    CapacitorUpdater.current(),
                    CapacitorUpdater.getNextBundle(),
                    CapacitorUpdater.list(),
                ]);
                if (
                    current.version === checksum ||
                    pending?.version === checksum ||
                    bundles.some((bundle) => bundle.version === checksum && bundle.status === 'error')
                ) {
                    return;
                }
                const bundle = await CapacitorUpdater.download({
                    version: checksum,
                    checksum,
                    url: `${endpoint}bundles/${checksum}.zip`,
                });
                await CapacitorUpdater.next({ id: bundle.id });
            } catch (error) {
                addBreadcrumb({ category: 'ios-live-update', level: Severity.Warning, message: String(error) });
            } finally {
                checking = false;
            }
        };

        const checkInBackground = () => {
            void check();
        };
        document.addEventListener('visibilitychange', checkInBackground);
        window.addEventListener('online', checkInBackground);
        checkInBackground();
    } catch (error) {
        captureException(error);
    }
}
