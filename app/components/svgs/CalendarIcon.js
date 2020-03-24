import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const CalendarIcon = ({ colour }) => {
    const theme = useTheme();
    return (
        <svg
            className={css`
                display: block;
                stroke: ${colour || theme.colours.darkGray};
            `}
            height="17"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.143 19.5"
        >
            <g fill="none">
                <path d="M6.359.75v3.024M14.578.75v3.024M12.893 2.262H6.364m-1.685 0H1.686a.936.936 0 00-.936.935v14.618a.936.936 0 00.936.935h16.771a.936.936 0 00.936-.935V3.197a.936.936 0 00-.936-.935h-3.879M.836 7.023h18.47" />
            </g>
        </svg>
    );
};

export default CalendarIcon;
