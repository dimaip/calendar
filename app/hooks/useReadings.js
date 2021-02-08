import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export function fetchReadings(key, { date }) {
    return cachedFetch(`${process.env.API_HOST}/readings/${date}`);
}

const useReadings = (date) => useQuery(['readings', { date }], fetchReadings, { retry: false });

export default useReadings;
