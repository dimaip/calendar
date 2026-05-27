export type TrackedPrayerTimeOfDay = 'morning' | 'evening';

export const trackedPrayerTimeOfDayByServiceId: Partial<Record<string, TrackedPrayerTimeOfDay>> = {
    matins: 'morning',
    vespers: 'evening',
};

export const trackedPrayerLabelByTimeOfDay: Record<TrackedPrayerTimeOfDay, string> = {
    morning: 'утреннюю',
    evening: 'вечернюю',
};
