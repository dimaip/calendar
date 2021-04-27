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
import PassionThursday from './PassionThursday.mdx';
import PassionFriday from './PassionFriday.mdx';

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
    const isAnnunciation = tomorrowDay?.title === 'Благовещение Всесвятой Богородицы';
    const otpust = <Ending date={tomorrowDate} saints={saints} annunciation={isAnnunciation} />;

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

    const props = {
        dayOfWeek,
        troparions,
        endHymns,
        readings,
        saints,
        easterSeason,
        isAscension,
        otpust,
        day: tomorrowDay,
        date: tomorrowDate,
        previousDate: date,
        isHoliday,
        isEasterOffsetRange,
    };

    if (isEasterOffsetRange(-2)) {
        return <PassionThursday {...props} />;
    }
    if (isEasterOffsetRange(-1)) {
        return <PassionFriday {...props} />;
    }
    if (title === 'Рождество Христово') {
        return <Epiphany {...props} />;
    }
    if (title === 'Крещение Господне') {
        return <Epiphany2 {...props} />;
    }

    if (isFast || isAnnunciation) {
        return (
            <Lent
                {...props}
                annunciation={isAnnunciation}
                sirnajaSedmitza={sirnajaSedmitza}
                greatLent={greatLent && !isAnnunciation}
            />
        );
    }
    return <Prazdnichnaja {...props} />;
};

export default Vespers;
