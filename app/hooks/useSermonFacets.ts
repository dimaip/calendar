import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import cachedFetch from 'utils/cachedFetch';
import type { SermonFacets } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

export type { SermonFacets, SermonTag } from 'data/contracts';

const fetchSermonFacets = async (): Promise<SermonFacets> => cachedFetch<SermonFacets>('https://psmb.ru/?facets=1');

const useSermonFacets = (): UseQueryResult<SermonFacets, Error> =>
    useQuery<SermonFacets>({
        queryKey: queryKeys.sermonFacets(),
        queryFn: fetchSermonFacets,
        retry: false,
    });

export default useSermonFacets;
