const gray1 = '#201f24';
const gray2a = '#8e8e93';
const gray2b = '#acacb0';
const gray3 = '#CECED2';
const gray4 = '#EFEFF4';
const gray5 = '#fafafc';
const gray6 = '#ffffff';

const getTheme = primary => {
    const darkQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    const dark = darkQuery?.matches;

    darkQuery?.addEventListener?.('change', e => {
        window.location.reload();
    });

    return {
        colours: {
            primary: primary || '#AE841A',
            primaryTint: 'rgba(255,255,255,0.8)',
            lightGray: dark ? gray2a : gray2b,
            gray: dark ? gray4 : gray2a,
            darkGray: dark ? gray6 : gray1,
            bgGrayLight: dark ? gray1 : gray5,
            bgGray: dark ? gray2a : gray4,
            lineGray: dark ? gray2a : gray3,
            red: '#ff4e4e',
            white: dark ? gray1 : gray6,
        },
    };
};

export default getTheme;
