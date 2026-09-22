import React from 'react';
import { useTheme } from 'emotion-theming';

export default () => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={65} height={65} fill="none">
            <path
                fill="#AC1CA3"
                stroke="#AC1CA3"
                strokeLinejoin="round"
                strokeWidth={3.599}
                d="M32.569 63.137c16.882 0 30.568-13.686 30.568-30.568C63.137 15.686 49.451 2 32.57 2 15.686 2 2 15.686 2 32.569 2 49.45 15.686 63.137 32.569 63.137Z"
            />
            <path
                fill={theme.colours.white}
                stroke="#AC1CA3"
                strokeLinejoin="round"
                strokeWidth={3.599}
                d="M45.453 50.167c-16.886 0-30.57-13.683-30.57-30.569 0-4.937 1.181-9.602 3.262-13.726C8.55 10.968 2 21.088 2 32.756 2 49.54 15.539 63.144 32.238 63.144c11.56 0 21.593-6.52 26.681-16.1a30.417 30.417 0 0 1-13.466 3.123Z"
            />
            <path
                stroke={theme.colours.white}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.331}
                d="M46.722 33.796 31.547 18.612m7.358 19.127V17.825m-5.767 13.921L48.9 15.983m-22.845 9.996h21.003"
            />
        </svg>
    );
};
