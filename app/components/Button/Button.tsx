import React, { forwardRef } from 'react';
import { css } from '@emotion/css';

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ children, className = '', title, ...props }, ref) => (
        <button
            {...props}
            ref={ref}
            title={title}
            aria-label={title || undefined}
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
            `} ${className}`}
        >
            {children}
        </button>
    )
);

export default Button;
