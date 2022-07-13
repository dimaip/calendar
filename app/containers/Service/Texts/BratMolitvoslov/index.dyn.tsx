import React from 'react';
import { useParams } from 'react-router-dom';

import MdxLoader from '../MdxLoader';
const PravdaMir = (): JSX.Element => {
    const { prayerId } = useParams();
    return <MdxLoader src={`BratMolitvoslov/${prayerId}`} />;
};
export default PravdaMir;
