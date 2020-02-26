import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const CalendarIcon = ({ colour }) => {
    const theme = useTheme();
    return (
        <svg
            className={css`
                display: block;
                stroke: ${colour || '#000000'};
            `}
            height="17"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20.143 19.5"
        >
            <g fill="none" strokeMiterlimit="10" strokeWidth="1.5">
                <path strokeLinecap="round" d="M6.359.75v3.024M14.578.75v3.024" />
                <path d="M12.893 2.262H6.364M4.679 2.262H1.686a.936.936 0 00-.936.935v14.618a.936.936 0 00.936.935h16.771a.936.936 0 00.936-.935V3.197a.936.936 0 00-.936-.935h-3.879M.836 7.023h18.47" />
            </g>
        </svg>
    );
};

export default CalendarIcon;
