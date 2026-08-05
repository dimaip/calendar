interface PendingResource<T> {
    status: 'pending';
    promise: Promise<T>;
}

interface ResolvedResource<T> {
    status: 'resolved';
    value: T;
}

interface RejectedResource {
    status: 'rejected';
    error: Error;
}

type Resource<T> = PendingResource<T> | ResolvedResource<T> | RejectedResource;

export interface SuspenseResourceCache<T> {
    clear: () => void;
    read: (key: string, load: () => Promise<T>) => T;
}

export const createSuspenseResourceCache = <T>(): SuspenseResourceCache<T> => {
    const resources = new Map<string, Resource<T>>();

    return {
        clear: () => {
            resources.clear();
        },
        read: (key, load) => {
            let resource = resources.get(key);

            if (!resource) {
                let loadPromise: Promise<T>;

                try {
                    loadPromise = load();
                } catch (error) {
                    const loadError = error instanceof Error ? error : new Error(String(error));
                    resources.set(key, { status: 'rejected', error: loadError });
                    throw loadError;
                }

                const promise = loadPromise.then(
                    (value) => {
                        resources.set(key, { status: 'resolved', value });
                        return value;
                    },
                    (error: unknown) => {
                        const loadError = error instanceof Error ? error : new Error(String(error));
                        resources.set(key, { status: 'rejected', error: loadError });
                        throw loadError;
                    }
                );

                resource = { status: 'pending', promise };
                resources.set(key, resource);
            }

            if (resource.status === 'pending') {
                // React Suspense deliberately uses thrown promises to pause rendering.
                // eslint-disable-next-line @typescript-eslint/only-throw-error
                throw resource.promise;
            }
            if (resource.status === 'rejected') {
                throw resource.error;
            }
            return resource.value;
        },
    };
};
