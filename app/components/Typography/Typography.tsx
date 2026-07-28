import React, { useEffect, useRef } from 'react';

import ScriptEditorInput from 'components/ScriptEditor/ScriptEditorInput';
import type { TOCItem } from 'state/TOCState';

interface TypographyProps {
    children?: React.ReactNode;
}

const useAddToTOC = (title: React.ReactNode, level?: number): string => {
    const randomNumberRef = useRef(Math.floor(Math.random() * 100));
    const domId =
        typeof title === 'string'
            ? title
            : Array.isArray(title)
            ? title.filter((i) => typeof i === 'string').join(' ')
            : null;

    const processedDomId = domId ? `r-${domId}-${randomNumberRef.current}` : '';

    useEffect(() => {
        if (!processedDomId || !domId) {
            return undefined;
        }

        const item: TOCItem = {
            value: processedDomId,
            label: domId,
            shortLabel: domId,
            level,
        };
        window.TOC = window.TOC || {};
        window.TOC[processedDomId] = item;

        return () => {
            if (window.TOC?.[processedDomId] === item) {
                Reflect.deleteProperty(window.TOC, processedDomId);
            }
        };
    }, [domId, level, processedDomId]);

    if (!domId) {
        return '';
    }
    return processedDomId;
};

export const H1 = ({ children }: TypographyProps): JSX.Element => <h1 className="H1">{children}</h1>;

export const H2 = ({ children }: TypographyProps): JSX.Element => {
    const domId = useAddToTOC(children, 2);
    return (
        <h2 className="H2" id={domId}>
            {children}
        </h2>
    );
};

export const H3 = ({ children }: TypographyProps): JSX.Element => {
    const domId = useAddToTOC(children, 3);
    return (
        <h3 className="H3" id={domId}>
            {children} <ScriptEditorInput id={`${window.location.href}${String(children)}`} />
        </h3>
    );
};

export const H4 = ({ children }: TypographyProps): JSX.Element => <h4 className="H4">{children}</h4>;

export const P = ({ children }: TypographyProps): JSX.Element => <p className="P">{children}</p>;

export const Red = ({ children }: TypographyProps): JSX.Element => <span className="Red">{children}</span>;

export const Petit = ({ children }: TypographyProps): JSX.Element => <div className="Petit">{children}</div>;

export const PetitInline = ({ children }: TypographyProps): JSX.Element => (
    <span className="PetitInline">{children}</span>
);

export const Super = ({ children }: TypographyProps): JSX.Element => <span className="Super">{children}</span>;
