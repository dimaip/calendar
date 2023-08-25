import { atom } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { array, string, CheckResult } from '@recoiljs/refine';

import { persistAtom } from './persistAtom';

const troparionFavsState = atom<string[]>({
    key: 'troparionFavs',
    default: [],
    effects: [
        persistAtom,
        syncEffect({
            storeKey: 'pb',
            refine: (v) => ({ type: 'success', value: v || [], warnings: [] }),
        }),
    ],
});

export default troparionFavsState;
