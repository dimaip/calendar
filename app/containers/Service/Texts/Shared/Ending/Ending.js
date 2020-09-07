import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import MdxLoader from '../../MdxLoader';
import Html from 'components/Html/Html';
import Parts from 'components/Parts/Parts';

const Ending = ({ date, saints }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);
    const dateObject = new Date(date);
    const isSunday = dateObject.getDay() === 0;

    const otpust = (
        <Parts
            date={date}
            partNames={['shared.Отпуст Синаксарный']}
            fallback={
                isSunday || easterSeason ? (
                    <MdxLoader src="Shared/Ending/EasterOtpust" />
                ) : (
                    <MdxLoader src="Shared/Ending/Otpust" />
                )
            }
        />
    );

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
