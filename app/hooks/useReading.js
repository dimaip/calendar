import { useQuery } from 'react-query';
import useReadings from './useReadings';

export function fetchReading({ link, translation }) {
    return fetch(`${process.env.PUBLIC_URL}/api/reading/` + encodeURI(link) + '&translation=' + translation)
        .then(response => {
            if (response.status > 400) throw new Error('Error on fetch reading.');

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
    const { data: readings } = useReadings(date);
    const { data: reading } = useQuery(['reading', { link, translation }], fetchReading);
    if (readings?.[link] && translation === 'default') {
        return readings[link];
    }
    return reading;
};

export default useReading;
