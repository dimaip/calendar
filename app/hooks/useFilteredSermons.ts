import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import cachedFetch from 'utils/cachedFetch';
import type { SermonSummary } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

export type { SermonSummary as Sermon } from 'data/contracts';

const fetchFilteredSermons = async (
    authorId?: string,
    themeId?: string,
    limit?: number,
    offset?: number
): Promise<SermonSummary[]> => {
    const url = new URL('https://psmb.ru/?listSermons=1');

    if (authorId) {
        url.searchParams.append('author', authorId);
    }

    if (themeId) {
        url.searchParams.append('theme', themeId);
    }

    if (limit) {
        url.searchParams.append('limit', limit.toString());
    }

    if (offset) {
        url.searchParams.append('offset', offset.toString());
    }

    return cachedFetch<SermonSummary[]>(url.toString());
};

const useFilteredSermons = (
    authorId?: string,
    themeId?: string,
    limit?: number,
    offset?: number
): UseQueryResult<SermonSummary[], Error> =>
    useQuery<SermonSummary[]>({
        queryKey: queryKeys.filteredSermons(authorId, themeId, limit, offset),
        queryFn: async () => fetchFilteredSermons(authorId, themeId, limit, offset),
        retry: false,
    });

export default useFilteredSermons;
