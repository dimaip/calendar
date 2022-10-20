import React, { useRef } from 'react';
import { MDXProvider as OriginalMDXProvider } from '@mdx-js/react';
import If, { Then, Else } from 'components/If/If';
import Tooltip from 'components/Tooltip/Tooltip';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Parts from 'components/Parts/Parts';
import './mdx.css';
import useAudio from 'hooks/useAudio';
import { H1, H2, H3, H4, P, Petit, PetitInline, Red, Super } from 'components/Typography/Typography';

const mapping = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: P,
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

    wrapper: (props) => {
        const ref = useRef();
        useAudio(ref);
        return <div {...props} ref={ref} />;
    },
};

const MDXProvider = ({ children }) => <OriginalMDXProvider components={mapping}>{children}</OriginalMDXProvider>;

export default MDXProvider;
