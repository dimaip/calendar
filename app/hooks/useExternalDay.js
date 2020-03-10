import { useQuery } from 'react-query';

const fetchExternalDay = ({ date }) => {
    return fetch(`${process.env.PUBLIC_URL}/api/external-day/${date}`).then(response => {
        if (response.status > 400) throw new Error('Error on fetch external day.');

        return response.json();
    });
};

const useExternalDay = date => useQuery(['ext-day', { date }], fetchExternalDay);

export default useExternalDay;
