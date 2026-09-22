import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

export default ({ colour = null }) => {
    const theme = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={css`
                fill: ${colour || theme.colours.gray};
            `}
            width="16"
            height="16"
            viewBox="0 0 68.11 68.11"
        >
            <path
                d="M60.14 7.96 21.47 46.63"
                strokeWidth={5}
                fill="none"
                strokeMiterlimit={10}
                stroke={colour || theme.colours.gray}
            />
            <path
                fill="none"
                stroke={colour || theme.colours.gray}
                strokeLinejoin="round"
                strokeWidth={5}
                d="M65.61 21.08 26.94 59.75c0-10.26-8.32-18.58-18.58-18.58L47.02 2.5c10.26 0 18.58 8.32 18.58 18.58Z"
            />
            <path
                d="m26.94 59.75-23.68 5.1 5.09-23.68"
                strokeWidth={5}
                fill="none"
                strokeMiterlimit={10}
                stroke={colour || theme.colours.gray}
            />
        </svg>
    );
};
