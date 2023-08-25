import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const Textarea = ({ className = '', onEnter = null, ...rest }) => {
    const theme = useTheme();
    const handleKeyDown = (event) => {
        if (onEnter) {
            if (event.key === 'Enter') {
                event.preventDefault();
                onEnter();
            }
        }
    };
    return (
        <textarea
            onKeyDown={handleKeyDown}
            {...rest}
            className={`${css`
                width: 100%;
                padding: 12px;
                border-radius: 5px;
                border-style: solid;
                border-width: 1px;
                border-color: ${theme.colours.lineGray};
                background-color: ${theme.colours.bgGray};
                min-height: 200px;
                color: inherit;
                font-family: inherit;
            `} ${className}`}
        />
    );
};
export default Textarea;
