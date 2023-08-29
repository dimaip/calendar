import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const customPrayersState = atomFamily({
    key: 'customPrayers',
    default: [],
    effects: [persistAtom([])],
});

export default customPrayersState;
