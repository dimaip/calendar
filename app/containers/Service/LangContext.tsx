import { createContext } from 'react';

export interface LangContextValue {
    lang: string;
    langA: string;
    langB: string;
}

export const LangContext = createContext<LangContextValue>({
    lang: 'ru',
    langA: 'ru',
    langB: 'csj',
});
