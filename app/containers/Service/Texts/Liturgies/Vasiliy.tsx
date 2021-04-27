import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

import React from 'react';

import useLiturgy from './Vernie/useLiturgy';
import VasiliyMdx from './Vasiliy.mdx';
import VespersWithVasilyPassionThursdayMdx from './VespersWithVasilyPassionThursday.mdx';
import VespersWithVasilyPassionSaturdayMdx from './VespersWithVasilyPassionSaturday.mdx';
import 'containers/Service/Texts/Shared.css';
import { getKatekhumenReadings } from './Katekhumen/Katekhumen';

import useDay from 'hooks/useDay';
import dateFormat from 'dateformat';

const Vasiliy = ({ lang, date }) => {
    const { katekhumen, saints, prichasten, otpust, zadastoinik } = useLiturgy(lang, 'vasiliy');
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
        zadastoinik,
        isEasterOffsetRange,
    };

    const { apostol, gospel } = getKatekhumenReadings(day);
    const tomorrowDateObj = new Date(date);
    tomorrowDateObj.setDate(tomorrowDateObj.getDate() + 1);
    const tomorrowDate = dateFormat(tomorrowDateObj, 'yyyy-mm-dd');
    if (isEasterOffsetRange(-3)) {
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
    if (isEasterOffsetRange(-1)) {
        return (
            <>
                <VespersWithVasilyPassionSaturdayMdx
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
