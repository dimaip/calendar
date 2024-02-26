import { useAddSharedVersion } from 'hooks/useAddSharedVersion';
import { fetchSharedService } from 'hooks/useSharedService';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptVersionsState from 'state/scriptVersionsState';

export const useSyncCurrentScriptVersion = () => {
    const serviceId = 'matins';

    const [scriptVersions] = useRecoilState(scriptVersionsState(serviceId));
    const [currentScriptVersion] = useRecoilState(currentScriptVersionState(serviceId));
    const addSharedVersion = useAddSharedVersion(serviceId);

    const currentScript = scriptVersions?.find((v) => v.id === currentScriptVersion);
    const sourceUserId = currentScript?.sourceUserId;

    useEffect(() => {
        if (sourceUserId) {
            void fetchSharedService(sourceUserId, serviceId, currentScriptVersion).then((sharedServiceData) => {
                return addSharedVersion(sharedServiceData);
            });
        }
    }, [sourceUserId, serviceId, currentScriptVersion]);
};
