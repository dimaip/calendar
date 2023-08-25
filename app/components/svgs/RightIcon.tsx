import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

export default () => {
    const theme = useTheme();
    return (
        <svg
            className={css`
                stroke: ${theme.colours.primary};
            `}
            xmlns="http://www.w3.org/2000/svg"
            width="16.564"
            height="13.679"
            viewBox="0 0 16.564 13.679"
        >
            <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 6.84h14.152l-6-5.427m6 5.427l-5.998 5.427"
            ></path>
        </svg>
    );
};
