import React, { useImperativeHandle, useRef } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

import useAudio from 'hooks/useAudio';

interface RteTextProps {
    html?: string;
    className?: string;
}

const RteText = React.forwardRef<HTMLDivElement, RteTextProps>(({ html = '', className = '' }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const htmlWithStrongSlashes = html
        .replace(/([\s])\/\/([\s])/g, '$1<strong>//</strong>$2')
        .replace(/([\s])\/([\s])/g, '$1<strong>/</strong>$2');

    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);
    useAudio(localRef);
    return (
        <div
            ref={localRef}
            data-audio-root
            dangerouslySetInnerHTML={{ __html: htmlWithStrongSlashes }}
            className={`${css`
                font-size: 18px;
                line-height: 1.5;
                color: ${theme.colours.darkGray};

                & p {
                    margin-bottom: 12px;
                }

                & strong {
                    font-weight: normal !important;
                    color: ${theme.colours.red};
                }

                & h5 {
                    color: ${theme.colours.red};
                    font-size: 18px;
                    line-height: 1.3;
                    margin-bottom: 0;
                    margin-top: 24px;
                }

                & a {
                    color: ${theme.colours.primary};
                    cursor: pointer;
                }

                & img {
                    margin-right: 8px;
                }

                & audio {
                    margin-top: 12px;
                    margin-bottom: 12px;
                    display: block;
                }
            `} ${className}`}
        />
    );
});
export default RteText;
