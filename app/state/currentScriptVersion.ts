import { atomFamily } from 'recoil';

import { persistAtom } from './persistAtom';

const currentScriptVersionState = atomFamily({
    key: 'currentScriptVersion',
    default: null,
    effects: [persistAtom(null)],
});

export default currentScriptVersionState;
