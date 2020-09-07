import React, { useRef } from 'react';
import useAudio from 'hooks/useAudio';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulProkimen = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    const ref = useRef();
    useAudio(ref);
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader ref1={ref} src={`Liturgies/Katekhumen/Prokimen/Sunday/Glas${glas}`} />;
    }
    return <MdxLoader ref1={ref} src={`Liturgies/Katekhumen/Prokimen/WeekDays/${dayOfWeek}`} />;
};

const Prokimen = ({ day, date }) => {
    return (
        <>
            <Parts
                date={date}
                partNames={['liturgy.Прокимен']}
                alwaysShowFallback
                fallback={<DefatulProkimen day={day} date={date} />}
            />
        </>
    );
};

export default Prokimen;
