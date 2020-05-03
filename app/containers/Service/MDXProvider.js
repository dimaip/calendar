import React from 'react';
import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';

const mapping = {
    h1: ({ children }) => <h1 className="_-ОСНОВНОЙ_Имя-Службы">{children}</h1>,
    h2: ({ children }) => <h2 className="_-ОСНОВНОЙ_Имя-РаздСл">{children}</h2>,
    h3: ({ children }) => <h3 className="_-ОСНОВНОЙ_Имя-части-отст5">{children}</h3>,
    p: ({ children }) => {
        return <p className="_-ОСНОВНОЙ_Основной-отст1-5">{children}</p>;
    },
    strong: ({ children }) => <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">{children}</span>,
    blockquote: ({ children }) => <p className="_-ПЕТИТ_Петит-отст1-5">{children}</p>,
    inlineCode: ({ children }) => <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">{children}</span>,
    del: ({ children }) => <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">{children}</span>,
};

const MDXProvider = ({ children }) => <OriginalMDXProvider components={mapping}>{children}</OriginalMDXProvider>;

export default MDXProvider;
