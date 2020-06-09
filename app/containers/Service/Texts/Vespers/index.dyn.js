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

    const hymns = tomorrowDay?.prayers && tomorrowDay.prayers.length > 0 && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={tomorrowDay.prayers} />
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
    const otpust = <Ending date={tomorrowDateObj} lang={lang} day={tomorrowDay} saints={saints} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(tomorrowDateObj);
    const easterSeason = isEasterOffsetRange(0, 38);
    const isAscension = isEasterOffsetRange(39);
    const fominaToPetrov = isEasterOffsetRange(7, 56);
    const petrov = tomorrowDay.fastName === 'Петров пост';
    if (fominaToPetrov) {
        return (
            <Prazdnichnaja
                dayOfWeek={dayOfWeek}
                hymns={hymns}
                readings={readings}
                saints={saints}
                easterSeason={easterSeason}
                isAscension={isAscension}
                otpust={otpust}
                day={tomorrowDay}
            />
        );
    }
    if (petrov) {
        return (
            <Lent
                dayOfWeek={dayOfWeek}
                hymns={hymns}
                readings={readings}
                saints={saints}
                easterSeason={easterSeason}
                isAscension={isAscension}
                otpust={otpust}
                day={tomorrowDay}
            />
        );
    }
    return <>На этот день мы еще не успели составить чин службы</>;
};

export default Vespers;
