import { useReducer, createContext } from 'react';

export const LangContext = createContext(null);
export const LangDispatchContext = createContext(null);

let preloadedState = {};

try {
    preloadedState = localStorage.getItem('langState') ? JSON.parse(localStorage.getItem('langState')) : {};
} catch (e) {
    console.warn(e);
}

const defaultState = {
    lang: 'ru',
    langA: 'ru',
    langB: 'csj',
};

const initialState = Object.assign(defaultState, preloadedState);

export const useLangReducer = () => {
    let timer = null;

    return useReducer((state, action) => {
        let newState;
        switch (action.type) {
            case 'setLang':
                newState = { ...state, lang: action.lang };
                break;
            case 'toggleParallelLangs':
                newState = { ...state, langA: state.langB, langB: state.langA };
                break;
            default:
                throw new Error('Invalid action type');
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            try {
                localStorage.setItem('langState', JSON.stringify(state));
            } catch (e) {
                console.warn(e);
            }
            timer = null;
        }, 100);

        return newState;
    }, initialState);
};
