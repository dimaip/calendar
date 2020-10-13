import React from 'react';
import { useParams } from 'react-router-dom';
import useDay from 'hooks/useDay';
import SolidSection from 'components/SolidSection/SolidSection';
import Saints from 'containers/Main/Saints';
import SectionHeading from 'containers/Main/SectionHeading';
import Prichasten from './Prichasten/Prichasten';
import Zadastoinik from './Zadastoinik/Zadastoinik';
import Otpust from './Otpust/Otpust';
import Katekhumen from '../Katekhumen/Katekhumen';
import VariableSection from '../../VariableSection';

const useLiturgy = (lang, serviceType) => {
    const { date } = useParams();
    const { data: day } = useDay(date);

    const saints = day?.saints && (
        <SolidSection marginTop={24} marginHorizontal={-12}>
            <SectionHeading>Святые дня</SectionHeading>
            <Saints saints={day.saints} date={date} />
        </SolidSection>
    );

    const prichasten = (
        <VariableSection date={date}>
            <Prichasten day={day} date={date} />
        </VariableSection>
    );

    const otpust = (
        <VariableSection date={date}>
            <Otpust date={date} serviceType={serviceType} />
        </VariableSection>
    );

    const zadastoinik = <Zadastoinik date={date} />;

    const katekhumen = <Katekhumen day={day} date={date} />;

    return {
        saints,
        prichasten,
        zadastoinik,
        otpust,
        katekhumen,
    };
};
export default useLiturgy;
