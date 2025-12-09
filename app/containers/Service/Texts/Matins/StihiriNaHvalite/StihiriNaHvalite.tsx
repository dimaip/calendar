import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefaultStihiriNaHvalite = ({ day, date, externalTexts, hasExclusiveBeginning }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return (
            <MdxLoader
                src={`Matins/StihiriNaHvalite/Glas${glas}`}
                externalTexts={
                    <>
                        {externalTexts}
                        {!hasExclusiveBeginning && Boolean(day?.matinsGospelKey) && (
                            <MdxLoader src={`Matins/StihiriNaHvalite/Gospel/${day?.matinsGospelKey}`} />
                        )}
                    </>
                }
            />
        );
    }
    return null;
};

const StihiriNaHvalite = ({ day, date }) => (
    <>
        <Parts
            date={date}
            partNames={['matins.Стихиры на хвалите']}
            alwaysShowFallback
            fallback={(noTexts, externalTexts, flags) => (
                <DefaultStihiriNaHvalite
                    day={day}
                    date={date}
                    noTexts={noTexts}
                    externalTexts={externalTexts}
                    hasExclusiveBeginning={flags?.hasExclusiveBeginning}
                />
            )}
            fallbackRendersExternalTexts
            serviceType="Утреня"
        />
    </>
);

export default StihiriNaHvalite;
