import React from 'react';
import Prokimens from './Prokimen';
import VariableSection from 'containers/Service/Texts/VariableSection';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

const Reading = ({ day, date }) => {
    const prokimen = (
        <VariableSection date={date}>
            <Prokimens day={day} date={date} />
        </VariableSection>
    );

    return <MdxLoader src="Liturgies/Katekhumen/Reading" prokimen={prokimen} />;
};

export default Reading;
