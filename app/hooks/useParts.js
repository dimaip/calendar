import { useQuery } from 'react-query';

export function fetchParts(key, { date, lang }) {
    return fetch(`${process.env.API_HOST}/parts/${date}/${lang}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}

const useParts = (date, lang) => useQuery(['day', { date, lang }], fetchParts, { retry: false });

export default useParts;
