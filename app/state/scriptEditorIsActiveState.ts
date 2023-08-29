import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const scriptEditorIsActiveState = atom({
    key: 'scriptEditorIsActive',
    default: false,
    effects: [persistAtom(false)],
});

export default scriptEditorIsActiveState;
