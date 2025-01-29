import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const themeState = atom({
    key: 'themeState',
    default: false,
    effects: [persistAtom(false)],
});

export default themeState;
