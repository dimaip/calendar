import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const BorderedSection = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                border-bottom: 0.5px solid ${theme.colours.lineGray};
                margin: 0 -18px 18px -18px;
                padding: 0 18px 1px 18px;
                background-color: white;
            `}
        >
            {children}
        </div>
    );
};

export default BorderedSection;
