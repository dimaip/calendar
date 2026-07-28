import React from 'react';
import { useTheme } from '@emotion/react';

const Bell = ({ colour, size = 24 }: { colour?: string; size?: number }): JSX.Element => {
    const theme = useTheme();
    const stroke = colour || theme.colours.darkGray;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
            <path
                d="M18.25 9.7c0-3.35-2.35-5.95-6.25-5.95s-6.25 2.6-6.25 5.95v2.8c0 .94-.34 1.85-.95 2.56l-.72.84a.8.8 0 0 0 .61 1.32h14.62a.8.8 0 0 0 .61-1.32l-.72-.84a3.93 3.93 0 0 1-.95-2.56V9.7Z"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <path
                d="M9.75 19.25a2.45 2.45 0 0 0 4.5 0"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    );
};

export default Bell;
