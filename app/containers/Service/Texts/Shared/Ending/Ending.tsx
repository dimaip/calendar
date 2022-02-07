import { makeIsEasterOffsetRange, getFeastInfo, getLentInfo } from 'domain/getDayInfo';

import React from 'react';
import Parts from 'components/Parts/Parts';

import MdxLoader from '../../MdxLoader';

const Ending = ({ date, saints, annunciation }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const easterSeason = isEasterOffsetRange(0, 38);
    const dateObject = new Date(date);
    const isSunday = dateObject.getDay() === 0;

    const { title } = getFeastInfo(dateObject);
    const { fastName } = getLentInfo(dateObject);

    const greatLent = fastName === 'Великий пост';

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
            hidePreotpust={annunciation}
            isEasterOffsetRange={isEasterOffsetRange}
            hideTverdina={isEasterOffsetRange(0, 49) || title === 'Рождество Христово'}
            greatLent={greatLent}
        />
    );
};
export default Ending;
