import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Fallback = ({ serviceType, date }) => {
    const dateObject = new Date(date);
    const isSunday = dateObject.getDay() === 0;

    if (serviceType === 'vasiliy') {
        return <MdxLoader src="Liturgies/Vernie/Otpust/Vasiliy" isSunday={isSunday} />;
    }
    if (serviceType === 'zlatoust') {
        return <MdxLoader src="Liturgies/Vernie/Otpust/Zlatoust" isSunday={isSunday} />;
    }
    return null;
};

const Otpust = ({ date, serviceType }) => (
    <Parts
        partNames={['liturgy.Отпуст']}
        date={date}
        serviceType="Литургия"
        fallback={<Fallback date={date} serviceType={serviceType} />}
    />
);
export default Otpust;
