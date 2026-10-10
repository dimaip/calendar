import { atom } from 'recoil';

export const updateStatusState = atom<'idle' | 'updating' | 'failed'>({
    key: 'appUpdateStatus',
    default: 'idle',
});

const pendingUpdateState = atom<null | string>({
    key: 'pendingUpdate',
    default: null,
});

export default pendingUpdateState;
