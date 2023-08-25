import { atom } from 'recoil';

import { persistAtom } from './persistAtom';

const iosPromptDismissedState = atom({
    key: 'iosPromptDismissed',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export default iosPromptDismissedState;
