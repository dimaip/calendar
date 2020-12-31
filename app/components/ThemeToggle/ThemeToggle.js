import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useRecoilState } from 'recoil';
import themeState from 'state/themeState';
import Button from 'components/Button/Button';

const ThemeToggle = () => {
    const [themeStateValue, setTheme] = useRecoilState(themeState);

    return <Button onClick={() => setTheme(!themeStateValue)}>{themeStateValue ? 'светлая' : 'темная'}</Button>;
};

export default ThemeToggle;
