import React from 'react';
import { useTheme } from 'emotion-theming';

const Cross = ({ white = false }) => {
    const theme = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18.29 19.89"
            width="10"
            style={{ marginTop: 3, marginLeft: 5 }}
        >
            <path
                d="M17.29 1L1 18.89M1 1l16.29 17.89"
                fill="none"
                stroke={white ? theme.colours.white : theme.colours.darkGray}
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
            />
        </svg>
    );
};

export default Cross;
