import { atom } from 'recoil';

const iosPromptState = atom({
    key: 'iosPrompt',
    default: null,
    persistence_UNSTABLE: {
        type: 'iosPrompt',
    },
});

export default iosPromptState;
