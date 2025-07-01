import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const themeState = atom({
    key: 'themeState',
    default: 'system',
    effects: [persistAtom('system')],
});

export default themeState;
