import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulStihiriNaGV = ({ day, date, externalTexts, hasExclusiveEnding }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return (
            <MdxLoader
                src={`Vespers/StihiriNaGV/Glas${glas}`}
                externalTexts={externalTexts}
                hasExclusiveEnding={hasExclusiveEnding}
            />
        );
    }
    return null;
};

const StihiriNaGV = ({ day, date }) => (
    <>
        <Parts
            date={date}
            partNames={['vespers.Cтихиры на Господи взываю']}
            alwaysShowFallback
            serviceType="Вечерня"
            fallback={(_noTexts, externalTexts, hasExclusiveEnding) => (
                <DefatulStihiriNaGV
                    day={day}
                    date={date}
                    externalTexts={externalTexts}
                    hasExclusiveEnding={hasExclusiveEnding}
                />
            )}
            fallbackRendersExternalTexts
        />
    </>
);

export default StihiriNaGV;
