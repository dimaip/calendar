import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const DefatulStihiriNaGV = ({ day, date, externalTexts }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const glas = day?.glas;
    if (dayOfWeek === 0) {
        if (!glas) {
            return null;
        }
        return <MdxLoader src={`Vespers/StihiriNaGV/Glas${glas}`} externalTexts={externalTexts} />;
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
            fallback={(_noTexts, externalTexts) => (
                <DefatulStihiriNaGV day={day} date={date} externalTexts={externalTexts} />
            )}
            fallbackRendersExternalTexts
        />
    </>
);

export default StihiriNaGV;
