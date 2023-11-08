import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Cross from 'components/svgs/Cross';
import Button from 'components/Button/Button';
import Drawer from 'components/Drawer/Drawer';
import Input from 'components/Input/Input';
import scriptVersionSelectorIsActiveState from 'state/scriptVersionSelectorIsActiveState';
import { useRecoilState } from 'recoil';
import scriptVersionsState from 'state/scriptVersionsState';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import currentScriptVersionState from 'state/currentScriptVersion';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';
import PlusIcon from 'components/svgs/PlusIcon';

const ScriptVersionSelector = ({ serviceId }) => {
    const theme = useTheme();
    const [scriptVersionSelectorIsActive, setScriptVersionSelectorIsActive] = useRecoilState(
        scriptVersionSelectorIsActiveState
    );
    const [scriptVersions, setScriptVersions] = useRecoilState<boolean>(scriptVersionsState(serviceId));
    const [currentScriptVersion, setCurrentScriptVersion] = useRecoilState<string | null>(
        currentScriptVersionState(serviceId)
    );
    const currentScriptVersionName = scriptVersions.find((v) => v.id === currentScriptVersion)?.name || 'Исходный чин';
    const [newVersionName, setNewVersionName] = useState('');

    const { toggleOpen } = useContext(DotsMenuContext);

    const addNewVersion = () => {
        if (newVersionName) {
            const version = `v${new Date().getTime()}`;
            setScriptVersions([...(scriptVersions || []), { name: newVersionName, id: new Date().getTime() }]);
            setCurrentScriptVersion(version);
            setNewVersionName('');
        } else {
            alert('Введите название чина');
        }
    };

    return scriptVersionSelectorIsActive ? (
        <Drawer onClose={() => setScriptVersionSelectorIsActive(false)}>
            <>
                <ButtonBox
                    onClick={() => {
                        setCurrentScriptVersion(null);
                        setScriptVersionSelectorIsActive(false);
                    }}
                >
                    Исходный чин
                </ButtonBox>
                {scriptVersions.map((version) => (
                    <ButtonBox
                        id={version.id}
                        onClick={() => {
                            setCurrentScriptVersion(version.id);
                            setScriptVersionSelectorIsActive(false);
                        }}
                    >
                        {version.name}
                    </ButtonBox>
                ))}
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        margin-top: 12px;
                    `}
                >
                    <div
                        className={css`
                            position: relative;
                            flex-grow: 1;
                        `}
                    >
                        <Input
                            onChange={(e) => {
                                setNewVersionName(e.target.value);
                            }}
                            onEnter={addNewVersion}
                            value={newVersionName}
                            placeholder="Введите название чина…"
                            autoFocus
                        />
                        <Button
                            onClick={() => {
                                setNewVersionName('');
                            }}
                            className={css`
                                position: absolute;
                                right: 0;
                                font-size: 14px;
                                margin-left: 0px;
                            `}
                        >
                            <Cross />
                        </Button>
                    </div>
                    <Button onClick={addNewVersion}>
                        <PlusIcon width={16} />
                    </Button>
                </div>
            </>
        </Drawer>
    ) : (
        <button
            aria-label="меню"
            className={`${css`
                border-radius: 5px;
                padding: 8px 6px;
                text-align: center;
                background: ${theme.colours.bgGray};
                font-size: 14px;
                line-height: 1.1;
                color: ${theme.colours.darkGray};
                margin-right: 6px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                display: inline-block;
                border: 0;
                appearance: none;
                &::-ms-expand {
                    display: none;
                }
                &:hover {
                    opacity: 0.8;
                    cursor: pointer;
                }
                &:focus {
                    outline: none;
                    opacity: 0.8;
                }
                & option {
                    font-weight: normal;
                }
            `}`}
            type="button"
            onClick={() => {
                setScriptVersionSelectorIsActive(!scriptVersionSelectorIsActive);
                toggleOpen();
            }}
        >
            <span>{currentScriptVersionName}</span>
        </button>
    );
};

export default ScriptVersionSelector;
