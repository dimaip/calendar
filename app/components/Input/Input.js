import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const Input = ({ className = '', ...rest }) => {
    const theme = useTheme();
    return (
        <input
            {...rest}
            className={
                css`
                    width: 100%;
                    padding: 12px;
                    border-radius: 5px;
                    border-style: solid;
                    border-width: 1px;
                    border-color: ${theme.colours.lineGray};
                ` +
                ' ' +
                className
            }
        />
    );
};
export default Input;
