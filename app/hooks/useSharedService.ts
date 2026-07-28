import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import type { SharedService, SharedServiceReference } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

export type { SharedService } from 'data/contracts';

export async function fetchSharedService(userId: string, serviceId: string, versionId: string): Promise<SharedService> {
    return fetch(`${process.env.API_HOST}/service/${userId}/${serviceId}/${versionId}`).then(async (value) => {
        if (!value.ok) {
            throw new Error('Bad response');
        }
        return value.json() as Promise<SharedService>;
    });
}

export const useSharedServiceQuery = (
    userId: string | undefined,
    serviceId: string | undefined,
    versionId: string | undefined,
    enabled: boolean
): UseQueryResult<SharedService, Error> =>
    useQuery<SharedService>({
        queryKey: queryKeys.sharedService(userId, serviceId, versionId),
        queryFn: async () => {
            if (!userId || !serviceId || !versionId) {
                throw new Error('Missing shared service reference');
            }
            return fetchSharedService(userId, serviceId, versionId);
        },
        retry: false,
        enabled,
    });

const useSharedService = (versionData: string) => {
    const version = versionData ? (JSON.parse(atob(versionData)) as SharedServiceReference) : undefined;
    return useSharedServiceQuery(version?.userId, version?.serviceId, version?.versionId, Boolean(version?.userId));
};

export default useSharedService;
