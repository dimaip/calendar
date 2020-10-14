import React from 'react';
import useParts from 'hooks/useParts';
import TrisvatoeMdx from './Trisvatoe.mdx';

const Trisvatoe = ({ date }) => {
    const { data: parts } = useParts(date, 'ru');
    const vmestoTrisvatogoExists = Boolean(parts?.liturgy?.['Вместо Трисвятого']);
    return <TrisvatoeMdx vmestoTrisvatogoExists={vmestoTrisvatogoExists} date={date} />
};
export default Trisvatoe;
