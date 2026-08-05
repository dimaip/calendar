import React, { createContext, useContext, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ServiceContext } from '../ServiceContext';

import disabledPrayersState from 'state/disabledPrayersState';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';

interface MdxLoaderRuntimeValue {
    currentScriptVersion: string | null;
    disabledPrayers: string[];
    scriptEditorIsActive: boolean;
    serviceId?: string;
    setDisabledPrayers: (prayerIds: string[]) => void;
}

const readerRuntime: MdxLoaderRuntimeValue = {
    currentScriptVersion: null,
    disabledPrayers: [],
    scriptEditorIsActive: false,
    setDisabledPrayers: () => undefined,
};

const MdxLoaderRuntimeContext = createContext<MdxLoaderRuntimeValue>(readerRuntime);

export const MdxLoaderRuntimeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const serviceId = useContext(ServiceContext)?.serviceId;
    const currentScriptVersion = useRecoilValue<string | null>(currentScriptVersionState(serviceId));
    const scriptEditorIsActive = Boolean(useRecoilValue(scriptEditorIsActiveState));
    const [disabledPrayers, setDisabledPrayers] = useRecoilState(disabledPrayersState);
    const runtime = useMemo(
        () => ({
            currentScriptVersion,
            disabledPrayers,
            scriptEditorIsActive,
            serviceId,
            setDisabledPrayers,
        }),
        [currentScriptVersion, disabledPrayers, scriptEditorIsActive, serviceId, setDisabledPrayers]
    );

    return <MdxLoaderRuntimeContext.Provider value={runtime}>{children}</MdxLoaderRuntimeContext.Provider>;
};

export const useMdxLoaderRuntime = (): MdxLoaderRuntimeValue => useContext(MdxLoaderRuntimeContext);
