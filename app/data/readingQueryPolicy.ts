export type BulkReadingQueryStatus = 'pending' | 'error' | 'success';

export interface ReadingQueryPlan {
    fetchBulkReadings: boolean;
    fetchIndividualReading: boolean;
    useBulkReading: boolean;
}

/**
 * The date-level readings response already contains the default translation.
 * An individual request is only a fallback when that response has settled
 * without the requested reading. Non-default translations are never supplied
 * by the bulk endpoint and can start immediately.
 */
export const getReadingQueryPlan = (
    translation: string,
    bulkQueryStatus: BulkReadingQueryStatus,
    hasBulkReading: boolean
): ReadingQueryPlan => {
    const fetchBulkReadings = translation === 'default';
    const useBulkReading = fetchBulkReadings && hasBulkReading;

    return {
        fetchBulkReadings,
        fetchIndividualReading: !fetchBulkReadings || (bulkQueryStatus !== 'pending' && !useBulkReading),
        useBulkReading,
    };
};
