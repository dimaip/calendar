import React from 'react';
import { Route } from 'react-router-dom';
import { useDocumentTitle } from 'utils/useDocumentTitle';

const Status = ({ code, children }) => (
    <Route
        render={({ staticContext }) => {
            if (staticContext) {
                staticContext.status = code;
            }

            return children;
        }}
    />
);

const NotFound = () => {
    useDocumentTitle('Страница не найдена');
    return (
        <Status code={404}>
            <div>
                <h1>Страница не найдена</h1>
            </div>
        </Status>
    );
};

export default NotFound;
