import React from 'react';
import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';

const MDXProvider = ({ children }) => (
    <OriginalMDXProvider
        components={{
            h1: ({ children }) => <h1 className="_-ОСНОВНОЙ_Имя-Службы">{children}</h1>,
            h2: ({ children }) => <h2 className="_-ОСНОВНОЙ_Имя-РаздСл">{children}</h2>,
            h3: ({ children }) => <h3 className="_-ОСНОВНОЙ_Имя-части-отст5">{children}</h3>,
            p: ({ children }) => {
                return <p className="_-ОСНОВНОЙ_Основной-отст1-5">{children}</p>;
            },
            strong: ({ children }) => <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">{children}</span>,
        }}
    >
        {children}
    </OriginalMDXProvider>
);

export default MDXProvider;
