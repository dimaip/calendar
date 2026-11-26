import { Capacitor, registerPlugin } from '@capacitor/core';
import LocalForage from 'jeep-localforage';

// Keep the database and table names used by the previous Capacitor plugin.
const webStore = LocalForage.createInstance({
    name: 'pbIDB',
    storeName: 'requestsCache',
    driver: [LocalForage.INDEXEDDB, LocalForage.WEBSQL],
});

interface RequestCachePlugin {
    get(options: { key: string }): Promise<{ value: string | null }>;
    set(options: { key: string; value: string }): Promise<void>;
}

const nativeStore = registerPlugin<RequestCachePlugin>('RequestCache');

export default {
    async getItem(key: string) {
        if (Capacitor.getPlatform() === 'ios') {
            return (await nativeStore.get({ key })).value;
        }
        return webStore.getItem<string>(key);
    },
    async setItem(key: string, value: string) {
        if (Capacitor.getPlatform() === 'ios') {
            await nativeStore.set({ key, value });
        } else {
            await webStore.setItem(key, value);
        }
    },
};
