import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

export default ({ colour }) => {
    const theme = useTheme();
    return (
        <svg
            className={css`
                stroke: ${colour || theme.colours.gray};
            `}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17.864 22.026"
            width="15"
            height="18.5"
        >
            <g fill="none">
                <g strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.046 4.654v9.118M8.15 5.577h1.792M6.358 7.177h5.377M8.069 9.68l1.954 1.427" />
                </g>
                <path
                    d="M17.312 18.008H2.303a1.759 1.759 0 100 3.518h15.061V.502H2.303a1.781 1.781 0 00-1.8 1.759v17.506"
                    strokeMiterlimit="10"
                />
                <path strokeLinecap="round" strokeMiterlimit="10" d="M3.742 19.771H15.62" />
            </g>
        </svg>
    );
};
