import React from 'react';
import { useTheme } from 'emotion-theming';

const QuestionMark = (): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ display: 'block' }}>
            <g>
                <path
                    d="M10 1.429A8.571 8.571 0 111.429 10 8.581 8.581 0 0110 1.429M10 0a10 10 0 1010 10A10 10 0 0010 0z"
                    fill={theme.colours.darkGray}
                />
                <g>
                    <path
                        d="M11.626 7.371a1.372 1.372 0 00-1.544-1.43 1.593 1.593 0 00-1.709 1.594h-2.07a3.469 3.469 0 013.7-3.434c2.415 0 3.7 1.282 3.7 3.106 0 2.842-2.711 2.546-2.711 5.027H9.021c-.007-3.352 2.605-2.941 2.605-4.863zm-2.941 7.212A1.314 1.314 0 1110 15.898a1.3 1.3 0 01-1.315-1.315z"
                        fill={theme.colours.darkGray}
                    />
                </g>
            </g>
        </svg>
    );
};

export default QuestionMark;
