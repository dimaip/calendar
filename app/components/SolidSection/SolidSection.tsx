import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const SolidSection = ({
    children,
    marginTop = 0,
    marginBottom = 0,
    paddingTop = 0,
    paddingBottom = 1,
    paddingHorizontal = 18,
    marginHorizontal = -18,
    className = '',
    noBorder = false,
}) => {
    const theme = useTheme();
    return (
        <div
            className={`${className} ${css`
                position: relative;
                display: flow-root;
                border-bottom: ${noBorder ? 'none' : `0.5px solid ${theme.colours.lineGray}`};
                background: ${theme.colours.bgGray};
                margin: ${marginTop}px ${marginHorizontal}px ${marginBottom}px ${marginHorizontal}px;
                padding: ${paddingTop}px ${paddingHorizontal}px ${paddingBottom}px ${paddingHorizontal}px;
            `}`}
        >
            {children}
        </div>
    );
};
export default SolidSection;
