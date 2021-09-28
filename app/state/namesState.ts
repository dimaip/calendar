import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const namesState = atomFamily({
    key: 'names',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export default namesState;
