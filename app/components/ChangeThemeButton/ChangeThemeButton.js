import React, { useContext } from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';
import Moon from 'components/svgs/Moon';
import Sun from 'components/svgs/Sun';
import { useRecoilState } from 'recoil';
import themeState from 'state/themeState';

const ChangeThemeButton = () => {
    const theme = useTheme();
    const { toggleOpen } = useContext(DotsMenuContext);
    const [themeStateValue, setTheme] = useRecoilState(themeState);
    return (
        <Button
            title="Изменить тему"
            onClick={() => {
                toggleOpen();
                setTheme(!themeStateValue);
            }}
            className={css`
                margin-right: 6px;
                font-size: 16px;
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
                border-bottom: 1px solid ${theme.colours.lineGray};
            `}
        >
            <span
                className={css`
                    color: ${theme.colours.gray};
                    display: inline-block;
                `}
            >
                {themeStateValue ? <Sun /> : <Moon />}
            </span>{' '}
            <span
                className={css`
                    font-size: 13px;
                `}
            >
                {themeStateValue ? 'Cветлая тема' : 'Тёмная тема'}
            </span>
        </Button>
    );
};
export default ChangeThemeButton;
