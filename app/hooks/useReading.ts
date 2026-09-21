import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import useReadings from './useReadings';

import cachedFetch from 'utils/cachedFetch';
import type { ReadingResponse } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';

export async function fetchReading(
    link: string,
    translation: string,
    translationPriority: string[] = []
): Promise<ReadingResponse> {
    return cachedFetch<ReadingResponse>(
        `${process.env.API_HOST}/reading/${encodeURI(
            link
        )}&translation=${translation}&translationPriority=${translationPriority.join(',')}`
    ).then((res) => {
        let reading = {};
        if (res) {
            const { bookKey, bookName, chapCount, fragments, translationCurrent, translationList, verseKey } = res;

            reading = {
                bookKey,
                bookName,
                chapCount,
                fragments,
                translationCurrent,
                translationList,
                verseKey,
            };
        }

        return reading;
    });
}

type ReadingQueryResult = Pick<UseQueryResult<ReadingResponse, Error>, 'data' | 'status'>;

const useReading = (
    link: string,
    translation: string,
    date: string,
    translationPriority: string[] = []
): ReadingQueryResult => {
    const { data: readings } = useReadings(date);
    const readingQuery = useQuery<ReadingResponse>({
        queryKey: queryKeys.reading(link, translation),
        queryFn: async () => fetchReading(link, translation, translationPriority),
        retry: false,
    });
    if (readings?.[link] && translation === 'default') {
        return {
            data: readings[link],
            status: 'success',
        };
    }
    return readingQuery;
};

export default useReading;
