import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const extraPrayersState = atomFamily({
    key: 'extraPrayers',
    default: [],
    effects: [persistAtom([])],
});

export default extraPrayersState;
