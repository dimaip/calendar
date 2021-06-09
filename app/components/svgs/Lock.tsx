import React from 'react';
import { useTheme } from 'emotion-theming';

export default ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme();
    const effectiveColour = colour || theme.colours.primary;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19.246">
            <g data-name="Group 703" transform="translate(-1784 -2444.754)">
                <g
                    data-name="Rectangle 472"
                    fill="none"
                    stroke={effectiveColour}
                    strokeLinejoin="round"
                    strokeWidth="2"
                >
                    <path stroke="none" d="M1786 2452h12v10h-12z" />
                    <path d="M1785 2451h14v12h-14z" />
                </g>
                <g data-name="Path 1486" fill="none">
                    <path d="M1786 2450.757a6 6 0 0112 0c0 1.835-12 1.471-12 0z" />
                    <path
                        d="M1792.49 2450c1.55 0 2.689-.119 3.383-.249a4.007 4.007 0 00-3.873-2.998 4.007 4.007 0 00-3.846 2.899c.891.174 2.399.348 4.336.348m0 2c-3.154 0-6.49-.47-6.49-1.247a6 6 0 1112 0c0 .87-2.682 1.247-5.51 1.247z"
                        fill={effectiveColour}
                    />
                </g>
                <circle
                    data-name="Ellipse 60"
                    cx="2"
                    cy="2"
                    r="2"
                    transform="translate(1790 2454)"
                    fill={effectiveColour}
                />
                <path
                    data-name="Line 125"
                    fill="none"
                    stroke={effectiveColour}
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M1792 2457.5v2"
                />
            </g>
        </svg>
    );
};
