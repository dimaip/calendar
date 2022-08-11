import React from 'react';
import { useParams } from 'react-router-dom';

import MdxLoader from '../MdxLoader';
const BratMolitvoslov = (): JSX.Element => {
    const { prayerId } = useParams();
    return <MdxLoader src={`BratMolitvoslov/${prayerId}`} />;
};
export default BratMolitvoslov;
