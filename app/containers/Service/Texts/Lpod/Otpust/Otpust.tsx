import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Otpust = ({ date }) => (
    <Parts
        partNames={['liturgy.Отпуст']}
        date={date}
        serviceType="Литургия"
        fallback={<MdxLoader src="Lpod/Otpust" />}
    />
);
export default Otpust;
