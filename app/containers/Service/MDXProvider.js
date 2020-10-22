import React from 'react';
import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';
import './mdx.css';
const mapping = {
    h1: ({ children }) => <h1 className="H1">{children}</h1>,
    h2: ({ children }) => <h2 className="H2">{children}</h2>,
    h3: ({ children }) => <h3 className="H3">{children}</h3>,
    p: ({ children }) => <p className="P">{children}</p>,
    strong: ({ children }) => <span className="Red">{children}</span>,
    blockquote: ({ children }) => <div className="Petit">{children}</div>,
    inlineCode: ({ children }) => <span className="PetitInline">{children}</span>,
    del: ({ children }) => <span className="Super">{children}</span>,
};

const MDXProvider = ({ children }) => <OriginalMDXProvider components={mapping}>{children}</OriginalMDXProvider>;

export default MDXProvider;
