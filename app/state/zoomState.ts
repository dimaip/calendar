import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const zoomState = atom({
    key: 'zoomState',
    default: 1,
    effects: [persistAtom(1)],
});

export default zoomState;
