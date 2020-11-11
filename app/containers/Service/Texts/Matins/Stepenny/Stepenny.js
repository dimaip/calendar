import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulStepenna = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Matins/Stepenny/Glas${glas}`} />;
    }
    return null;
};

const Stepenny = ({ day, date }) => {
    return (
        <>
            <Parts
                date={date}
                partNames={['matins.Степенны']}
                alwaysShowFallback
                fallback={<DefatulStepenna day={day} date={date} />}
            />
        </>
    );
};

export default Stepenny;
