import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const zoomState = atom({
    key: 'zoomState',
    default: 1,
    effects_UNSTABLE: [persistAtom],
});

export default zoomState;
