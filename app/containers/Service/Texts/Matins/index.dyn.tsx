import { makeIsEasterOffsetRange, getFeastInfo, makeIsDate } from 'domain/getDayInfo';

import React from 'react';
import useDay from 'hooks/useDay';
import ReadingsForService from 'containers/Readings/ReadingsForService';
import Loader from 'components/Loader/Loader';
import { css } from 'emotion';
import SolidSection from 'components/SolidSection/SolidSection';
import SectionHeading from 'containers/Main/SectionHeading';
import Saints from 'containers/Main/Saints';
import Parts from 'components/Parts/Parts';
import { SectionLayout } from 'components/SectionLayout/SectionLayout';
import { TroparionFavs } from 'containers/Main/TroparionFavs';

import Ending from '../Shared/Ending/Ending';
import Kondacs from '../Shared/Kondacs/Kondacs';
import Troparions from '../Shared/Troparions/Troparions';

import Prazdnichnaja from './Prazdnichnaja.mdx';
import PassionFriday from './PassionFriday.mdx';
import PassionSaturday from './PassionSaturday.mdx';
import Lent from './Lent.mdx';
import EasterZautrenia from './EasterZautrenia.mdx';
import EasterZautreniaObihod from './EasterZautreniaObihod.mdx';

const Readings = ({ readingsForService, day }) =>
    Boolean(day) ? (
        <div
            className={css`
                padding: 0 18px;
            `}
        >
            <ReadingsForService readingsForService={readingsForService} />
        </div>
    ) : (
        <Loader />
    );

const Matins = ({ date, obihod }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);
    const isDate = makeIsDate(dateObj);
    const y = dateObj.getFullYear();

    const troparions = (
        <SectionLayout>
            <Troparions date={date} day={day} serviceType="Утреня" />
            <TroparionFavs />
        </SectionLayout>
    );

    const endHymns = (
        <SectionLayout>
            <Kondacs date={date} day={day} serviceType="Утреня" />
            <Parts date={date} partNames={['shared.Величания']} serviceType="Утреня" />
        </SectionLayout>
    );

    const readingsForService = day?.bReadings?.['Утром'] || day?.readings?.['Утреня'];

    const containsGospel = Object.values(readingsForService || {})
        .flat()
        .some(
            (reading) =>
                reading.includes('Мф.') || reading.includes('Мк.') || reading.includes('Лк.') || reading.includes('Ин.')
        );

    const readings = (
        <>
            <Readings readingsForService={readingsForService} day={day} />
        </>
    );

    const saints = day?.saints && (
        <SolidSection marginTop={24} marginHorizontal={-12}>
            <SectionHeading>Святые дня</SectionHeading>
            <Saints saints={day.saints} date={date} />
        </SolidSection>
    );

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);
    const brightWeek = isEasterOffsetRange(0, 6);
    const easterOtdanie = isEasterOffsetRange(38);
    const brightOrOtdanie = brightWeek || easterOtdanie;

    const { feastType } = getFeastInfo(dateObj);

    const philaret = isDate(12, 2);
    const isHoliday = dayOfWeek === 0 || feastType === 'great' || feastType === '12' || philaret;

    const isAnnunciation = day?.title === 'Благовещение Богородицы';

    const sirnajaSedmitza = isEasterOffsetRange(-8 * 7 + 1, -8 * 7 + 5);
    const vselenskayaRoditelskayaSubbota = isEasterOffsetRange(-8 * 7 - 1);
    const troitskayaRoditelskayaSubbota = isEasterOffsetRange(7 * 7 - 1);
    const lentSubbota2 = isEasterOffsetRange(-5 * 7 - 1);
    const lentSubbota3 = isEasterOffsetRange(-4 * 7 - 1);
    const lentSubbota4 = isEasterOffsetRange(-3 * 7 - 1);
    const lentSubbotas = lentSubbota2 || lentSubbota3 || lentSubbota4;
    const lentSubbota5 = isEasterOffsetRange(-2 * 7 - 1);
    const lazarevaSubbota = isEasterOffsetRange(-1 * 7 - 1);
    const vospominanijaUsopshih = vselenskayaRoditelskayaSubbota || lentSubbotas || troitskayaRoditelskayaSubbota;
    const dmitrievskajaSubbota =
        dayOfWeek === 6 &&
        new Date(y, 10, 1).getTime() <= dateObj.getTime() &&
        dateObj.getTime() <= new Date(y, 10, 8).getTime();
    const greatLent = day?.fastName === 'Великий пост';
    const isFast =
        !(!(greatLent || vospominanijaUsopshih || dmitrievskajaSubbota) && dayOfWeek === 6) &&
        !lazarevaSubbota &&
        !lentSubbota5 &&
        !isHoliday &&
        (day?.fastName === 'Петров пост' ||
            day?.fastName === 'Успенский пост' ||
            day?.fastName === 'Рождественский пост' ||
            greatLent ||
            vospominanijaUsopshih ||
            dmitrievskajaSubbota ||
            sirnajaSedmitza);

    const otpust = <Ending date={date} saints={saints} isFast={isFast} />;

    const props = {
        dayOfWeek,
        troparions,
        endHymns,
        readings,
        containsGospel,
        saints,
        easterSeason,
        brightOrOtdanie,
        brightWeek,
        otpust,
        day,
        date,
        isFast,
        isEasterOffsetRange,
        SectionLayout,
        isHoliday,
        dmitrievskajaSubbota,
        isAnnunciation,
        isDate,
    };
    if (obihod) {
        return <EasterZautreniaObihod {...props} />;
    }
    if (isEasterOffsetRange(-2)) {
        return <PassionFriday {...props} />;
    }
    if (isEasterOffsetRange(-1)) {
        return <PassionSaturday {...props} />;
    }
    if (isEasterOffsetRange(0)) {
        return <EasterZautrenia {...props} />;
    }
    if (isFast) {
        return (
            <Lent
                {...props}
                greatLent={greatLent}
                vospominanijaUsopshih={vospominanijaUsopshih}
                vselenskayaRoditelskayaSubbota={vselenskayaRoditelskayaSubbota}
                lentSubbotas={lentSubbotas}
                sirnajaSedmitza={sirnajaSedmitza}
                troitskayaRoditelskayaSubbota={troitskayaRoditelskayaSubbota}
            />
        );
    }

    return <Prazdnichnaja {...props} />;
};

export default Matins;
