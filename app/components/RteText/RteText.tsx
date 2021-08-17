import React, { useEffect, useRef } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import useAudio from 'hooks/useAudio';

const RteText = React.forwardRef(({ html, className = '' }, ref) => {
    const localRef = useRef();
    const effectiveRef = ref || localRef;
    const theme = useTheme();
    const htmlWithStrongSlashes = html
        .replace(/([\s])\/\/([\s])/g, '$1<strong>//</strong>$2')
        .replace(/([\s])\/([\s])/g, '$1<strong>/</strong>$2');

    useAudio(effectiveRef);
    return (
        <div
            ref={effectiveRef}
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
                    margin-top: 28px;
                    text-align: center;
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
