import { makeIsEasterOffsetRange, getFeastInfo } from 'domain/getDayInfo';

import dateFormat from 'dateformat';
import React from 'react';
import useDay from 'hooks/useDay';
import ReadingsForService from 'containers/Readings/ReadingsForService';
import Loader from 'components/Loader/Loader';
import { css } from 'emotion';
import SolidSection from 'components/SolidSection/SolidSection';
import SectionHeading from 'containers/Main/SectionHeading';
import Saints from 'containers/Main/Saints';
import Parts from 'components/Parts/Parts';

import Ending from '../Shared/Ending/Ending';

import Lent from './Lent.mdx';
import Prazdnichnaja from './Prazdnichnaja.mdx';
import Epiphany from './Epiphany.mdx';
import Epiphany2 from './Epiphany2.mdx';

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

const SectionLayout = ({ children }) => (
    <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
        {children}
    </SolidSection>
);

const Vespers = ({ date }) => {
    const dateObj = new Date(date);
    const tomorrowDateObj = new Date(date);
    tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
    const tomorrowDate = dateFormat(tomorrowDateObj, 'yyyy-mm-dd');
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);
    const { data: tomorrowDay } = useDay(tomorrowDate);

    const troparions = <Parts date={tomorrowDate} partNames={['shared.Тропари']} Layout={SectionLayout} />;

    const endHymns = (
        <Parts date={tomorrowDate} partNames={['shared.Кондаки', 'shared.Величания']} Layout={SectionLayout} />
    );

    const readingsForService = day?.bReadings?.['Вечером'] || day?.readings?.['Вечерня'];
    const readings = readingsForService ? (
        <>
            <Readings readingsForService={readingsForService} day={day} />
        </>
    ) : null;

    const saints = tomorrowDay?.saints && (
        <SolidSection marginTop={24} marginHorizontal={-12}>
            <SectionHeading>Святые дня</SectionHeading>
            <Saints saints={tomorrowDay.saints} date={date} />
        </SolidSection>
    );
    const otpust = <Ending date={tomorrowDate} saints={saints} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(tomorrowDate);
    const easterSeason = isEasterOffsetRange(0, 38);
    const isAscension = isEasterOffsetRange(39);
    const sirnajaSedmitza = isEasterOffsetRange(-8 * 7 + 1, -8 * 7 + 6);
    const vselenskayaRoditelskayaSubbota = isEasterOffsetRange(-8 * 7 - 1);
    const { feastType, title } = getFeastInfo(tomorrowDateObj);
    const isHoliday = dayOfWeek === 6 || feastType === 'great' || feastType === '12';
    const greatLent = tomorrowDay?.fastName === 'Великий пост';
    const isFast =
        !isHoliday &&
        (tomorrowDay?.fastName === 'Петров пост' ||
            tomorrowDay?.fastName === 'Успенский пост' ||
            tomorrowDay?.fastName === 'Рождественский пост' ||
            tomorrowDay?.fastName === 'Великий пост' ||
            vselenskayaRoditelskayaSubbota ||
            sirnajaSedmitza);

    if (title === 'Рождество Христово') {
        return (
            <Epiphany
                dayOfWeek={dayOfWeek}
                troparions={troparions}
                endHymns={endHymns}
                readings={readings}
                saints={saints}
                otpust={otpust}
                day={tomorrowDay}
                date={tomorrowDate}
            />
        );
    }
    if (title === 'Крещение Господне') {
        return (
            <Epiphany2
                dayOfWeek={dayOfWeek}
                troparions={troparions}
                endHymns={endHymns}
                readings={readings}
                saints={saints}
                otpust={otpust}
                day={tomorrowDay}
                date={tomorrowDate}
            />
        );
    }

    if (isFast) {
        return (
            <Lent
                dayOfWeek={dayOfWeek}
                troparions={troparions}
                endHymns={endHymns}
                readings={readings}
                saints={saints}
                easterSeason={easterSeason}
                isAscension={isAscension}
                otpust={otpust}
                day={tomorrowDay}
                date={tomorrowDate}
                sirnajaSedmitza={sirnajaSedmitza}
                greatLent={greatLent}
                isEasterOffsetRange={isEasterOffsetRange}
            />
        );
    }
    return (
        <Prazdnichnaja
            dayOfWeek={dayOfWeek}
            troparions={troparions}
            endHymns={endHymns}
            readings={readings}
            saints={saints}
            easterSeason={easterSeason}
            isAscension={isAscension}
            otpust={otpust}
            day={tomorrowDay}
            date={tomorrowDate}
            isHoliday={isHoliday}
        />
    );
};

export default Vespers;
