import { useRecoilState } from 'recoil';
import currentScriptVersionState from 'state/currentScriptVersion';
import disabledPrayersState from 'state/disabledPrayersState';
import scriptVersionsState, { Version } from 'state/scriptVersionsState';

export const useDuplicateVersion = (serviceId: string): ((version: Version) => void) => {
    const [disabledPrayers, setDisabledPrayers] = useRecoilState(disabledPrayersState);
    // const [extraPrayers, setExtraPrayers] = useRecoilState(extraPrayersState(serviceId));
    const [scriptVersions, setScriptVersions] = useRecoilState(scriptVersionsState(serviceId));
    const [_currentScriptVersion, setCurrentScriptVersion] = useRecoilState(currentScriptVersionState(serviceId));
    const duplicateVersion = (version: Version): void => {
        const newVersionId = `v${new Date().getTime()}`;

        const clonedDisabledPrayersForService = (disabledPrayers || [])
            .filter((disabledPrayer) => disabledPrayer.includes(version.id))
            .map((disabledPrayer) => disabledPrayer.replace(version.id, newVersionId));

        // @TODO-DP: extra services

        setDisabledPrayers([...(disabledPrayers || []), ...clonedDisabledPrayersForService]);
        setScriptVersions([
            ...(scriptVersions || []),
            {
                name: `${version.name} (копия)`,
                id: newVersionId,
            },
        ]);

        setCurrentScriptVersion(newVersionId);
    };
    return duplicateVersion;
};
