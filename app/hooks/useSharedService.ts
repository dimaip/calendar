import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export interface SharedService {
    userId: string;
    scriptVersionId: number;
    scriptVersionName: string;
    service: string;
    customPrayers: Array<{ id: number; text: string }>;
    disabledPrayers: string[];
    extraPrayers: Record<string, string[]>;
}

export async function fetchSharedService(userId: string, serviceId: string, versionId: string) {
    return cachedFetch<SharedService>(`${process.env.API_HOST}/service/${userId}/${serviceId}/${versionId}`);
}

export const useSharedServiceQuery = (userId: string, serviceId: string, versionId: string, enabled: boolean) =>
    useQuery(
        ['sharedService', { userId, serviceId, versionId }],
        async () => fetchSharedService(userId, serviceId, versionId),
        { retry: false, enabled }
    );

const useSharedService = (versionData: string) => {
    const { userId, versionId, serviceId } = versionData ? JSON.parse(atob(versionData)) : {};
    return useSharedServiceQuery(userId, serviceId, versionId, Boolean(userId));
};

export default useSharedService;
