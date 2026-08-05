import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import cachedFetch from 'utils/cachedFetch';
import type { PartsResponse } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';
import { getCalendarQueryPolicy } from 'data/calendarQueryPolicy';

export async function fetchParts(date: string, lang: string): Promise<PartsResponse> {
    return cachedFetch<PartsResponse>(`${process.env.API_HOST}/parts/${date}/${lang}`);
}

const useParts = (date: string, lang: string): UseQueryResult<PartsResponse, Error> =>
    useQuery<PartsResponse>({
        queryKey: queryKeys.parts(date, lang),
        queryFn: async () => fetchParts(date, lang),
        retry: false,
        ...getCalendarQueryPolicy(date),
    });

export default useParts;
