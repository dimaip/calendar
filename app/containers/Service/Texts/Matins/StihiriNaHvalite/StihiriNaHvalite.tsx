import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulStihiriNaHvalite = ({ day, date, externalTexts }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Matins/StihiriNaHvalite/Glas${glas}`} externalTexts={externalTexts} />;
    }
    return null;
};

const StihiriNaHvalite = ({ day, date }) => (
    <>
        <Parts
            date={date}
            partNames={['matins.Cтихиры на хвалите']}
            alwaysShowFallback
            fallback={(noTexts, externalTexts) => (
                <DefatulStihiriNaHvalite day={day} date={date} noTexts={noTexts} externalTexts={externalTexts} />
            )}
            fallbackRendersExternalTexts
            serviceType="Утреня"
        />
    </>
);

export default StihiriNaHvalite;
