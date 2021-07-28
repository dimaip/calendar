import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

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

const Kondacs = ({ day, date, serviceType = null }) => (
    <Parts
        date={date}
        partNames={['shared.Кондаки']}
        alwaysShowFallback
        fallback={<SundayKondacs day={day} date={date} />}
        serviceType={serviceType}
    />
);

export default Kondacs;
