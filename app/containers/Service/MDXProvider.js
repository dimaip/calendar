import React from 'react';
import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';
import { css } from 'emotion';

const mapping = {
    h1: ({ children }) => (
        <h1
            className={css`
                color: #ff4e4e;
                font-size: 18px;
                font-weight: bold;
                line-height: 1.6;
                margin-bottom: 0;
                margin-right: 0;
                margin-top: 28px;
                text-align: center;
                text-transform: uppercase;
            `}
        >
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2
            className={css`
                color: #ff4e4e;
                font-size: 18px;
                font-weight: bold;
                line-height: 1.6;
                margin-bottom: 0;
                margin-left: 0;
                margin-right: 0;
                margin-top: 28px;
                text-align: center;
            `}
        >
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3
            className={css`
                color: #ff4e4e;
                font-size: 13px;
                line-height: 1.6;
                margin-bottom: 0;
                margin-top: 28px;
                text-align: center;
                text-transform: uppercase;
            `}
        >
            {children}
        </h3>
    ),
    p: ({ children }) => {
        return (
            <p
                className={css`
                    font-size: 18px;
                    line-height: 1.6;
                    margin-bottom: 0;
                    margin-left: 28px;
                    margin-top: 4px;
                    text-indent: -28px;
                `}
            >
                {children}
            </p>
        );
    },
    strong: ({ children }) => (
        <span
            className={css`
                color: #ff4e4e;
            `}
        >
            {children}
        </span>
    ),
    blockquote: ({ children }) => (
        <div
            className={css`
                font-size: 15px !important;
                line-height: 1.6;
                margin-bottom: 0;
                margin-left: 28px;
                margin-top: 4px;
                text-align-last: left;
                text-indent: -28px;
                & p {
                    font-size: 15px !important;
                    margin-left: 0 !important;
                }
            `}
        >
            {children}
        </div>
    ),
    inlineCode: ({ children }) => (
        <span
            className={css`
                font-size: 15px;
            `}
        >
            {children}
        </span>
    ),
    del: ({ children }) => (
        <span
            className={css`
                color: #ff4e4e;
                vertical-align: super;
                font-size: 12px;
            `}
        >
            {children}
        </span>
    ),
};

const MDXProvider = ({ children }) => <OriginalMDXProvider components={mapping}>{children}</OriginalMDXProvider>;

export default MDXProvider;
