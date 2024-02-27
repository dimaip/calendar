import { SerializableParam, atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const currentScriptVersionState = atomFamily<null | number, SerializableParam>({
    key: 'currentScriptVersion',
    default: null,
    effects: [persistAtom(null)],
});

export default currentScriptVersionState;
