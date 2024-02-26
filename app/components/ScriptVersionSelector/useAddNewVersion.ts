import { useRecoilState } from 'recoil';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import scriptVersionSelectorIsActiveState from 'state/scriptVersionSelectorIsActiveState';
import scriptVersionsState from 'state/scriptVersionsState';

export const useAddNewVersion = (serviceId: string): ((newVersionName?: string) => void) => {
    const [_scriptVersionSelectorIsActive, setScriptVersionSelectorIsActive] = useRecoilState(
        scriptVersionSelectorIsActiveState
    );
    const [scriptVersions, setScriptVersions] = useRecoilState<boolean>(scriptVersionsState(serviceId));
    const [_currentScriptVersion, setCurrentScriptVersion] = useRecoilState<string | null>(
        currentScriptVersionState(serviceId)
    );
    const [_, setScriptEditorIsActive] = useRecoilState(scriptEditorIsActiveState);
    const addNewVersion = (newVersionName?: string): void => {
        if (newVersionName) {
            const version = `v${new Date().getTime()}`;
            setScriptVersions([...(scriptVersions || []), { name: newVersionName, id: version }]);
            setCurrentScriptVersion(version);
            setScriptEditorIsActive(true);
            setScriptVersionSelectorIsActive(false);
        } else {
            alert('Введите название чина');
        }
    };
    return addNewVersion;
};
