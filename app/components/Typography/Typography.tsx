import React from 'react';

import { getHeadingLabel } from './headingLabel';

import ScriptEditorInput from 'components/ScriptEditor/ScriptEditorInput';
import { useTOCHeading } from 'components/TOC/TOCProvider';

interface TypographyProps {
    children?: React.ReactNode;
}

export const H1 = ({ children }: TypographyProps): JSX.Element => <h1 className="H1">{children}</h1>;

export const H2 = ({ children, id, ...headingProps }: React.ComponentPropsWithoutRef<'h2'>): JSX.Element => {
    const label = getHeadingLabel(children);
    const ref = useTOCHeading({ explicitId: id, label, level: 2 });
    return (
        <h2 {...headingProps} className="H2" id={id} ref={ref}>
            {children}
        </h2>
    );
};

export const H3 = ({ children, id, ...headingProps }: React.ComponentPropsWithoutRef<'h3'>): JSX.Element => {
    const label = getHeadingLabel(children);
    const ref = useTOCHeading({ explicitId: id, label, level: 3 });
    return (
        <h3 {...headingProps} className="H3" id={id} ref={ref}>
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
