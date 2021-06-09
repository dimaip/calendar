import React from 'react';
import { useTheme } from 'emotion-theming';

const Cross2 = ({ white = false }: { white?: boolean }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15.414" height="15.414">
            <g>
                <g fill="none" stroke={white ? theme.colours.white : theme.colours.lightGray} strokeWidth="2">
                    <path d="M14.707.707l-14 14" />
                    <path d="M.707.707l14 14" />
                </g>
            </g>
        </svg>
    );
};

export default Cross2;
