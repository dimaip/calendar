import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

export default ({ colour = null }) => {
    const theme = useTheme();
    return (
        <svg
            className={css`
                stroke: ${colour || theme.colours.primary};
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
                d="M15.564 6.84H1.412l6 5.427m-6-5.427L7.41 1.413"
            ></path>
        </svg>
    );
};
