import React from 'react';
import { css } from 'emotion';
import theme from '../../styles/theme';

const HeadingBar = ({ title, glas }) => (
    <div
        className={css`
            color: white;
            background-color: ${theme.colors.primary};
            padding: 18px;
        `}
    >
        <h2
            className={css`
                color: white;
                font-size: 24px;
                line-height: 1.5;
                font-weight: bold;
                margin-bottom: 12px;
            `}
        >
            {title}
        </h2>
        <div
            className={css`
                color: ${theme.colors.primaryTint};
                font-size: 16px;
                line-height: 1.5;
            `}
        >
            {glas && `Глас ${glas}`}
        </div>
    </div>
);
export default HeadingBar;
