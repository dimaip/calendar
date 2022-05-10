import ScriptEditorInput from 'components/ScriptEditor/ScriptEditorInput';
import { makeId } from 'hooks/useUpdateTOC';
import React from 'react';

const addToTOC = (title: unknown): string => {
    if (!window.TOC) {
        window.TOC = {};
    }
    const domId =
        typeof title === 'string'
            ? title
            : Array.isArray(title)
            ? title.filter((i) => typeof i === 'string').join(' ')
            : null;
    if (!domId) {
        return '';
    }
    window.TOC[domId] = domId;
    return makeId(domId);
};

export const H1 = ({ children }): JSX.Element => <h1 className="H1">{children}</h1>;

export const H2 = ({ children }): JSX.Element => {
    const domId = addToTOC(children);
    return (
        <h2 className="H2" id={domId}>
            {children}
        </h2>
    );
};

export const H3 = ({ children }): JSX.Element => {
    const domId = addToTOC(children);
    return (
        <h3 className="H3" id={domId}>
            {children} <ScriptEditorInput id={window.location.href + children} />
        </h3>
    );
};

export const H4 = ({ children }): JSX.Element => <h4 className="H4">{children}</h4>;

export const P = ({ children }): JSX.Element => <p className="P">{children}</p>;

export const Red = ({ children }): JSX.Element => <span className="Red">{children}</span>;

export const Petit = ({ children }): JSX.Element => <div className="Petit">{children}</div>;

export const PetitInline = ({ children }): JSX.Element => <span className="PetitInline">{children}</span>;

export const Super = ({ children }): JSX.Element => <span className="Super">{children}</span>;
