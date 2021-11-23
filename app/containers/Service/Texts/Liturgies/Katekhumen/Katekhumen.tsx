import isGospel from 'domain/isGospel';
import { makeIsEasterOffsetRange, getFeastInfo } from 'domain/getDayInfo';

import React from 'react';
import { css } from 'emotion';
import SolidSection from 'components/SolidSection/SolidSection';
import forEach from 'lodash.foreach';
import useExternalDay from 'hooks/useExternalDay';
import Sermons from 'containers/Main/Sermons';
import ReadingItem from 'containers/Readings/ReadingItem';
import { SectionLayout } from 'components/SectionLayout/SectionLayout';

import VariableSection from '../../VariableSection';
import Troparions from '../../Shared/Troparions/Troparions';
import Kondacs from '../../Shared/Kondacs/Kondacs';

import Antifon1 from './Antifon1/Antifon1';
import Antifon2 from './Antifon2/Antifon2';
import Antifon3 from './Antifon3/Antifon3';
import Aliluja from './Aliluja/Aliluja';
import Trisvatoe from './Trisvatoe/Trisvatoe';
import VhodnoiStih from './VhodnoiStih/VhodnoiStih';
import Reading from './Reading/Reading';
import KatekhumenMdx from './Katekhumen.mdx';

const Readings = ({ readings }) => (
    <>
        {readings
            .map(({ readingVerse, type }) =>
                readingVerse ? <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} /> : null
            )
            .filter(Boolean)}
    </>
);

export const getKatekhumenReadings = (day) => {
    const readings = day?.readings;
    const readingsForService = readings?.['Литургия'];

    const readingVersesWithType = [];
    forEach(readingsForService, (readingVerses, type) => {
        readingVerses.forEach((readingVerse) => {
            readingVersesWithType.push({
                readingVerse,
                type,
            });
        });
    });

    const apostolReadings = readingVersesWithType.filter((reading) => !isGospel(reading.readingVerse));
    const gospelReadings = readingVersesWithType.filter((reading) => isGospel(reading.readingVerse));

    const apostol = (
        <div className={css``}>
            <Readings readings={apostolReadings} />
        </div>
    );
    const gospel = <Readings readings={gospelReadings} />;
    return { apostol, gospel };
};

const Katekhumen = ({ date, day, serviceType }) => {
    const externalDayQuery = useExternalDay(date);
    const { apostol, gospel } = getKatekhumenReadings(day);

    const antifon1 = <Antifon1 date={date} />;
    const antifon2 = <Antifon2 date={date} />;
    const antifon3 = <Antifon3 date={date} />;
    const reading = <Reading day={day} date={date} />;

    const hymns = (
        <SectionLayout>
            <Troparions date={date} day={day} serviceType="Литургия" />
            <Kondacs date={date} day={day} serviceType="Литургия" />
        </SectionLayout>
    );

    const aliluja = (
        <VariableSection date={date}>
            <Aliluja day={day} date={date} />
        </VariableSection>
    );

    const trisvatoe = <Trisvatoe date={date} />;

    const vhodnoiStih = (
        <VariableSection date={date}>
            <VhodnoiStih date={date} />
        </VariableSection>
    );

    const { sermons: sermonsData } = externalDayQuery.data || {};

    const sermons = (
        <SolidSection paddingTop={8} marginTop={12} marginHorizontal={-12}>
            <Sermons date={date} sermons={sermonsData} hideTitle />
        </SolidSection>
    );

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const brightWeek = isEasterOffsetRange(0, 6);
    const easterSeason = isEasterOffsetRange(0, 38);
    const easterOtdanie = isEasterOffsetRange(38);
    const { feastType } = getFeastInfo(new Date(date));
    const isTwelve = feastType === '12';
    const brightOrOtdanie = brightWeek || easterOtdanie;
    const katekhumenProps = {
        date,
        serviceType,
        brightWeek,
        easterSeason,
        easterOtdanie,
        brightOrOtdanie,
        isEasterOffsetRange,
        isTwelve,
        antifon1,
        antifon2,
        antifon3,
        reading,
        hymns,
        apostol,
        gospel,
        aliluja,
        trisvatoe,
        vhodnoiStih,
        sermons,
        css,
    };
    return <KatekhumenMdx {...katekhumenProps} />;
};

export default Katekhumen;
