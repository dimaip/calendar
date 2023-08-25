import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const SectionHeading = ({ children, className = '' }) => {
    const theme = useTheme();
    return (
        <h2
            className={`${css`
                font-size: 21px;
                line-height: 1;
                font-weight: bold;
                color: ${theme.colours.darkGray};
                padding-top: 24px;
                padding-bottom: 18px;
            `} ${className}`}
        >
            {children}
        </h2>
    );
};
export default SectionHeading;
