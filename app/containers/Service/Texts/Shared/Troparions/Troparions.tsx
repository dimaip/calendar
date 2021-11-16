import { isHymnsVsednev } from 'domain/getDayInfo';

import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

export const WeekdayTroparions = ({ day, date, serviceType, noTexts }): JSX.Element | null => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0) {
        return null;
    }
    if (
        (serviceType === 'Литургия' && !isHymnsVsednev(dateObj)) ||
        ((serviceType === 'Вечерня' || serviceType === 'Утреня') && !noTexts)
    ) {
        return null;
    }
    return <MdxLoader src={`Shared/Troparions/Day${dayOfWeek}`} />;
};

export const SundayTroparions = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Shared/Troparions/Glas${glas}`} />;
    }
    return null;
};

const Troparions = ({ day, date, serviceType, isMain = false }) => (
    <Parts
        date={date}
        partNames={['shared.Тропари']}
        alwaysShowFallback
        fallback={(noTexts) => (
            <>
                {!isMain && <WeekdayTroparions day={day} date={date} serviceType={serviceType} noTexts={noTexts} />}
                <SundayTroparions day={day} date={date} />
            </>
        )}
        serviceType={serviceType}
    />
);

export default Troparions;
