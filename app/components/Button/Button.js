import React from 'react';
import { css } from 'emotion';

const Button = props => (
    <button
        {...props}
        aria-label={props.title || undefined}
        className={
            css`
                cursor: pointer;
                padding: 12px;
                user-select: none;
                &:hover {
                    opacity: 0.8;
                }
                &:active {
                    opacity: 0.5;
                }
            ` +
            ' ' +
            props.className
        }
    >
        {props.children}
    </button>
);

export default Button;
