// Use Workbox's revision keys, validation and cache writes, with a bounded
// download pool so a large text library can finish installing before timeout.
export default async function installPrecache(controller, event) {
    const entries = controller.getURLsToCacheKeys().entries();
    await Promise.all(
        Array.from({ length: 6 }, async () => {
            for (const [url, cacheKey] of entries) {
                const request = new Request(url, {
                    cache: url === cacheKey ? 'default' : 'reload',
                    credentials: 'same-origin',
                    integrity: controller.getIntegrityForCacheKey(cacheKey),
                });
                await Promise.all(controller.strategy.handleAll({ request, event, params: { cacheKey } }));
            }
        })
    );
}
