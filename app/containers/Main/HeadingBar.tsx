import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const HeadingBar = ({ title, glas, fastName, fastingLevelName, icon }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                color: white;
                background-color: ${theme.colours.primary};
                background-image: ${icon && `url("/assets/icons/${icon}")`};
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                padding: 18px;
                min-height: 200px;
                overflow: hidden;
            `}
        >
            <h2
                className={css`
                    color: white;
                    line-height: 1.4;
                    letter-spacing: 0.5px;
                    font-weight: bold;
                    margin-bottom: 12px;
                    font-size: 21px;
                    @media (min-width: 360px) {
                        font-size: 25px;
                    }
                    @media (min-width: 375px) {
                        font-size: 27px;
                    }
                `}
            >
                {title}
            </h2>
            <div
                className={css`
                    color: ${theme.colours.primaryTint};
                    font-size: 18px;
                    line-height: 1.5;
                `}
            >
                {glas && <div>Глас {glas}</div>}
                {fastName && (
                    <div>
                        {fastName}
                        {fastingLevelName && ': '}
                        {fastingLevelName}
                    </div>
                )}
            </div>
        </div>
    );
};
export default HeadingBar;
