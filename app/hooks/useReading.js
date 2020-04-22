import { useQuery } from 'react-query';
import useReadings from './useReadings';

export function fetchReading(key, { link, translation }) {
    return fetch(`${process.env.API_HOST}/reading/` + encodeURI(link) + '&translation=' + translation)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        })
        .then(res => {
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

const useReading = (link, translation, date) => {
    const { data: readings, status: readingsStatus } = useReadings(date);
    const readingQuery = useQuery(['reading', { link, translation }], fetchReading, { retry: false });
    if (readings?.[link] && translation === 'default') {
        return {
            data: readings[link],
            status: 'success',
        };
    }
    return readingQuery;
};

export default useReading;
