import getWrapper from './StorageAPIWrapper';
const wrapper = getWrapper();

/**
 * Make a fetch request and cache it to IndexedDB
 *
 * @param {string} url
 * @param {boolean} prefetch just prefetch the data without returning
 */
const cachedFetch = async (url, prefetch = false) => {
    return new Promise(function(resolve, reject) {
        wrapper.openStore({ database: 'pb', table: 'requestsCache' }, res => {
            if (!res) {
                reject('Unable to open the store');
            } else {
                wrapper.getItem(url, value => {
                    if (value) {
                        // Return saved value
                        resolve(value);
                        // And re-fetch the data in background (if not prefetching)
                        if (!prefetch) {
                            fetch(url)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(response.statusText);
                                    }
                                    return response.text();
                                })
                                .then(text => {
                                    // Save to cache
                                    wrapper.setItem(url, text, () => {});
                                })
                                // We swallow errors on update requests
                                .catch(e => console.error(e));
                        }
                    } else {
                        // Request not cached, fetch it
                        fetch(url)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText);
                                }
                                return response.text();
                            })
                            .then(text => {
                                // Save to cache
                                wrapper.setItem(url, text, () => {});
                                resolve(text);
                            })
                            .catch(e => reject(e));
                    }
                });
            }
        });
    }).then(json => {
        // When prefetching don't waste time parsing json
        if (prefetch) {
            return null;
        }
        return JSON.parse(json);
    });
};

export default cachedFetch;
