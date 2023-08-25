import React, { useRef } from 'react';
import useAudio from 'hooks/useAudio';
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
        return <MdxLoader src={`Liturgies/Katekhumen/Prokimens/Sunday/Glas${glas}`} />;
    }
    return <MdxLoader src={`Liturgies/Katekhumen/Prokimens/WeekDays/${dayOfWeek}`} />;
};

const Prokimens = ({ day, date }) => (
    <>
        <Parts
            date={date}
            partNames={['liturgy.Прокимен']}
            alwaysShowFallback
            fallback={<DefatulProkimen day={day} date={date} />}
            serviceType="Литургия"
        />
    </>
);

export default Prokimens;
