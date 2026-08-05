import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import cachedFetch from 'utils/cachedFetch';
import type { ReadingsResponse } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';
import { getCalendarQueryPolicy } from 'data/calendarQueryPolicy';

export async function fetchReadings(date: string): Promise<ReadingsResponse> {
    return cachedFetch<ReadingsResponse>(`${process.env.API_HOST}/readings/${date}`);
}

const useReadings = (date: string, enabled = true): UseQueryResult<ReadingsResponse, Error> =>
    useQuery<ReadingsResponse>({
        queryKey: queryKeys.readings(date),
        queryFn: async () => fetchReadings(date),
        retry: false,
        ...getCalendarQueryPolicy(date),
        enabled,
    });

export default useReadings;
