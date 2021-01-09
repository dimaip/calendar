import isDarkMode from 'utils/isDarkMode';

const gray1a = '#201f24';
const gray1b = '#2c2b32';
const gray1c = '#38373f';
const gray2a = '#8e8e93';
const gray2b = '#acacb0';
const gray3 = '#CECED2';
const gray4 = '#EFEFF4';
const gray5 = '#fafafc';
const gray6 = '#ffffff';

const getTheme = (primary, isDark) => {
    const dark = isDark || isDarkMode();
    return {
        colours: {
            primary: primary || (dark ? '#E1B74D' : '#AE841A'),
            primaryTint: 'rgba(255,255,255,0.8)',
            lightGray: dark ? gray2a : gray2b,
            gray: dark ? gray4 : gray2a,
            darkGray: dark ? gray6 : gray1a,
            bgGrayLight: dark ? gray1b : gray5,
            bgGray: dark ? gray1c : gray4,
            lineGray: dark ? gray2a : gray3,
            red: '#ff4e4e',
            white: dark ? gray1a : gray6,
        },
    };
};

export default getTheme;
