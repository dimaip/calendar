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
import Prokimen from './Prokimen';
import Aliluja from './Aliluja';
import Prichasten from './Prichasten';
import VhodnoiStih from './VhodnoiStih';
import Tooltip from 'components/Tooltip/Tooltip';
import { useTheme } from 'emotion-theming';
import Trisvatoe from './Trisvatoe';
import Zadastoinik from './Zadastoinik';
import Otpust from './Otpust';
import Antifon1 from './Antifon1';
import Antifon2 from './Antifon2';
import Antifon3 from './Antifon3';

const Readings = ({ readings }) => (
    <>
        {readings
            .map(({ readingVerse, type }) =>
                readingVerse ? <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} /> : null
            )
            .filter(Boolean)}
    </>
);

export const VariableSection = ({ children, date }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                position: relative;
                background: ${theme.colours.bgGray};
                margin: 24px -12px 24px -12px;
                padding: 12px 12px 12px 12px;
            `}
        >
            <div
                className={css`
                    position: absolute;
                    top: 4px;
                    right: 10px;
                `}
            >
                <Tooltip>
                    Изменяемые части богослужения составлены нашим роботом-уставщиком. Он иногда ошибается. За наиболее
                    точной информацией обращайтесь к{' '}
                    <a
                        className={css`
                            text-decoration: underline;
                        `}
                        href={`http://www.patriarchia.ru/bu/${date}`}
                        target="_blank"
                    >
                        богослужебным указаниям
                    </a>
                </Tooltip>
            </div>
            {children}
        </div>
    );
};

const useLiturgy = (lang, serviceType) => {
    const { date } = useParams();
    const { data: day } = useDay(date);

    const externalDayQuery = useExternalDay(date);
    const { sermons: sermonsData } = externalDayQuery.data || {};

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
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
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
        <SolidSection paddingTop={8} marginTop={12} marginHorizontal={-12}>
            <Sermons date={date} sermons={sermonsData} hideTitle />
        </SolidSection>
    );

    const saints = day?.saints && (
        <SolidSection marginTop={24} marginHorizontal={-12}>
            <SectionHeading>Святые дня</SectionHeading>
            <Saints saints={day.saints} date={date} />
        </SolidSection>
    );

    const prokimen = (
        <VariableSection date={date}>
            <Prokimen day={day} date={date} />
        </VariableSection>
    );

    const aliluja = (
        <VariableSection date={date}>
            <Aliluja day={day} date={date} />
        </VariableSection>
    );

    const prichasten = (
        <VariableSection date={date}>
            <Prichasten day={day} date={date} />
        </VariableSection>
    );

    const vhodnoiStih = (
        <VariableSection date={date}>
            <VhodnoiStih day={day} lang={lang} />
        </VariableSection>
    );
    const otpust = (
        <VariableSection date={date}>
            <Otpust day={day} date={date} serviceType={serviceType} />
        </VariableSection>
    );

    const trisvatoe = <Trisvatoe day={day} lang={lang} />;

    const zadastoinik = <Zadastoinik day={day} />;

    const antifon1 = <Antifon1 lang={lang} date={date} />;
    const antifon2 = <Antifon2 lang={lang} date={date} />;
    const antifon3 = <Antifon3 lang={lang} date={date} />;

    return {
        hymns,
        apostol,
        gospel,
        sermons,
        saints,
        prokimen,
        aliluja,
        prichasten,
        vhodnoiStih,
        trisvatoe,
        zadastoinik,
        otpust,
        antifon1,
        antifon2,
        antifon3,
    };
};
export default useLiturgy;
