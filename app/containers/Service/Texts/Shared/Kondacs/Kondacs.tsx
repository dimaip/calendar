import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulKondacs = ({ day, date }) => {
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

const Kondacs = ({ day, date }) => (
    <Parts
        date={date}
        partNames={['shared.Кондаки']}
        alwaysShowFallback
        fallback={<DefatulKondacs day={day} date={date} />}
    />
);

export default Kondacs;
