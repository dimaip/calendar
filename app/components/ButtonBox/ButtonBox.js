import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const ButtonBox = props => {
    const theme = useTheme();
    return (
        <div
            className={
                css`
                    background-color: ${theme.colours.white};
                    border-radius: 8px;
                    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
                    margin-bottom: 8px;
                    padding: 14px 12px;
                    &:active,
                    &:focus {
                        box-shadow: none;
                        position: relative;
                        top: 1px;
                        background-color: ${theme.colours.bgGrayLight};
                    }
                ` +
                ' ' +
                props.className
            }
        >
            {props.children}
        </div>
    );
};

export default ButtonBox;
