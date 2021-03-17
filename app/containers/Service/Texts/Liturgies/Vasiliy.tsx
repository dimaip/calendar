import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';

import useLiturgy from './Vernie/useLiturgy';
import VasiliyMdx from './Vasiliy.mdx';
import 'containers/Service/Texts/Shared.css';

const Vasiliy = ({ lang, date }) => {
    const { katekhumen, saints, prichasten, otpust } = useLiturgy(lang, 'vasiliy');
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);

    return (
        <VasiliyMdx
            lang={lang}
            date={date}
            katekhumen={katekhumen}
            otpust={otpust}
            prichasten={prichasten}
            saints={saints}
            dayOfWeek={dayOfWeek}
            isEasterOffsetRange={isEasterOffsetRange}
        />
    );
};

export default Vasiliy;
