import React from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import { useRecoilState } from 'recoil';
import themeState from 'state/themeState';
import Sun from 'components/svgs/Sun';
import Moon from 'components/svgs/Moon';
import { useTheme } from 'emotion-theming';
import System from 'components/svgs/System';

const buttonStyle = css`
    width: 33%;
    display: block;
    text-align: center;
    border: 1px solid #d9dde5;
    border-radius: 8px;
    margin-right: 12px;
    padding: 12px;
    font-size: 14px;
`;
const ThemeControl = (): JSX.Element | null => {
    const theme = useTheme();
    const [themeStateValue, setTheme] = useRecoilState(themeState);

    const activeClass = css`
        ${buttonStyle}
        border: 1px solid ${theme.colours.primary};
    `;

    return (
        <div
            className={css`
                display: flex;
            `}
        >
            <Button
                className={themeStateValue === 'system' ? activeClass : buttonStyle}
                onClick={() => setTheme('system')}
            >
                <System />
                Системная
            </Button>
            <Button
                className={themeStateValue === 'light' ? activeClass : buttonStyle}
                onClick={() => setTheme('light')}
            >
                <Sun />
                Светлая
            </Button>
            <Button className={themeStateValue === 'dark' ? activeClass : buttonStyle} onClick={() => setTheme('dark')}>
                <Moon />
                Темная
            </Button>
        </div>
    );
};
export default ThemeControl;
