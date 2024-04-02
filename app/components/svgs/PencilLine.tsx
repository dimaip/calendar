import React, { StyleHTMLAttributes } from 'react';
import { useTheme } from 'emotion-theming';

export default ({ style, colour = null }: { style: StyleHTMLAttributes<SVGElement>; colour: string | null }) => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.11 68.11" width={18} height={18} style={style}>
            <path
                fill="none"
                stroke={colour || theme.colours.gray}
                strokeMiterlimit="10"
                strokeWidth="5"
                d="M57.26 7.27 24.69 39.84"
            />
            <path
                d="M61.87 18.32 29.3 50.89c0-8.64-7.01-15.65-15.65-15.65L46.21 2.67c8.64 0 15.65 7.01 15.65 15.65Z"
                fill="none"
                stroke={colour || theme.colours.gray}
                strokeLinejoin="round"
                strokeWidth="5"
            />
            <path
                fill="none"
                stroke={colour || theme.colours.gray}
                strokeMiterlimit="10"
                strokeWidth="5"
                d="m29.3 50.89-19.95 4.3 4.28-19.95"
            />
            <path
                fill="none"
                stroke={colour || theme.colours.gray}
                strokeLinejoin="round"
                strokeWidth="5"
                d="M6.24 65.44h55.48"
            />
        </svg>
    );
};
