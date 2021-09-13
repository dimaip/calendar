import { atom } from 'recoil';
import { restoreScroll } from 'utils/restoreScroll';

const langState = atom({
    key: 'langState',
    default: {
        lang: 'ru',
        langA: 'ru',
        langB: 'csj',
    },
    persistence_UNSTABLE: {
        type: 'langState',
    },
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(() => {
                restoreScroll();
            });
        },
    ],
});

export default langState;
