import { SharedService } from 'hooks/useSharedService';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useSetRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import disabledPrayersState from 'state/disabledPrayersState';
import scriptVersionsState from 'state/scriptVersionsState';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import extraPrayersState from 'state/extraPrayers';

const unique = (arr: string[]) => [...new Set(arr).values()];

export const useAddSharedVersion = (serviceId: string) => {
    const [customPrayers, setCustomPrayers] = useRecoilState(customPrayersState('Sugubaja'));
    const [disabledPrayers, setDisabledPrayers] = useRecoilState(disabledPrayersState);
    const setScriptEditorIsActive = useSetRecoilState(scriptEditorIsActiveState);

    const [scriptVersions, setScriptVersions] = useRecoilState(scriptVersionsState(serviceId));
    const setCurrentScriptVersion = useSetRecoilState(currentScriptVersionState(serviceId));

    const setExtraPrayers = useRecoilTransaction_UNSTABLE(({ set }) => (extraPrayers) => {
        Object.entries(extraPrayers || {}).forEach(([key, value]) => {
            set(extraPrayersState(key), value);
        });
    });
    return (sharedServiceData: SharedService) => {
        const existingCustomPrayerIds = (customPrayers || []).map((c) => c.id);
        setCustomPrayers([
            ...(customPrayers || []),
            ...(sharedServiceData.customPrayers || []).filter((c) => !existingCustomPrayerIds.includes(c.id)),
        ]);
        setDisabledPrayers(
            unique([
                ...(disabledPrayers || []).filter(
                    (disabledPrayer) => !disabledPrayer.includes(sharedServiceData.scriptVersionId)
                ),
                ...(sharedServiceData.disabledPrayers || []),
            ])
        );

        setScriptVersions([
            ...(scriptVersions || []).filter((v) => v.id !== sharedServiceData.scriptVersionId),
            {
                name: sharedServiceData.scriptVersionName,
                id: sharedServiceData.scriptVersionId,
                sourceUserId: sharedServiceData.userId,
            },
        ]);
        setCurrentScriptVersion(sharedServiceData.scriptVersionId);
        setScriptEditorIsActive(true);

        setExtraPrayers(sharedServiceData.extraPrayers);
    };
};
