import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export function fetchParts(date, lang) {
    return cachedFetch(`${process.env.API_HOST}/parts/${date}/${lang}`);
}

const useParts = (date, lang) => useQuery(['day', { date, lang }], () => fetchParts(date, lang), { retry: false });

export default useParts;
