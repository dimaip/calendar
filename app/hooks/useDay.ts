import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import { getFeastInfo, getLentInfo } from 'domain/getDayInfo';
import type { Day, DayApiResponse } from 'data/contracts';
import { queryKeys } from 'data/queryKeys';
import cachedFetch from 'utils/cachedFetch';

export async function fetchDay(date: string): Promise<Day> {
    return cachedFetch<DayApiResponse>(`${process.env.API_HOST}/day/${date}`).then((res) => {
        let day: Day = {};
        if (res) {
            const { comment, readings, bReadings, saints, seromns, title, glas, week, matinsGospelKey } = res;

            const { colour: feastColour, icon: feastIcon } = getFeastInfo(new Date(date));
            const lentInfo = getLentInfo(new Date(date));
            const fastingLevelName =
                typeof lentInfo?.fastingLevelName === 'string' ? lentInfo.fastingLevelName : undefined;

            day = {
                comment,
                fastName: lentInfo?.fastName,
                fastingLevelName,
                readings,
                bReadings,
                saints,
                seromns,
                title,
                glas,
                week,
                matinsGospelKey,
                colour: feastColour || lentInfo?.colour,
                icon: feastIcon || lentInfo?.icon || 'default.svg',
            };
        }

        return day;
    });
}

const useDay = (date: string): UseQueryResult<Day, Error> =>
    useQuery<Day>({
        queryKey: queryKeys.day(date),
        queryFn: async () => fetchDay(date),
        retry: false,
    });

export default useDay;
