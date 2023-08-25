import { atom } from 'recoil';

const zoomControlShownState = atom({
    key: 'zoomControlIsShown',
    default: false,
});

export default zoomControlShownState;
