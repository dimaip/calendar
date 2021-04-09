import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export function fetchReadings(date) {
    return cachedFetch(`${process.env.API_HOST}/readings/${date}`);
}

const useReadings = (date) => useQuery(['readings', { date }], () => fetchReadings(date), { retry: false });

export default useReadings;
