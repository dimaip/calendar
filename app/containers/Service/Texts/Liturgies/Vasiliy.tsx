import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';

import useLiturgy from './Vernie/useLiturgy';
import VasiliyMdx from './Vasiliy.mdx';
import VespersWithVasilyPassionThursdayMdx from './VespersWithVasilyPassionThursday.mdx';
import 'containers/Service/Texts/Shared.css';
import { getKatekhumenReadings } from './Katekhumen/Katekhumen';

import useDay from 'hooks/useDay';
import dateFormat from 'dateformat';

const Vasiliy = ({ lang, date }) => {
    const { katekhumen, saints, prichasten, otpust } = useLiturgy(lang, 'vasiliy');
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const day = useDay(date);

    const props = {
        lang,
        date,
        katekhumen,
        otpust,
        prichasten,
        saints,
        dayOfWeek,
        isEasterOffsetRange,
    };

    if (isEasterOffsetRange(-3)) {
        const { apostol, gospel } = getKatekhumenReadings(day);
        const tomorrowDateObj = new Date(date);
        tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
        const tomorrowDate = dateFormat(tomorrowDateObj, 'yyyy-mm-dd');

        return (
            <>
                <VespersWithVasilyPassionThursdayMdx
                    {...props}
                    apostol={apostol}
                    gospel={gospel}
                    tomorrowDate={tomorrowDate}
                />
                <VasiliyMdx {...props} onlyVernie />
            </>
        );
    }

    return <VasiliyMdx {...props} />;
};

export default Vasiliy;
