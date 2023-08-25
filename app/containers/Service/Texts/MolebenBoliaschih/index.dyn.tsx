import React from 'react';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import { makeIsDate, makeIsEasterOffsetRange } from 'domain/getDayInfo';

import MolebenBoliaschihMdx from './MolebenBoliaschih.mdx';


const MolebenBoliaschih = ({ lang }) => {
    const { date: yesterdayDate } = useParams();
    const dateObj = new Date(yesterdayDate);
    dateObj.setDate(dateObj.getDate() + 1);
    const date = dateFormat(dateObj, 'yyyy-mm-dd');
    const isDate = makeIsDate(dateObj);


    const isEasterOffsetRange = makeIsEasterOffsetRange(date);

    const props = {
        lang,
        date,
        yesterdayDate,
        isDate,
        isEasterOffsetRange,
    };

    return <MolebenBoliaschihMdx {...props} />;
};


export default MolebenBoliaschih;
