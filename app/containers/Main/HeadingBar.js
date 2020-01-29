import React from 'react';
import { css } from 'emotion';
import theme from '../../styles/theme';

const HeadingBar = ({ title, glas, lent }) => (
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
                line-height: 1.4;
                letter-spacing: 0.5px;
                font-weight: bold;
                margin-bottom: 12px;
                font-size: 22px;
                @media (min-width: 360px) {
                    font-size: 26px;
                }
                @media (min-width: 375px) {
                    font-size: 28px;
                }
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
            {glas && <div>Глас {glas}</div>}
            {lent}
        </div>
    </div>
);
export default HeadingBar;
