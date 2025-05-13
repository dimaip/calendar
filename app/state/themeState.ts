import { atom } from 'recoil';
import isDarkMode from 'utils/isDarkMode';

import { persistAtom } from './persistAtom';

const themeState = atom({
    key: 'themeState',
    default: isDarkMode(),
    effects: [persistAtom(isDarkMode())],
});

export default themeState;
