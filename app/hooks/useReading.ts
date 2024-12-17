import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

import useReadings from './useReadings';

export async function fetchReading(link, translation, translationPriority = []) {
    return cachedFetch(
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

const useReading = (link, translation, date, translationPriority = []) => {
    const { data: readings, status: readingsStatus } = useReadings(date);
    const readingQuery = useQuery(
        ['reading', { link, translation }],
        async () => fetchReading(link, translation, translationPriority),
        {
            retry: false,
        }
    );
    if (readings?.[link] && translation === 'default' && !translationPriority?.length) {
        return {
            data: readings[link],
            status: 'success',
        };
    }
    return readingQuery;
};

export default useReading;
