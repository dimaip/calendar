import { atom } from 'recoil';

const pendingUpdateState = atom<null | string>({
    key: 'pendingUpdate',
    default: null,
});

export default pendingUpdateState;
