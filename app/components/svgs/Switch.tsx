import React from 'react';
import { useTheme } from 'emotion-theming';

export default ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.2 39.2" width="18" height="18">
            <path
                fill={colour || theme.colours.darkGray}
                d="M33.3 9h-3.2V5.8c0-3.2-2.6-5.8-5.8-5.8H5.8C2.6 0 0 2.6 0 5.8v18.5c0 3.2 2.6 5.8 5.8 5.8H9v3.2c0 3.2 2.6 5.8 5.8 5.8h18.5c3.2 0 5.8-2.6 5.8-5.8V14.9c.1-3.3-2.5-5.9-5.8-5.9zM2 24.3V5.8C2 3.7 3.7 2 5.8 2h18.5c2.1 0 3.8 1.7 3.8 3.8V9H14.9C11.6 9 9 11.6 9 14.9v13.3H5.8C3.7 28.1 2 26.4 2 24.3zm35.2 9c0 2.1-1.7 3.8-3.8 3.8H14.9c-2.1 0-3.8-1.7-3.8-3.8V14.9c0-2.1 1.7-3.8 3.8-3.8h18.5c2.1 0 3.8 1.7 3.8 3.8v18.4z"
            />
        </svg>
    );
};
