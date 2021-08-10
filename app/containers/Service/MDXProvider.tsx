import React, { useRef } from 'react';
import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';
import ScriptEditorInput from 'components/ScriptEditor/ScriptEditorInput';
import If, { Then, Else } from 'components/If/If';
import Tooltip from 'components/Tooltip/Tooltip';
import './mdx.css';
import useAudio from 'hooks/useAudio';

const mapping = {
    h1: ({ children }) => <h1 className="H1">{children}</h1>,
    h2: ({ children }) => <h2 className="H2">{children}</h2>,
    h3: ({ children }) => (
        <h3 className="H3">
            {children} <ScriptEditorInput id={window.location.href + children} />
        </h3>
    ),
    p: ({ children }) => <p className="P">{children}</p>,
    strong: ({ children }) => <span className="Red">{children}</span>,
    blockquote: ({ children }) => <div className="Petit">{children}</div>,
    inlineCode: ({ children }) => <span className="PetitInline">{children}</span>,
    del: ({ children }) => <span className="Super">{children}</span>,

    If,
    Then,
    Else,
    Tooltip,

    wrapper: (props) => {
        const ref = useRef();
        useAudio(ref);
        return <div {...props} ref={ref} />;
    },
};

const MDXProvider = ({ children }) => <OriginalMDXProvider components={mapping}>{children}</OriginalMDXProvider>;

export default MDXProvider;
