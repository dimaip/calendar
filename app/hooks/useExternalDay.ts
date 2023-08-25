import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';
import useDay from 'hooks/useDay';

const fetchExternalDay = async (date: string, verses?: string[]): Promise<any> =>
    cachedFetch(`https://psmb.ru/?calendarDate=${date}${verses ? `&verses=${JSON.stringify(verses)}` : ''}`);

const useExternalDay = (date: string): any => {
    const dayQuery = useDay(date);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const readings = dayQuery.data?.readings?.Литургия;

    return useQuery(['ext-day', { date }], async () => fetchExternalDay(date, readings), {
        retry: false,
        enabled: dayQuery.isFetched,
    });
};

export default useExternalDay;
