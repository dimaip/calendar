import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

const fetchExternalDay = (key, { date }) => {
    return cachedFetch(`https://psmb.ru/?calendarDate=${date}`);
};

const useExternalDay = date => useQuery(['ext-day', { date }], fetchExternalDay, { retry: false });

export default useExternalDay;
