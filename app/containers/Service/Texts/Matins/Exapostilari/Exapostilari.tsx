import { calculateEasterDate } from 'domain/getDayInfo';

import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulExapostilari = ({ date }) => {
    const dateObj = new Date(date);

    const day = dateObj.getDay();
    if (day !== 0) {
        return null;
    }

    const y = dateObj.getFullYear();

    const easterDate = calculateEasterDate(y);
    const weeksSinceEaster = Math.floor((dateObj.getTime() - easterDate.getTime()) / (3600 * 1000 * 24 * 7)) + 1;

    let matinsKey = null;
    if (weeksSinceEaster >= 9) {
        matinsKey = ((weeksSinceEaster - 9) % 11) + 1;
    } else if (weeksSinceEaster > 1) {
        matinsKey = [1, 3, 4, 7, 8, 10, 9][weeksSinceEaster - 2];
    }

    if (!matinsKey) {
        return null;
    }

    return <MdxLoader src={`Matins/Exapostilari/${matinsKey}`} />;
};

const Exapostilari = ({ date }) => (
    <>
        <Parts
            date={date}
            partNames={['shared.Эксапостиларии']}
            alwaysShowFallback
            fallback={<DefatulExapostilari date={date} />}
        />
    </>
);

export default Exapostilari;
