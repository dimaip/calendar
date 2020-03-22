import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const SolidSection = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                border-bottom: 0.5px solid ${theme.colours.lineGray};
                background: ${theme.colours.bgGray};
                margin: 0 -18px;
                padding: 0 18px 1px 18px;
            `}
        >
            {children}
        </div>
    );
};
export default SolidSection;
