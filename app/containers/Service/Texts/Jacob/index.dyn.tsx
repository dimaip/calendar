import React from 'react';
import { css } from 'emotion';
import useDay from 'hooks/useDay';
import useExternalDay from 'hooks/useExternalDay';
import SolidSection from 'components/SolidSection/SolidSection';
import Sermons from 'containers/Main/Sermons';

import { getKatekhumenReadings } from '../Liturgies/Katekhumen/Katekhumen';
import Reading from '../Liturgies/Katekhumen/Reading/Reading';

import JacobMdx from './index.mdx';

const Jacob = ({ lang, date }) => {
    const { data: day } = useDay(date);
    const externalDayQuery = useExternalDay(date);

    const { apostol, gospel } = getKatekhumenReadings(day);
    const reading = <Reading day={day} date={date} />;

    const { sermons: sermonsData } = externalDayQuery.data || {};
    const sermons = (
        <SolidSection paddingTop={8} marginTop={12} marginHorizontal={-12}>
            <Sermons date={date} sermons={sermonsData} hideTitle />
        </SolidSection>
    );

    const props = {
        lang,
        date,
        reading,
        apostol,
        gospel,
        sermons,
        css,
    };
    return <JacobMdx {...props} />;
};

export default Jacob;
