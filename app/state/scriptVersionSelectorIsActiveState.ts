import { atom } from 'recoil';

const scriptVersionSelectorIsActiveState = atom({
    key: 'scriptVersionSelectorIsActive',
    default: false,
});

export default scriptVersionSelectorIsActiveState;
