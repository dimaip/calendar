import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Routes from '../Routes';
import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { LangContext, LangDispatchContext, useLangReducer } from './Service/useLangReducer';

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default ({ store }) => {
    const [langState, langDispatch] = useLangReducer();
    useEffect(() => {
        const loader = document.getElementById('loader');
        const reactRoot = document.getElementById('react-root');
        if (loader && reactRoot) {
            loader.style.display = 'none';
            reactRoot.style.display = 'block';
        }
    }, []);
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Provider store={store}>
                <LangContext.Provider value={langState}>
                    <LangDispatchContext.Provider value={langDispatch}>
                        <HashRouter>
                            <Routes />
                        </HashRouter>
                        <ZoomControl />
                    </LangDispatchContext.Provider>
                </LangContext.Provider>
            </Provider>
        </ReactQueryCacheProvider>
    );
};
