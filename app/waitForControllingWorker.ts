// update() can finish before installation, activation, or controller takeover.
export default async function waitForControllingWorker(
    registration: ServiceWorkerRegistration,
    signal: AbortSignal
): Promise<void> {
    const worker = registration.installing || registration.waiting || registration.active;
    if (!worker) throw new Error('No worker available');

    return new Promise<void>((resolve, reject) => {
        const cleanup = () => {
            worker.removeEventListener('statechange', inspect);
            navigator.serviceWorker.removeEventListener('controllerchange', inspect);
            signal.removeEventListener('abort', inspect);
        };
        const inspect = () => {
            if (signal.aborted || worker.state === 'redundant') {
                cleanup();
                reject(new Error('Update did not activate'));
            } else if (
                worker.state === 'activated' &&
                registration.active === worker &&
                navigator.serviceWorker.controller === worker
            ) {
                cleanup();
                resolve();
            }
        };
        worker.addEventListener('statechange', inspect);
        navigator.serviceWorker.addEventListener('controllerchange', inspect);
        signal.addEventListener('abort', inspect, { once: true });
        inspect();
    });
}
