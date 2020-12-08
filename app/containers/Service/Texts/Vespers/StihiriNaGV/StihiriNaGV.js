import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulStihiriNaGV = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    console.log(glas, dayOfWeek)
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Vespers/StihiriNaGV/Glas${glas}`} />;
    }
    return null;
};

const StihiriNaGV = ({ day, date }) => {
    return (
        <>
            <Parts
                date={date}
                partNames={['vespers.Cтихиры на Господи взываю']}
                alwaysShowFallback
                fallback={<DefatulStihiriNaGV day={day} date={date} />}
            />
        </>
    );
};

export default StihiriNaGV;
