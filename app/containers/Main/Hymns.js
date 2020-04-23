import React from 'react';
import RteText from 'components/RteText/RteText';
import { css } from 'emotion';

const Hymns = ({ hymns }) => {
    return (
        <RteText
            html={hymns}
            className={css`
                margin-top: -24px;
                margin-bottom: 24px;
            `}
        />
    );
};
export default Hymns;
