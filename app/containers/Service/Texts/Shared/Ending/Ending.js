import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import MdxLoader from '../../MdxLoader';
import Html from 'components/Html/Html';

const Ending = ({ day, date, saints }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);
    const dateObject = new Date(date);
    const isSunday = dateObject.getDay() === 0;

    let otpust;
    const otpustExternal = day?.parts?.shared?.['Отпуст Синаксарный'];
    if (otpustExternal) {
        otpust = <Html html={otpustExternal} />;
    } else if (isSunday || easterSeason) {
        otpust = <MdxLoader src="Shared/Ending/EasterOtpust" />;
    } else {
        otpust = <MdxLoader src="Shared/Ending/Otpust" />;
    }

    if (easterSeason) {
        return <MdxLoader src="Shared/Ending/EasterEnding" otpust={otpust} saints={saints} />;
    }
    return (
        <MdxLoader
            src="Shared/Ending/Ending"
            otpust={otpust}
            saints={saints}
            isEasterOffsetRange={isEasterOffsetRange}
        />
    );
};
export default Ending;
