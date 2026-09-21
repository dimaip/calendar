import { atom } from 'recoil';

export interface TOCItem {
    value: string;
    label: string;
    shortLabel: string;
    level?: number;
}

export type TOCRegistry = Record<string, TOCItem>;

declare global {
    interface Window {
        TOC?: TOCRegistry;
    }
}

const TOCState = atom<TOCItem[]>({
    key: 'TOC',
    default: [],
});

export default TOCState;
