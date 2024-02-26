import { SerializableParam, atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const scriptVersionsState = atomFamily<Array<{ id: number; name: string; sourceUserId?: string }>, SerializableParam>({
    key: 'scriptVersions',
    default: [],
    effects: [persistAtom([])],
});

export default scriptVersionsState;
