import { useQuery } from 'react-query';

const fetchExternalDay = date => {
    return fetch(`/api/external-day/${date}`).then(response => {
        if (response.status > 400) throw new Error('Error on fetch external day.');

        return response.json();
    });
};

const useDay = date => {
    const { data } = useQuery(`ext-day-${date}`, () => fetchExternalDay(date));
    return data;
};

export default useDay;
