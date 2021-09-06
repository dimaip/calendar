import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const SolidSection = ({
    children,
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 1,
    marginHorizontal = -18,
    className = '',
}) => {
    const theme = useTheme();
    return (
        <div
            className={`${className} ${css`
                position: relative;
                border-bottom: 0.5px solid ${theme.colours.lineGray};
                background: ${theme.colours.bgGray};
                margin: ${marginTop}px ${marginHorizontal}px ${marginBottom}px ${marginHorizontal}px;
                padding: ${paddingTop}px 18px ${paddingBottom}px 18px;
                width: fit-content;
            `}`}
        >
            {children}
        </div>
    );
};
export default SolidSection;
