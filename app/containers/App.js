import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import routes from '../routes';
import 'styles/reset.css';
import ZoomControl from 'components/ZoomControl/ZoomControl';

export default ({ store }) => {
    return (
        <Provider store={store}>
            <HashRouter>{routes}</HashRouter>
            <ZoomControl />
        </Provider>
    );
};
