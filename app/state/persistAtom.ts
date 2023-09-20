import { syncEffect } from 'recoil-sync';

export const persistAtom = (fallback: unknown) =>
    syncEffect({
        storeKey: 'pb',
        refine: (v) => ({ type: 'success', value: v || fallback, warnings: [] }),
    });
