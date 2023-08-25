import { atomFamily, SerializableParam } from 'recoil';

import { persistAtom } from './persistAtom';

const namesState = atomFamily<string, SerializableParam>({
    key: 'names',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export default namesState;
