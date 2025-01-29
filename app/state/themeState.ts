import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const themeState = atom({
    key: 'themeState',
    default: null,
    effects: [persistAtom(null)],
});

export default themeState;
