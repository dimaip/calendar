import getWrapper from './StorageAPIWrapper';
const wrapper = getWrapper();

/**
 * Make a fetch request and cache it to IndexedDB
 *
 * @param {string} url
 * @param {boolean} prefetch just prefetch the data without returning
 */
const cachedFetch = async (
    url: string,
    source: 'PREFETCH_NORMAL' | 'PREFETCH_RELOAD' | 'NORMAL' = 'NORMAL'
): Promise<unknown> =>
    new Promise(function (resolve, reject) {
        wrapper.openStore({ database: 'pb', table: 'requestsCache' }, (res) => {
            if (!res) {
                reject('Unable to open the store');
            } else {
                if (source === 'PREFETCH_RELOAD') {
                    fetch(url)
                        .then(async (response) => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.text();
                        })
                        .then((text) => {
                            // Save to cache
                            wrapper.setItem(url, text, () => {});
                            resolve(text);
                        })
                        // We swallow errors on update requests
                        .catch((e) => console.error(e));
                } else {
                    wrapper.getItem(url, (value) => {
                        if (value) {
                            if (source === 'NORMAL') {
                                // Return saved value
                                resolve(value);
                                // And re-fetch the data in background (if not prefetching)
                                fetch(url)
                                    .then(async (response) => {
                                        if (!response.ok) {
                                            throw new Error(response.statusText);
                                        }
                                        return response.text();
                                    })
                                    .then((text) => {
                                        // Save to cache
                                        wrapper.setItem(url, text, () => {});
                                    })
                                    // We swallow errors on update requests
                                    .catch((e) => console.error(e));
                            } else if (source === 'PREFETCH_NORMAL') {
                                resolve(value);
                            }
                        } else {
                            // Request not cached, fetch it
                            fetch(url)
                                .then(async (response) => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.text();
                                })
                                .then((text) => {
                                    // Save to cache
                                    wrapper.setItem(url, text, () => {});
                                    resolve(text);
                                })
                                .catch((e) => reject(e));
                        }
                    });
                }
            }
        });
    })
        .then((json) => {
            // When prefetching don't waste time parsing json
            if (source !== 'NORMAL') {
                return null;
            }
            return JSON.parse(json);
        })
        .catch((e) => {
            console.warn(e);
            if (source === 'NORMAL') {
                throw e;
            }
        });

export default cachedFetch;
