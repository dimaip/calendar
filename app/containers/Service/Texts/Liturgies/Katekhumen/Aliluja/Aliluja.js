import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulAliluja = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Liturgies/Katekhumen/Aliluja/Sunday/Glas${glas}`} />;
    }
    return <MdxLoader src={`Liturgies/Katekhumen/Aliluja/WeekDays/${dayOfWeek}`} />;
};

const Aliluja = ({ day, date }) => {
    return (
        <Parts
            date={date}
            partNames={['liturgy.Аллилуарий']}
            alwaysShowFallback
            fallback={<DefatulAliluja day={day} date={date} />}
        />
    );
};

export default Aliluja;
