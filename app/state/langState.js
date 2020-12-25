import { atom } from 'recoil';

const langState = atom({
    key: 'langState',
    default: {
        lang: 'ru',
        langA: 'ru',
        langB: 'csj',
    },
    // @ts-ignore
    persistence_UNSTABLE: {
        type: 'langState',
    },
});

export default langState;
