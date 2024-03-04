import React, { StyleHTMLAttributes } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

export default ({
    size = 24,
    colour,
    style,
}: {
    size: number;
    colour: string;
    style: StyleHTMLAttributes<SVGElement>;
}): JSX.Element => {
    const theme = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={css`
                // fill: ${colour || theme.colours.primary};
            `}
            viewBox="0 0 512 512"
            style={style}
        >
            <rect
                x="128"
                y="128"
                width="336"
                height="336"
                rx="57"
                ry="57"
                fill="none"
                stroke={colour}
                strokeLinejoin="round"
                strokeWidth={32}
            />
            <path
                d="m383.5 128 .5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24M296 216v160M376 296H216"
                fill="none"
                stroke={colour}
                strokeLinejoin="round"
                strokeWidth={32}
            />
        </svg>
    );
};
