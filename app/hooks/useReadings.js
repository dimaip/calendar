import { useQuery } from 'react-query';

export function fetchReadings(key, { date }) {
    return fetch(`${process.env.API_HOST}/readings/${date}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}

const useReadings = date => useQuery(['readings', { date }], fetchReadings, { retry: false });

export default useReadings;
