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
import Ending from '../Shared/Ending/Ending';
import Parts from 'components/Parts/Parts';

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
    <SolidSection marginTop={24} marginBottom={24} paddingTop={12} marginHorizontal={-12}>
        {children}
    </SolidSection>
);

const Matins = ({ date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);

    const troparions = <Parts date={date} partNames={['shared.Тропари']} Layout={SectionLayout} />;

    const endHymns = <Parts date={date} partNames={['shared.Кондаки', 'shared.Величания']} Layout={SectionLayout} />;

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

    const otpust = <Ending date={date} saints={saints} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);

    const isHoliday = dayOfWeek === 0 || day?.saints?.includes('5.svg') || day?.saints?.includes('6.svg');
    const isFast =
        !isHoliday &&
        (day?.fastName === 'Петров пост' ||
            day?.fastName === 'Успенский пост' ||
            day?.fastName === 'Рождественский пост');

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
                date={date}
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
            date={date}
            isEasterOffsetRange={isEasterOffsetRange}
            SectionLayout={SectionLayout}
        />
    );
};

export default Matins;
