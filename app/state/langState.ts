import { atom } from 'recoil';
import { restoreScroll } from 'utils/restoreScroll';

import { persistAtom } from './persistAtom';

const langState = atom({
    key: 'langState',
    default: {
        lang: 'ru',
        langA: 'ru',
        langB: 'csj',
    },
    effects_UNSTABLE: [
        persistAtom,
        ({ onSet }) => {
            onSet(() => {
                restoreScroll();
            });
        },
    ],
});

export default langState;
