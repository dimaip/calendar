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
const Matins = ({ date }) => {
    const lang = 'ru';
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);

    const troparions = day?.troparions && day.troparions.length > 0 && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={day.troparions} />
        </SolidSection>
    );
    const endHymns = (day?.kondacs || day?.velichanija) && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={(day.kondacs || '') + (day.velichanija || '')} />
        </SolidSection>
    );

    const readingsForService = day?.bReadings?.['Утром'] || day?.readings?.['Утреня'];
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

    const otpust = <Ending date={dateObj} day={day} saints={saints} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);
    const isFast =
        day?.fastName === 'Петров пост' ||
        day?.fastName === 'Успенский пост' ||
        day?.fastName === 'Рождественский пост';

    if (isFast) {
        return (
            <Lent
                dayOfWeek={dayOfWeek}
                troparions={troparions}
                endHymns={endHymns}
                readings={readings}
                saints={saints}
                easterSeason={easterSeason}
                otpust={otpust}
                day={day}
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
            otpust={otpust}
            day={day}
            isEasterOffsetRange={isEasterOffsetRange}
        />
    );
};

export default Matins;
