import { atom } from 'recoil';

const iosPromptDismissedState = atom({
    key: 'iosPrompt',
    default: null,
    persistence_UNSTABLE: {
        type: 'iosPrompt',
    },
});

export default iosPromptDismissedState;
