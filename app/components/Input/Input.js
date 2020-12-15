import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const Input = ({ className = '', onEnter = () => {}, ...rest }) => {
    const theme = useTheme();
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onEnter();
        }
    };
    return (
        <input
            onKeyDown={handleKeyDown}
            {...rest}
            className={
                css`
                    width: 100%;
                    padding: 12px;
                    border-radius: 5px;
                    border-style: solid;
                    border-width: 1px;
                    border-color: ${theme.colours.lineGray};
                    background-color: ${theme.colours.bgGray};
                ` +
                ' ' +
                className
            }
        />
    );
};
export default Input;
