import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const promoDismissedState = atomFamily({
    key: 'promoDismissed',
    default: null,
    effects: [persistAtom(null)],
});

export default promoDismissedState;
