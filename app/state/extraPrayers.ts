import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const extraPrayersState = atomFamily({
    key: 'extraPrayers',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export default extraPrayersState;
