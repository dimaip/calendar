import React from 'react';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import forEach from 'lodash.foreach';
import useDay from 'hooks/useDay';
import ReadingItem from 'containers/Readings/ReadingItem';
import { css } from 'emotion';
import SolidSection from 'components/SolidSection/SolidSection';
import SectionHeading from 'containers/Main/SectionHeading';
import Saints from 'containers/Main/Saints';
import { makeIsDate, makeIsEasterOffsetRange } from 'domain/getDayInfo';
import LpodMdx from './Lpod.mdx';

const Readings = ({ readings }) => (
    <>
        {readings
            .map(({ readingVerse, type }) =>
                readingVerse ? <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} /> : null
            )
            .filter(Boolean)}
    </>
);

const Lpod = ({ lang }) => {
    const { date: yesterdayDate } = useParams();
    const dateObj = new Date(yesterdayDate);
    dateObj.setDate(dateObj.getDate() + 1);
    const date = dateFormat(dateObj, 'yyyy-mm-dd');
    const isDate = makeIsDate(dateObj);

    const { data: day } = useDay(date);
    const { data: yesterdayDay } = useDay(yesterdayDate);

    const saints = day?.saints && (
        <SolidSection marginTop={24} marginHorizontal={-12}>
            <SectionHeading>Святые дня</SectionHeading>
            <Saints saints={day.saints} date={date} />
        </SolidSection>
    );

    const readings = yesterdayDay?.readings;
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

    const gospelReading = readingVersesWithType[2] && <Readings readings={[readingVersesWithType[2]]} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);

    const props = {
        firstReading,
        secondReading,
        gospelReading,
        lang,
        date,
        yesterdayDate,
        isDate,
        day,
        isEasterOffsetRange,
        saints,
    };

    return <LpodMdx {...props} />;
};

export default Lpod;
