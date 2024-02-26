import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const scriptEditorPromoDismissedState = atom({
    key: 'scriptEditorPromoDismissed',
    default: null,
    effects: [persistAtom(null)],
});

export default scriptEditorPromoDismissedState;
