import getWrapper from './StorageAPIWrapper';
const wrapper = getWrapper();

const fetchAndStore = async (url: string): Promise<string> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`, { cause: response });
        const text = await response.text();
        // A successful HTML error page must not replace usable offline JSON.
        JSON.parse(text);
        await new Promise<void>((resolve, reject) => {
            wrapper.setItem(url, text, (result: boolean | Error) => {
                if (result === true) resolve();
                else reject(new Error(`Unable to cache ${url}`));
            });
        });
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
    return new Promise<string>((resolve, reject) => {
        wrapper.openStore({ database: 'pb', table: 'requestsCache' }, (result: boolean | Error) => {
            if (result !== true) {
                reject(new Error('Unable to open the store'));
                return;
            }
            if (source === 'PREFETCH_RELOAD') {
                void fetchAndStore(url).then(resolve, reject);
                return;
            }
            wrapper.getItem(url, (value: string | null | Error) => {
                if (value instanceof Error) {
                    reject(value);
                } else if (value !== null && value !== undefined) {
                    resolve(value);
                    if (source === 'NORMAL' && navigator.onLine !== false) {
                        void fetchAndStore(url).catch((error) => console.error(error));
                    }
                } else {
                    void fetchAndStore(url).then(resolve, reject);
                }
            });
        });
    })
        .then((json) => JSON.parse(json) as T)
        .catch((error) => {
            console.warn(error);
            if (source === 'NORMAL') throw error;
            return undefined;
        });
}

export default cachedFetch;
