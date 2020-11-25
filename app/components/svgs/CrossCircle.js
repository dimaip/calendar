import React from 'react';
import { useTheme } from 'emotion-theming';

const CrossCircle = () => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.414 42.414" width="42.414">
            <path
                d="M10.96 10.954a14.5 14.5 0 110 20.506 14.5 14.5 0 010-20.506z"
                fill="none"
                stroke={theme.colours.bgGray}
            />
            <g fill="none" stroke={theme.colours.bgGray}>
                <path d="M27.707 15.707l-12 12M15.707 15.707l12 12" />
            </g>
        </svg>
    );
};

export default CrossCircle;
