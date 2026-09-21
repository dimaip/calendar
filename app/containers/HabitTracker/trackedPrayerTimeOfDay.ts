export type TrackedPrayerTimeOfDay = 'morning' | 'evening';

export const trackedPrayerTimeOfDayByServiceId: Partial<Record<string, TrackedPrayerTimeOfDay>> = {
    matins: 'morning',
    vespers: 'evening',
};

export const getPrayerTrackingPolicy = (serviceId: string, isLoggedIn: boolean) => {
    const trackedPrayerTimeOfDay = trackedPrayerTimeOfDayByServiceId[serviceId];

    return {
        trackedPrayerTimeOfDay,
        subscribeToSettings: Boolean(isLoggedIn && trackedPrayerTimeOfDay),
    };
};

export const trackedPrayerLabelByTimeOfDay: Record<TrackedPrayerTimeOfDay, string> = {
    morning: 'утреннюю',
    evening: 'вечернюю',
};
