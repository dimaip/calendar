import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulProkimen = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Matins/Prokimens/Glas${glas}`} />;
    }
    return null;
};

const Prokimens = ({ day, date }) => (
    <>
        <Parts
            date={date}
            partNames={['matins.Прокимен утрени']}
            alwaysShowFallback
            fallback={<DefatulProkimen day={day} date={date} />}
        />
    </>
);

export default Prokimens;
