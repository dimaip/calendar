import { useQuery } from 'react-query';

const fetchExternalDay = (key, { date }) => {
    return fetch(`${process.env.PUBLIC_URL}/api/external-day/${date}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
};

const useExternalDay = date => useQuery(['ext-day', { date }], fetchExternalDay, {retry: false});

export default useExternalDay;
