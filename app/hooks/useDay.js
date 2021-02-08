import { getFeastInfo, getLentInfo } from 'domain/getDayInfo';

import { useQuery } from 'react-query';
import cachedFetch from 'utils/cachedFetch';

export function fetchDay(key, { date }) {
    return cachedFetch(`${process.env.API_HOST}/day/${date}`).then((res) => {
        let day = {};
        if (res) {
            const { comment, readings, bReadings, saints, seromns, title, glas, week } = res;

            const { colour: feastColour, icon: feastIcon } = getFeastInfo(new Date(date));
            const { fastName, fastingLevelName, colour: lentColour, icon: lentIcon } = getLentInfo(new Date(date));

            day = {
                comment,
                fastName,
                fastingLevelName,
                readings,
                bReadings,
                saints,
                seromns,
                title,
                glas,
                week,
                colour: feastColour || lentColour,
                icon: feastIcon || lentIcon || 'default.svg',
            };
        }

        return day;
    });
}

const useDay = (date) => useQuery(['day', { date }], fetchDay, { retry: false });

export default useDay;
