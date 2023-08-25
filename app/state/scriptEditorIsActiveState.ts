import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const scriptEditorIsActiveState = atom({
    key: 'scriptEditorIsActive',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export default scriptEditorIsActiveState;
