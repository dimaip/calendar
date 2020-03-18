import { useQuery } from 'react-query';

export function fetchReadings(key, { date }) {
    return fetch(`${process.env.PUBLIC_URL}/api/readings/${date}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}

const useReadings = date => useQuery(['readings', { date }], fetchReadings);

export default useReadings;
