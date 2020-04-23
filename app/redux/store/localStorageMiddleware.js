import { SET_ZOOM, SET_LANGUAGE, DISMISS_IOS_PROMPT } from 'constants/actionTypes';
//
// Local storage middleware.
//
// Saves relevant parts of the state to local storage on every action
// that matches the "persistentActionsPattern"
//
const localStorageMiddleware = ({ getState }) => {
    let timer = null;
    const debounceLocalStorageTimeout = 100;
    const persistentActionsPatterns = [SET_ZOOM, SET_LANGUAGE, DISMISS_IOS_PROMPT];

    return next => action => {
        const returnValue = next(action);

        const actionMatched = persistentActionsPatterns.some(pattern => action.type === pattern);

        // If UI kind of action, persist state to local storage
        if (actionMatched) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const state = getState();
                // TODO: figure out a more declarative way to manage this
                const persistentStateSubset = {
                    settings: state.settings,
                };
                try {
                    localStorage.setItem('persistedState', JSON.stringify(persistentStateSubset));
                } catch (e) {
                    console.warn(e);
                }
                timer = null;
            }, debounceLocalStorageTimeout);
        }

        return returnValue;
    };
};

export default localStorageMiddleware;
