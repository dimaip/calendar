import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const troparionFavsState = atom<string[]>({
    key: 'troparionFavs',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export default troparionFavsState;
