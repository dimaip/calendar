import { atom } from 'recoil';

const iosPromptDismissedState = atom({
    key: 'iosPromptDismissed',
    default: null,
    persistence_UNSTABLE: {
        type: 'iosPrompt',
    },
});

export default iosPromptDismissedState;
