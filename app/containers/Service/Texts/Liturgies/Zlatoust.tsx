import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';
import dateFormat from 'dateformat';
import forEach from 'lodash.foreach';
import ReadingItem from 'containers/Readings/ReadingItem';
import { css } from 'emotion';

import ZlatoustMdx from './Zlatoust.mdx';
import VespersWithZlatoustMdx from './VespersWithZlatoust.mdx';
import useLiturgy from './Vernie/useLiturgy';
import { getKatekhumenReadings } from './Katekhumen/Katekhumen';

const Readings = ({ readings }) => (
    <>
        {readings
            .map(({ readingVerse, type }) =>
                readingVerse ? <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} /> : null
            )
            .filter(Boolean)}
    </>
);

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

        const readings = day?.readings;
        const readingsForService = readings?.['Вечерня'];

        const readingVersesWithType = [];
        forEach(readingsForService, (readingVerses, type) => {
            readingVerses.forEach((readingVerse) => {
                readingVersesWithType.push({
                    readingVerse,
                    type,
                });
            });
        });
        const firstReading = readingVersesWithType[0] && (
            <div className={css``}>
                <Readings readings={[readingVersesWithType[0]]} />
            </div>
        );
        const secondReading = readingVersesWithType[1] && <Readings readings={[readingVersesWithType[1]]} />;

        return (
            <>
                <VespersWithZlatoustMdx
                    {...props}
                    apostol={apostol}
                    gospel={gospel}
                    tomorrowDate={tomorrowDate}
                    tomorrowDay={tomorrowDay}
                    firstReading={firstReading}
                    secondReading={secondReading}
                />
                <ZlatoustMdx {...props} onlyVernie />
            </>
        );
    }
    return <ZlatoustMdx {...props} />;
};

export default Zlatoust;
