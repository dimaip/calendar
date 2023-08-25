import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const promoDismissedState = atomFamily({
    key: 'promoDismissed',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export default promoDismissedState;
