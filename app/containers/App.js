import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import routes from '../routes';
import 'styles/reset.css';

export default ({ store }) => {
    return (
        <Provider store={store}>
            <HashRouter>{routes}</HashRouter>
        </Provider>
    );
};
