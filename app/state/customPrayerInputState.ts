import { atom } from 'recoil';

const customPrayerInputState = atom<string | null>({
    key: 'customPrayerInputState',
    default: null,
});

export default customPrayerInputState;
