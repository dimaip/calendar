import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'redux/modules/root';
import thunkMiddleware from 'redux-thunk';
import localStorageMiddleware from './localStorageMiddleware';

const configureStore = preloadedState => {
    const store = compose(applyMiddleware(thunkMiddleware, localStorageMiddleware))(createStore)(
        rootReducer,
        preloadedState
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('redux/modules/root', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};

export default configureStore;
