import { atom } from 'recoil';

const setZoomState = atom({
    key: 'setZoomState',
    default: 1,
    persistence_UNSTABLE: {
        type: 'zoom',
    },
});

export default setZoomState;
