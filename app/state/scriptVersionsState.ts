import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const scriptVersionsState = atomFamily({
    key: 'scriptVersions',
    default: [],
    effects: [persistAtom([])],
});

export default scriptVersionsState;
