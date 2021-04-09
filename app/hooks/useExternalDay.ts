import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

const fetchExternalDay = (date) => cachedFetch(`https://psmb.ru/?calendarDate=${date}`);

const useExternalDay = (date) => useQuery(['ext-day', { date }], () => fetchExternalDay(date), { retry: false });

export default useExternalDay;
