/** @type {import('workbox-core/types').WorkboxPlugin} */
const precacheRetryPlugin = {
    async fetchDidSucceed({ request, response, event }) {
        if (event?.type !== 'install') return response;

        let nextResponse = response;
        for (const delay of [1000, 2000]) {
            if (![500, 502, 503, 504].includes(nextResponse.status)) break;
            await new Promise((resolve) => setTimeout(resolve, delay));
            nextResponse = await fetch(request.clone());
        }
        // Workbox still rejects an unsuccessful final response. Never activate
        // a release with missing assets or change runtime image/API caching.
        return nextResponse;
    },
};

export default precacheRetryPlugin;
