import { atom } from 'recoil';

const menuShownState = atom({
    key: 'menuShownState',
    default: false,
});

export default menuShownState;
