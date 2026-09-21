import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import cachedFetch from 'utils/cachedFetch';
import type { Hymn } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

export type { Hymn } from 'data/contracts';

export async function fetchHymns(): Promise<Hymn[]> {
    return cachedFetch<Hymn[]>(`${process.env.API_HOST}/hymns`);
}

const useHymns = (): UseQueryResult<Hymn[], Error> =>
    useQuery<Hymn[]>({
        queryKey: queryKeys.hymns(),
        queryFn: fetchHymns,
        retry: false,
    });

export default useHymns;
