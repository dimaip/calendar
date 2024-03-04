import { SerializableParam, atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

export interface Version {
    id: string;
    name: string;
    sourceUserId?: string;
}

const scriptVersionsState = atomFamily<Version[], SerializableParam>({
    key: 'scriptVersions',
    default: [],
    effects: [persistAtom([])],
});

export default scriptVersionsState;
