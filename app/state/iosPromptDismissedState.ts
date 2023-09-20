import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const iosPromptDismissedState = atom({
    key: 'iosPromptDismissed',
    default: null,
    effects: [persistAtom(null)],
});

export default iosPromptDismissedState;
