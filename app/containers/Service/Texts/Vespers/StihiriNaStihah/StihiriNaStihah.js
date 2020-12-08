import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulStihiriNaStihah = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Vespers/StihiriNaStihah/Glas${glas}`} />;
    }
    return null;
};

const StihiriNaStihah = ({ day, date }) => {
    return (
        <>
            <Parts
                date={date}
                partNames={['vespers.Cтихиры на стихах']}
                alwaysShowFallback
                fallback={<DefatulStihiriNaStihah day={day} date={date} />}
            />
        </>
    );
};

export default StihiriNaStihah;
