import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const SectionHeading = ({ children }) => {
    const theme = useTheme();
    return (
        <h2
            className={css`
                font-size: 21px;
                line-height: 1;
                font-weight: bold;
                color: ${theme.colours.darkGray};
                margin-top: 24px;
                margin-bottom: 18px;
            `}
        >
            {children}
        </h2>
    );
};
export default SectionHeading;
