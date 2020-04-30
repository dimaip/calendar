import React from 'react';
import { useParams } from 'react-router-dom';
import useDay from 'hooks/useDay';
import SolidSection from 'components/SolidSection/SolidSection';
import Saints from 'containers/Main/Saints';
import SectionHeading from 'containers/Main/SectionHeading';
import Prichasten from './Prichasten';
import Zadastoinik from './Zadastoinik';
import Otpust from './Otpust';
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
            <Otpust day={day} date={date} serviceType={serviceType} />
        </VariableSection>
    );

    const zadastoinik = <Zadastoinik day={day} />;

    const katekhumen = <Katekhumen day={day} lang={lang} date={date} />;

    return {
        saints,
        prichasten,
        zadastoinik,
        otpust,
        katekhumen,
    };
};
export default useLiturgy;
