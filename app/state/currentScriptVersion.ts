import { SerializableParam, atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const currentScriptVersionState = atomFamily<null | string, SerializableParam>({
    key: 'currentScriptVersion',
    default: null,
    effects: [persistAtom(null)],
});

export default currentScriptVersionState;
