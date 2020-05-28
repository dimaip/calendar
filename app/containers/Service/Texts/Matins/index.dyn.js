import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Prazdnichnaja from './Prazdnichnaja.mdx';
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
const Matins = ({ date, lang }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const { data: day } = useDay(date);

    const hymns = day?.prayers && day.prayers.length > 0 && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={day.prayers} />
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

    const otpust = <Ending date={dateObj} lang={lang} day={day} />;

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);
    const fominaToPetrov = isEasterOffsetRange(7, 57);
    if (fominaToPetrov) {
        return (
            <Prazdnichnaja
                dayOfWeek={dayOfWeek}
                hymns={hymns}
                readings={readings}
                saints={saints}
                easterSeason={easterSeason}
                otpust={otpust}
                day={day}
                isEasterOffsetRange={isEasterOffsetRange}
            />
        );
    }
    return <>На этот день мы еще не успели составить чин службы</>;
};

export default Matins;
