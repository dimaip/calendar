import { isHymnsVsednev } from 'domain/getDayInfo';

import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

export const WeekdayKondacs = ({ day, date, serviceType, noTexts }): JSX.Element | null => {
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
    return <MdxLoader src={`Shared/Kondacs/Day${dayOfWeek}`} />;
};

export const SundayKondacs = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Shared/Kondacs/Glas${glas}`} />;
    }
    return null;
};

const Kondacs = ({ day, date, serviceType, isMain = false }) => (
    <Parts
        date={date}
        partNames={['shared.Кондаки']}
        alwaysShowFallback
        fallback={(noTexts) => (
            <>
                {!isMain && day?.fastName !== 'Великий пост' && <WeekdayKondacs day={day} date={date} serviceType={serviceType} noTexts={noTexts} />}
                <SundayKondacs day={day} date={date} />
            </>
        )}
        serviceType={serviceType}
    />
);

export default Kondacs;
