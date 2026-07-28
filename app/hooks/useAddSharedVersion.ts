import type { SharedService } from 'hooks/useSharedService';
import type { RecoilState } from 'recoil';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useSetRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import disabledPrayersState from 'state/disabledPrayersState';
import scriptVersionsState from 'state/scriptVersionsState';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import extraPrayersState from 'state/extraPrayers';

export const useAddSharedVersion = (serviceId: string) => {
    const [customPrayers, setCustomPrayers] = useRecoilState(
        customPrayersState('Sugubaja') as RecoilState<SharedService['customPrayers']>
    );
    const [disabledPrayers, setDisabledPrayers] = useRecoilState(disabledPrayersState);
    const setScriptEditorIsActive = useSetRecoilState(scriptEditorIsActiveState);

    const [scriptVersions, setScriptVersions] = useRecoilState(scriptVersionsState(serviceId));
    const setCurrentScriptVersion = useSetRecoilState(currentScriptVersionState(serviceId));

    const setExtraPrayers = useRecoilTransaction_UNSTABLE(
        ({ set }) => (extraPrayers: SharedService['extraPrayers']) => {
            Object.entries(extraPrayers || {}).forEach(([key, value]) => {
                set(extraPrayersState(key), value);
            });
        }
    );
    return (sharedServiceData: SharedService) => {
        const scriptVersionId = String(sharedServiceData.scriptVersionId);
        const existingCustomPrayerIds = (customPrayers || []).map((c) => c.id);
        setCustomPrayers([
            ...(customPrayers || []),
            ...(sharedServiceData.customPrayers || []).filter((c) => !existingCustomPrayerIds.includes(c.id)),
        ]);
        setDisabledPrayers(
            Array.from(
                new Set([
                    ...(disabledPrayers || []).filter((disabledPrayer) => !disabledPrayer.includes(scriptVersionId)),
                    ...(sharedServiceData.disabledPrayers || []),
                ])
            )
        );

        setScriptVersions([
            ...(scriptVersions || []).filter((v) => v.id !== scriptVersionId),
            {
                name: sharedServiceData.scriptVersionName,
                id: scriptVersionId,
                sourceUserId: sharedServiceData.userId,
            },
        ]);
        setCurrentScriptVersion(scriptVersionId);
        setScriptEditorIsActive(false);

        setExtraPrayers(sharedServiceData.extraPrayers);
    };
};
