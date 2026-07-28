export interface AppNotification {
    id: string;
    title: string;
    subtitle: string;
    buttonText: string;
    backgroundColour?: string;
    buttonColour?: string;
    activeSince?: string;
    activeTill?: string;
}

export interface AppConfig {
    notification: AppNotification | null;
}

export type ReadingVersesByType = Record<string, string[]>;
export type DayReadings = Record<string, ReadingVersesByType>;

export interface DayApiResponse {
    comment?: string | null;
    readings?: DayReadings;
    bReadings?: DayReadings;
    saints?: string;
    seromns?: SermonDetail[];
    title?: string;
    glas?: number | null;
    week?: string | number | null;
    matinsGospelKey?: string | null;
}

export interface Day extends DayApiResponse {
    fastName?: string;
    fastingLevelName?: string;
    colour?: string | null;
    icon?: string;
}

export interface ReadingTranslation {
    id: string;
    name: string;
}

export interface ReadingVerse {
    verse: string;
    type: string;
    text: string;
}

export interface ReadingFragment {
    chapter: string;
    type: string;
    verses: ReadingVerse[];
}

export interface Reading {
    bookKey: string;
    bookName: string;
    chapCount: string;
    fragments: ReadingFragment[];
    translationCurrent: string;
    translationList: ReadingTranslation[];
    verseKey: string;
}

export type ReadingResponse = Partial<Reading>;
export type ReadingsResponse = Record<string, Reading>;

export interface Part {
    value: string;
    services: string[] | null;
}

export type PartsResponse = Record<string, Record<string, Part[]>>;

export interface Hymn {
    id: string;
    title: string;
    bodytext: Record<string, string | undefined>;
}

export interface SermonSummary {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    teaser: string;
    bodytext?: string;
    date?: string;
}

export interface SermonDetail extends SermonSummary {
    bodytext: string;
}

export interface SermonTag {
    id: string;
    title: string;
    count: number;
}

export interface SermonFacets {
    authors: SermonTag[];
    themes: SermonTag[];
}

export interface ThisDay {
    id: string;
    title: string;
    image?: string;
    bodytext: string;
    link?: string;
}

export interface ExternalDay {
    sermons: SermonDetail[];
    thisDays: ThisDay[];
}

export interface Saint {
    id: string;
    title: string;
    icon?: string;
    bodytext: string;
}

export interface SharedService {
    userId: string;
    scriptVersionId: number;
    scriptVersionName: string;
    service: string;
    customPrayers: Array<{ id: number; text: string }>;
    disabledPrayers: string[];
    extraPrayers: Record<string, string[]>;
}

export interface SharedServiceReference {
    userId: string;
    serviceId: string;
    versionId: string;
}
