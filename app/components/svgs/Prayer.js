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
            viewBox="0 0 27.631 22.026"
            height="18.5"
        >
            <g fill="none" strokeLinejoin="round">
                <path d="M2.765 2.472H.5v18.245h10.549M24.867 2.472h2.265v18.245H16.583" strokeLinecap="round" />
                <path d="M2.896.501l10.966 4.35v16.675L2.896 17.782zM24.869.501l-10.966 4.35v16.675l10.966-3.743z" />
                <path
                    strokeLinecap="round"
                    d="M4.947 4.294l6.121 2.517M4.947 7.102l6.121 2.517M4.947 10.015l6.121 2.517M4.947 13.147l6.121 2.517M22.832 4.24l-6.121 2.517M22.832 7.047l-6.121 2.517M22.832 9.961l-6.121 2.517M22.832 13.092l-6.121 2.517"
                />
            </g>
        </svg>
    );
};
