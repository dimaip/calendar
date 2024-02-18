import React, { forwardRef } from 'react';
import { css } from 'emotion';

const Button = forwardRef((props, ref) => (
    <button
        {...props}
        ref={ref}
        aria-label={props.title || undefined}
        type="button"
        className={`${css`
            cursor: pointer;
            padding: 12px;
            user-select: none;
            &:hover {
                opacity: 0.8;
            }
            &:active {
                opacity: 0.5;
            }
        `} ${props.className}`}
    >
        {props.children}
    </button>
));

export default Button;
