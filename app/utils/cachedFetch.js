import getWrapper from './StorageAPIWrapper';
const wrapper = getWrapper();

const cachedFetch = async (url, prefetch = false) => {
    return new Promise(function(resolve, reject) {
        wrapper.openStore({ database: 'pb', table: 'requestsCache' }, res => {
            if (!res) {
                reject('Unable to open the store');
            } else {
                wrapper.getItem(url, value => {
                    if (value) {
                        resolve(value);
                    } else {
                        fetch(url)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText);
                                }
                                return response.text();
                            })
                            .then(text => {
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
