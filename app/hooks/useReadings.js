import { useQuery } from 'react-query';

export function fetchReadings({ date }) {
    return fetch(`/api/readings/${date}`).then(response => {
        if (response.status > 400) throw new Error('Error on fetch readings.');

        return response.json();
    });
}

const useReadings = date => useQuery(['readings', { date }], fetchReadings);

export default useReadings;
