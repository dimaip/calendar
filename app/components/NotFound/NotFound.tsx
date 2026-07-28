import React from 'react';
import { useDocumentTitle } from 'utils/useDocumentTitle';

const NotFound = () => {
    useDocumentTitle('Страница не найдена');
    return (
        <div>
            <h1>Страница не найдена</h1>
        </div>
    );
};

export default NotFound;
