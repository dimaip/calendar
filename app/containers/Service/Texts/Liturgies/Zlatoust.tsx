import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';
import dateFormat from 'dateformat';

import ZlatoustMdx from './Zlatoust.mdx';
import VespersWithZlatoustMdx from './VespersWithZlatoust.mdx';
import useLiturgy from './Vernie/useLiturgy';
import { getKatekhumenReadings } from './Katekhumen/Katekhumen';

const Zlatoust = ({ lang, date }) => {
    const { katekhumen, otpust, prichasten, saints, zadastoinik } = useLiturgy(lang, 'zlatoust');
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);

    const isAnnunciation = day?.title === 'Благовещение всесвятой Богородицы';

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const brightWeek = isEasterOffsetRange(0, 6);
    const easterSeason = isEasterOffsetRange(0, 38);
    const easterOtdanie = isEasterOffsetRange(38);
    const brightOrOtdanie = brightWeek || easterOtdanie;

    const props = {
        lang,
        date,
        katekhumen,
        otpust,
        prichasten,
        saints,
        zadastoinik,
        dayOfWeek,
        brightWeek,
        brightOrOtdanie,
        easterSeason,
        easterOtdanie,
        isEasterOffsetRange,
    };
    if (isAnnunciation) {
        const { apostol, gospel } = getKatekhumenReadings(day);
        const tomorrowDateObj = new Date(date);
        tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
        const tomorrowDate = dateFormat(tomorrowDateObj, 'yyyy-mm-dd');
        const { data: tomorrowDay } = useDay(tomorrowDate);
        return (
            <>
                <VespersWithZlatoustMdx
                    {...props}
                    apostol={apostol}
                    gospel={gospel}
                    tomorrowDate={tomorrowDate}
                    tomorrowDay={tomorrowDay}
                />
                <ZlatoustMdx {...props} onlyVernie />
            </>
        );
    }
    return <ZlatoustMdx {...props} />;
};

export default Zlatoust;
