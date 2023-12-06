import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const disabledPrayersState = atom<string[]>({
    key: 'disabledPrayers',
    default: [],
    effects: [persistAtom([])],
});

export default disabledPrayersState;
