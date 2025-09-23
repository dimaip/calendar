import { atom } from 'recoil';

const customPrayerEditIdState = atom<number | null>({
    key: 'customPrayerEditIdState',
    default: null,
});

export default customPrayerEditIdState;
