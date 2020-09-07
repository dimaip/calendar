import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Prazdnichnaja from './Prazdnichnaja.mdx';
import Lent from './Lent.mdx';
import useDay from 'hooks/useDay';
import ReadingsForService from 'containers/Readings/ReadingsForService';
import Loader from 'components/Loader/Loader';
import { css } from 'emotion';
import SolidSection from 'components/SolidSection/SolidSection';
import SectionHeading from 'containers/Main/SectionHeading';
import Saints from 'containers/Main/Saints';
import Hymns from 'containers/Main/Hymns';
import Ending from '../Shared/Ending/Ending';
import useParts from 'hooks/useParts';

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
const Vespers = ({ date }) => {
    const lang = 'ru';
    const dateObj = new Date(date);
    const tomorrowDateObj = new Date(date);
    tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);
    const { data: tomorrowDay } = useDay(tomorrowDateObj);
    const { data: tomorrowParts } = useParts(tomorrowDateObj, lang);

    const troparions = tomorrowParts?.shared?.['Тропари']?.length && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={tomorrowParts.shared['Тропари']} />
        </SolidSection>
    );
    const endHymns = (tomorrowParts?.shared?.['Кондаки']?.length || tomorrowParts?.shared?.['Величания']?.length) && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={(tomorrowParts?.shared?.['Кондаки'] || []) + (tomorrowParts?.shared?.['Величания'] || [])} />
        </SolidSection>
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
    const otpust = <Ending date={tomorrowDateObj} saints={saints} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(tomorrowDateObj);
    const easterSeason = isEasterOffsetRange(0, 38);
    const isAscension = isEasterOffsetRange(39);
    const isFast =
        tomorrowDay?.fastName === 'Петров пост' ||
        tomorrowDay?.fastName === 'Успенский пост' ||
        tomorrowDay?.fastName === 'Рождественский пост';
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
                date={tomorrowDateObj}
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
            date={tomorrowDateObj}
        />
    );
};

export default Vespers;
