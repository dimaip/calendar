import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const translationPriorityState = atom({
    key: 'translationPriority',
    default: [],
    effects: [persistAtom([])],
});

export default translationPriorityState;
