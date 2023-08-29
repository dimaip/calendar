import { atomFamily, SerializableParam } from 'recoil';

import { persistAtom } from './persistAtom';

const namesState = atomFamily<string, SerializableParam>({
    key: 'names',
    default: '',
    effects: [persistAtom('')],
});

export default namesState;
