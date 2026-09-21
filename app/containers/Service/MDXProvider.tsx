import React, { useRef } from 'react';
import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';

import If, { Then, Else } from 'components/If/If';
import Tooltip from 'components/Tooltip/Tooltip';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import { MdxLoaderRuntimeProvider } from 'containers/Service/Texts/MdxLoaderRuntime';
import Parts from 'components/Parts/Parts';
import './mdx.css';
import useAudio from 'hooks/useAudio';
import { H1, H2, H3, H4, P, Petit, PetitInline, Red, Super } from 'components/Typography/Typography';
import { ScriptEditorStateProvider } from 'components/ScriptEditor/ScriptEditorInput';

const mapping = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
    R: Red,
    strong: Red,
    blockquote: Petit,
    inlineCode: PetitInline,
    code: PetitInline,
    del: Super,

    If,
    Then,
    Else,
    Tooltip,
    MdxLoader,
    Parts,

    wrapper: (props) => <div {...props} />,
};

const AudioRoot = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    useAudio(ref);

    return (
        <div ref={ref} data-audio-root>
            {children}
        </div>
    );
};

const MDXProvider = ({ children }): JSX.Element => (
    <MdxLoaderRuntimeProvider>
        <ScriptEditorStateProvider>
            <OriginalMDXProvider components={mapping}>
                <AudioRoot>{children}</AudioRoot>
            </OriginalMDXProvider>
        </ScriptEditorStateProvider>
    </MdxLoaderRuntimeProvider>
);

export default MDXProvider;
