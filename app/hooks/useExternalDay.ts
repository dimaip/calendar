import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import cachedFetch from 'utils/cachedFetch';
import useDay from 'hooks/useDay';
import type { ExternalDay, ReadingVersesByType } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

const fetchExternalDay = async (date: string, verses?: ReadingVersesByType): Promise<ExternalDay> =>
    cachedFetch<ExternalDay>(
        `https://psmb.ru/?calendarDate=${date}${verses ? `&verses=${JSON.stringify(verses)}` : ''}`
    );

const useExternalDay = (date: string): UseQueryResult<ExternalDay, Error> => {
    const dayQuery = useDay(date);

    const readings = dayQuery.data?.readings?.Литургия;

    return useQuery<ExternalDay>({
        queryKey: queryKeys.externalDay(date),
        queryFn: async () => fetchExternalDay(date, readings),
        retry: false,
        enabled: dayQuery.isFetched,
    });
};

export default useExternalDay;
