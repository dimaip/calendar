import { atom, selector } from 'recoil';
import { restoreScroll } from 'utils/restoreScroll';

import langState from './langState';

const isParallelState = atom<null | boolean>({
    key: 'isParallel',
    default: null,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet(() => {
                restoreScroll();
            });
        },
    ],
});

const isEffectivelyParallelState = selector({
    key: 'isEffectivelyParallel',
    get: ({ get }) => {
        const isParallel = get(isParallelState);
        const langStateValue = get(langState);

        return isParallel || (isParallel !== false && langStateValue?.lang === 'parallel');
    },
    set: ({ set }, value) => {
        set(isParallelState, value);
    },
});

export default isEffectivelyParallelState;
