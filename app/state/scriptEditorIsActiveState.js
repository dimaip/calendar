import { atom } from 'recoil';

const scriptEditorIsActiveState = atom({
    key: 'scriptEditorIsActive',
    default: false,
    persistence_UNSTABLE: {
        type: 'scriptEditorIsActive',
    },
});

export default scriptEditorIsActiveState;
