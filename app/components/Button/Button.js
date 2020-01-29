import React from 'react';
import { css } from 'emotion';

const Button = props => (
    <button
        {...props}
        className={css`
            ${props.className}
            cursor: pointer;
            padding: 12px;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            &:hover {
                opacity: 0.8;
                cursor: pointer;
            }
        `}
    >
        {props.children}
    </button>
);

export default Button;
