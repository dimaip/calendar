import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const customPrayersState = atomFamily({
    key: 'customPrayers',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export default customPrayersState;
