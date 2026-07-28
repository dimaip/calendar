export const queryKeys = {
    app: () => ['app'] as const,
    day: (date: string) => ['day', { date }] as const,
    externalDay: (date: string) => ['ext-day', { date }] as const,
    filteredSermons: (authorId?: string, themeId?: string, limit?: number, offset?: number) =>
        ['filtered-sermons', { authorId, themeId, limit, offset }] as const,
    hymns: () => ['hymns', {}] as const,
    parts: (date: string, lang: string) => ['day', { date, lang }] as const,
    reading: (link: string, translation: string) => ['reading', { link, translation }] as const,
    readings: (date: string) => ['readings', { date }] as const,
    saint: (saintId: string) => ['saint', { saintId }] as const,
    sermon: (sermonId: string) => ['sermon', { sermonId }] as const,
    sermonFacets: () => ['sermon-facets'] as const,
    sharedService: (userId?: string, serviceId?: string, versionId?: string) =>
        ['sharedService', { userId, serviceId, versionId }] as const,
};
