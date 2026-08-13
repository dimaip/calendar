import { registerErrorRecovery } from 'utils/recoverableError';

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
    const retainRejection = (key: string, error: unknown): Error => {
        const loadError = error instanceof Error ? error : new Error(String(error));
        const resource: RejectedResource = { status: 'rejected', error: loadError };
        resources.set(key, resource);
        registerErrorRecovery(loadError, () => {
            if (resources.get(key) === resource) {
                resources.delete(key);
            }
        });
        return loadError;
    };

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
                    throw retainRejection(key, error);
                }

                const promise = loadPromise.then(
                    (value) => {
                        resources.set(key, { status: 'resolved', value });
                        return value;
                    },
                    (error: unknown) => {
                        throw retainRejection(key, error);
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
