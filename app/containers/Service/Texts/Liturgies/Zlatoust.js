import React from 'react';
import ZlatoustMdx from './Zlatoust.mdx';
import useLiturgy from './Vernie/useLiturgy';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

const Zlatoust = ({ lang, date }) => {
    const { katekhumen, otpust, prichasten, saints, zadastoinik } = useLiturgy(lang, 'zlatoust');
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const brightWeek = isEasterOffsetRange(0, 6);
    const easterSeason = isEasterOffsetRange(0, 38);
    const easterOtdanie = isEasterOffsetRange(38);
    return (
        <ZlatoustMdx
            lang={lang}
            date={date}
            katekhumen={katekhumen}
            otpust={otpust}
            prichasten={prichasten}
            saints={saints}
            zadastoinik={zadastoinik}
            dayOfWeek={dayOfWeek}
            brightWeek={brightWeek}
            easterSeason={easterSeason}
            easterOtdanie={easterOtdanie}
            isEasterOffsetRange={isEasterOffsetRange}
        />
    );
};

export default Zlatoust;
