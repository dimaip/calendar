import { useQuery } from 'react-query';

export function fetchReading(link, translation) {
    return fetch(`/api/reading/` + encodeURI(link) + '&translation=' + translation)
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

const useReading = (link, translation) => {
    const { data } = useQuery(`reading-${link}-${translation}`, () => fetchReading(link, translation));
    return data;
};

export default useReading;
