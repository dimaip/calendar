import storage from './StorageAPIWrapper';

const fetchAndStore = async (url: string): Promise<string> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`, { cause: response });
        const text = await response.text();
        // A successful HTML error page must not replace usable offline JSON.
        JSON.parse(text);
        await storage.setItem(url, text);
        return text;
    } finally {
        clearTimeout(timeout);
    }
};

function cachedFetch<T>(url: string, source?: 'NORMAL'): Promise<T>;
// eslint-disable-next-line no-redeclare -- TypeScript overload for background prefetch results.
function cachedFetch<T>(url: string, source: 'PREFETCH_NORMAL' | 'PREFETCH_RELOAD'): Promise<T | undefined>;
// eslint-disable-next-line no-redeclare -- Implementation of the overloads above.
async function cachedFetch<T>(
    url: string,
    source: 'PREFETCH_NORMAL' | 'PREFETCH_RELOAD' | 'NORMAL' = 'NORMAL'
): Promise<T | undefined> {
    try {
        if (source === 'PREFETCH_RELOAD') {
            return JSON.parse(await fetchAndStore(url)) as T;
        }
        const value = await storage.getItem(url);
        if (value === null) {
            return JSON.parse(await fetchAndStore(url)) as T;
        }
        if (source === 'NORMAL' && navigator.onLine !== false) {
            void fetchAndStore(url).catch((error) => console.error(error));
        }
        return JSON.parse(value) as T;
    } catch (error) {
        console.warn(error);
        if (source === 'NORMAL') throw error;
        return undefined;
    }
}

export default cachedFetch;
