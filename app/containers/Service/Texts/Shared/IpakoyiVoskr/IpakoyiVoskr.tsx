import React from 'react';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const IpakoyiVoskr = ({ day, date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Shared/IpakoyiVoskr/Glas${glas}`} />;
    }
    return null;
};

export default IpakoyiVoskr;
