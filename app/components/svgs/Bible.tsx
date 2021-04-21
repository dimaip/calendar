import React from 'react';
import { useTheme } from 'emotion-theming';

export default ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="23.581" viewBox="0 0 16 23.581">
            <path
                id="Path_1504"
                data-name="Path 1504"
                d="M378.128,488.466H367.084a2.481,2.481,0,0,0-2.478,2.478v15.481a2.473,2.473,0,0,0,1.778,2.364v3.258l1.561-1.561,1.562,1.561V508.9h8.621a2.481,2.481,0,0,0,2.478-2.477V490.944A2.481,2.481,0,0,0,378.128,488.466Zm-2.6,8.3h-2.06v3.045l.723.418a.858.858,0,0,1-.723,1.553V503.8a.863.863,0,1,1-1.726,0v-2.989l-.723-.418a.863.863,0,0,1-.316-1.18.852.852,0,0,1,1.039-.363v-2.082h-2.058a.863.863,0,1,1,0-1.726h2.058v-1.474a.863.863,0,1,1,1.726,0v1.474h2.06a.863.863,0,0,1,0,1.726Z"
                transform="translate(-364.606 -488.466)"
                fill={colour || theme.colours.darkGray}
            />
        </svg>
    );
};
