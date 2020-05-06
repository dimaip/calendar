import React from 'react';
import Tooltip from 'components/Tooltip/Tooltip';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import ReadingRu from './Reading.ru.mdx';
import ReadingCsj from './Reading.csj.mdx';
import Prokimens from './Prokimen';
import VariableSection from './../../../VariableSection';

const langMap = {
    default: ReadingRu,
    ЦСЯ: ReadingCsj,
};
const Reading = ({ lang, day, date }) => {
    const prokimen = 
        <VariableSection date={date}>
            <Prokimens day={day} date={date} />
        </VariableSection>

    const Component = langMap[lang] ;

    return <Component lang={lang} prokimen={prokimen}/>;
};

export default Reading;
