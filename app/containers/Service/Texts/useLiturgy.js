import React from 'react';
import { useParams } from 'react-router-dom';
import forEach from 'lodash.foreach';
import useDay from 'hooks/useDay';
import isGospel from 'domain/isGospel';
import { css } from 'emotion';
import useScrollToReadings from './useScrollToReadings';
import useExternalDay from 'hooks/useExternalDay';
import SolidSection from 'components/SolidSection/SolidSection';
import Sermons from 'containers/Main/Sermons';
import Hymns from 'containers/Main/Hymns';
import ReadingItem from 'containers/Readings/ReadingItem';
import Saints from 'containers/Main/Saints';
import SectionHeading from 'containers/Main/SectionHeading';
import { useTheme } from 'emotion-theming';

const Readings = ({ readings }) => (
    <>
        {readings.map(({ readingVerse, type }) => (
            <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} />
        ))}
    </>
);

const useLiturgy = () => {
    const { date } = useParams();
    const { data: day } = useDay(date);

    const externalDayQuery = useExternalDay(date);
    const { sermons: sermonsData, thisDays } = externalDayQuery.data || {};

    useScrollToReadings();

    const readings = day?.readings;
    const readingsForService = readings?.['Литургия'];

    const readingVersesWithType = [];
    forEach(readingsForService, (readingVerses, type) => {
        readingVerses.forEach(readingVerse => {
            readingVersesWithType.push({
                readingVerse,
                type,
            });
        });
    });

    const apostolReadings = readingVersesWithType.filter(reading => !isGospel(reading.readingVerse));
    const gospelReadings = readingVersesWithType.filter(reading => isGospel(reading.readingVerse));

    const hymns = day?.prayers && day.prayers.length > 0 && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18}>
            <Hymns hymns={day.prayers} />
        </SolidSection>
    );

    const apostol = (
        <div className={css``}>
            <Readings readings={apostolReadings} />
        </div>
    );
    const gospel = <Readings readings={gospelReadings} />;

    const sermons = (
        <SolidSection paddingTop={8} marginTop={12}>
            <Sermons date={date} sermons={sermonsData} hideTitle />
        </SolidSection>
    );

    const saints = day?.saints && (
        <SolidSection marginTop={24}>
            <SectionHeading>Святые дня</SectionHeading>
            <Saints saints={day.saints} date={date} />
        </SolidSection>
    );

    return { hymns, apostol, gospel, sermons, saints };
};
export default useLiturgy;
