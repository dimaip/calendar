import React from 'react';
import { useTheme } from 'emotion-theming';

const Dots = () => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 15" width="10" height="15">
            <g transform="translate(-362 -11)" fill={theme.colours.darkGray}>
                <circle cx="1.5" cy="1.5" r="1.5" transform="translate(362 17)" />
                <circle cx="1.5" cy="1.5" r="1.5" transform="translate(362 23)" />
                <circle cx="1.5" cy="1.5" r="1.5" transform="translate(362 11)" />
            </g>
        </svg>
    );
};

export default Dots;
