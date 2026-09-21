import React, { Suspense, createContext, useContext } from 'react';
import { useRecoilValue } from 'recoil';

import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';

const ActiveScriptEditorInput = React.lazy(
    async () =>
        await import(
            /* webpackChunkName: "script-editor-input" */
            './ActiveScriptEditorInput'
        )
);

const ScriptEditorActiveContext = createContext(false);

export const ScriptEditorStateProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const scriptEditorIsActive = useRecoilValue(scriptEditorIsActiveState);

    return (
        <ScriptEditorActiveContext.Provider value={scriptEditorIsActive}>{children}</ScriptEditorActiveContext.Provider>
    );
};

const ScriptEditorInput = ({ id }: { id: string }): JSX.Element | null => {
    const scriptEditorIsActive = useContext(ScriptEditorActiveContext);

    if (!scriptEditorIsActive) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <ActiveScriptEditorInput id={id} />
        </Suspense>
    );
};

export default ScriptEditorInput;
