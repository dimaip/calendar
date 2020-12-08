import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulStihiriNaHvalite = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Matins/StihiriNaHvalite/Glas${glas}`} />;
    }
    return null;
};

const StihiriNaHvalite = ({ day, date }) => {
    return (
        <>
            <Parts
                date={date}
                partNames={['matins.Cтихиры на хвалите']}
                alwaysShowFallback
                fallback={<DefatulStihiriNaHvalite day={day} date={date} />}
            />
        </>
    );
};

export default StihiriNaHvalite;
