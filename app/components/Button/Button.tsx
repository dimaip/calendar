import React, { ButtonHTMLAttributes } from 'react';
import { css } from 'emotion';
import { gray1a, gray3, gray5, blue, red } from 'styles/getTheme';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'unstyled' | 'white' | 'black' | 'blue' | 'red';
    size?: 'small' | 'medium' | 'large';
    border?: boolean;
    title?: string;
    className?: string;
    children?: React.ReactNode;
}

const Button = ({
    title,
    border = false,
    variant = 'unstyled',
    size = 'medium',
    className,
    children,
    ...rest
}: Props): JSX.Element => (
    <button
        {...rest}
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
        `} ${
            variant !== 'unstyled' &&
            css`
                text-transform: uppercase;
                border-radius: 6px;
            `
        } ${
            border &&
            css`
                border: 1px solid ${gray3};
            `
        } ${
            variant === 'white' &&
            css`
                background-color: ${gray5} !important;
                color: ${blue} !important;
            `
        } ${
            variant === 'blue' &&
            css`
                background-color: ${blue} !important;
                color: white !important;
            `
        } ${
            variant === 'red' &&
            css`
                background-color: ${red} !important;
                color: white !important;
            `
        } ${
            variant === 'black' &&
            css`
                background-color: ${gray1a} !important;
                color: ${gray3} !important;
            `
        } ${
            variant !== 'unstyled' &&
            size === 'medium' &&
            css`
                font-size: 14px;
            `
        } ${
            variant !== 'unstyled' &&
            size === 'large' &&
            css`
                font-size: 16px;
                padding: 16px !important;
            `
        } ${className}`}
    >
        {children}
    </button>
);

export default Button;
