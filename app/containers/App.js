import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Routes from '../Routes';
import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';
import { ReactQueryConfigProvider } from 'react-query';

const queryConfig = { refetchAllOnWindowFocus: false };

export default ({ store }) => {
    useEffect(() => {
        const loader = document.getElementById('loader');
        const reactRoot = document.getElementById('react-root');
        if (loader && reactRoot) {
            loader.style.display = 'none';
            reactRoot.style.display = 'block';
        }
    }, []);
    return (
        <ReactQueryConfigProvider config={queryConfig}>
            <Provider store={store}>
                <HashRouter>
                    <Routes />
                </HashRouter>
                <ZoomControl />
            </Provider>
        </ReactQueryConfigProvider>
    );
};
