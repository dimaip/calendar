import React from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import { useRecoilState } from 'recoil';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import scriptVersionsState from 'state/scriptVersionsState';
import currentScriptVersionState from 'state/currentScriptVersion';
import Cross from 'components/svgs/Cross';
import { useTheme } from 'emotion-theming';

const ScriptEditorToggle = ({ serviceId }) => {
    const [scriptEditorIsActive, setScriptEditorIsActive] = useRecoilState(scriptEditorIsActiveState);

    const [scriptVersions] = useRecoilState<boolean>(scriptVersionsState(serviceId));
    const [currentScriptVersion] = useRecoilState<string | null>(currentScriptVersionState(serviceId));
    const currentScriptVersionName = scriptVersions.find((v) => v.id === currentScriptVersion)?.name || 'Исходный чин';

    const theme = useTheme();
    if (!scriptEditorIsActive) {
        return null;
    }
    return (
        <div
            className={css`
                height: 36px;
            `}
        >
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    background-color: ${theme.colours.primary};
                    color: white;
                    font-size: 13px;
                    position: fixed;
                    z-index: 1;
                    top: 50px;
                    left: 0;
                    right: 0;
                `}
            >
                <div
                    className={
                        'scriptEditorToggle ' +
                        css`
                            padding: 10px;
                            text-align: center;
                            flex-grow: 1;
                        `
                    }
                >
                    {currentScriptVersionName}
                </div>

                <Button
                    className={
                        'scriptEditorToggle-close ' +
                        css`
                            flex-grow: 0;
                            font-size: 24px;
                            line-height: 0;
                            margin-top: -6px;
                            padding: 10px;
                            position: absolute;
                            right: 0;
                        `
                    }
                    onClick={() => setScriptEditorIsActive(false)}
                >
                    <Cross white />
                </Button>
            </div>
        </div>
    );
};
export default ScriptEditorToggle;
