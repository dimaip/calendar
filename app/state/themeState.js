import { atom } from 'recoil';

const themeState = atom({
    key: 'themeState',
    default: false,
    persistence_UNSTABLE: {
        type: 'themeState',
    },
});

export default themeState;
