import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const tourDismissedState = atom({
    key: 'tourDismissed',
    default: null,
    effects: [persistAtom(null)],
});

export default tourDismissedState;
