import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulProkimen = ({ date }) => {
    const dateObj = new Date(date);
    let dayOfWeek = dateObj.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    return <MdxLoader src={`Vespers/Prokimens/Prokimen${dayOfWeek}`} />;
};

const Prokimens = ({ date }) => {
    return (
        <>
            <Parts
                date={date}
                partNames={['vespers.Прокимен вечерни']}
                fallback={<DefatulProkimen date={date} />}
            />
        </>
    );
};

export default Prokimens;
