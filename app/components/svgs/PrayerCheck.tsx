import React from 'react';
import { useTheme } from 'emotion-theming';

interface IconTheme {
    colours?: {
        blue?: string;
    };
}

const PrayerCheck = ({ colour, size = 31 }: { colour?: string; size?: number }): JSX.Element => {
    const theme = useTheme<IconTheme>();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 31 31">
            <path
                fill={colour || theme.colours.blue}
                d="M15.5 0C6.953 0 0 6.953 0 15.5S6.953 31 15.5 31 31 24.047 31 15.5 24.047 0 15.5 0m8.067 10.305L13.55 22.228a1.2 1.2 0 0 1-.894.426h-.02a1.2 1.2 0 0 1-.886-.395l-4.292-4.77a1.193 1.193 0 1 1 1.772-1.594l3.375 3.75L21.74 8.772a1.192 1.192 0 0 1 1.826 1.533"
            />
        </svg>
    );
};

export default PrayerCheck;
