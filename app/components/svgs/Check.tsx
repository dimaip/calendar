import React, { StyleHTMLAttributes } from 'react';
import { useTheme } from 'emotion-theming';

export default ({ style, colour = null }: { style: StyleHTMLAttributes<SVGElement>; colour: string | null }) => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} style={style} viewBox="0 0 490.05 490.05">
            <path
                fill={colour || theme.colours.gray}
                d="M418.275 418.275c95.7-95.7 95.7-250.8 0-346.5s-250.8-95.7-346.5 0-95.7 250.8 0 346.5 250.9 95.7 346.5 0zm-261.1-210.7 55.1 55.1 120.7-120.6 42.7 42.7-120.6 120.6-42.8 42.7-42.7-42.7-55.1-55.1 42.7-42.7z"
            />
        </svg>
    );
};
