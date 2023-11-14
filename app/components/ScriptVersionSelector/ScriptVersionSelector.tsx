import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Button from 'components/Button/Button';
import Drawer from 'components/Drawer/Drawer';
import Input from 'components/Input/Input';
import scriptVersionSelectorIsActiveState from 'state/scriptVersionSelectorIsActiveState';
import { useRecoilState } from 'recoil';
import scriptVersionsState from 'state/scriptVersionsState';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import currentScriptVersionState from 'state/currentScriptVersion';
import PlusIcon from 'components/svgs/PlusIcon';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import TrashIcon from 'components/svgs/TrashIcon';
import SectionHeading from 'containers/Main/SectionHeading';
import Pencil from 'components/svgs/Pencil';

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
    const [_, setScriptEditorIsActive] = useRecoilState(scriptEditorIsActiveState);

    const addNewVersion = () => {
        if (newVersionName) {
            const version = `v${new Date().getTime()}`;
            setScriptVersions([...(scriptVersions || []), { name: newVersionName, id: version }]);
            setCurrentScriptVersion(version);
            setNewVersionName('');
            setScriptEditorIsActive(true);
            setScriptVersionSelectorIsActive(false);
        } else {
            alert('Введите название чина');
        }
    };

    return scriptVersionSelectorIsActive ? (
        <Drawer onClose={() => setScriptVersionSelectorIsActive(false)}>
            <>
                <SectionHeading
                    className={css`
                        text-align: center;
                        padding-top: 0px;
                        padding-bottom: 24px;
                    `}
                >
                    Чинопоследования
                </SectionHeading>
                <ButtonBox
                    onClick={() => {
                        setCurrentScriptVersion(null);
                        setScriptVersionSelectorIsActive(false);
                    }}
                    className={css`
                        border: ${null === currentScriptVersion ? `2px solid ${theme.colours.primary}` : undefined};
                    `}
                >
                    Исходное чинопоследование
                </ButtonBox>
                {scriptVersions.map((version) => (
                    <ButtonBox
                        id={version.id}
                        onClick={() => {
                            setCurrentScriptVersion(version.id);
                            setScriptVersionSelectorIsActive(false);
                            setScriptEditorIsActive(false);
                        }}
                        className={css`
                            border: ${version.id === currentScriptVersion
                                ? `2px solid ${theme.colours.primary}`
                                : undefined};
                        `}
                    >
                        <div
                            className={css`
                                display: flex;
                            `}
                        >
                            <div
                                className={css`
                                    flex-grow: 1;
                                `}
                            >
                                {version.name}
                            </div>

                            <div
                                className={css`
                                    flex-grow: 0;
                                    flex-shrink: 0;
                                    margin-right: 15px;
                                `}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    setCurrentScriptVersion(version.id);
                                    setScriptVersionSelectorIsActive(false);
                                    setScriptEditorIsActive(true);
                                }}
                            >
                                <Pencil />
                            </div>

                            <div
                                className={css`
                                    flex-grow: 0;
                                    flex-shrink: 0;
                                `}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    setScriptVersions(scriptVersions.filter((i) => i.id !== version.id));
                                    if (version.id === currentScriptVersion) {
                                        setCurrentScriptVersion(null);
                                    }
                                }}
                            >
                                <TrashIcon />
                            </div>
                        </div>
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
            }}
        >
            <span>{currentScriptVersionName}</span>
        </button>
    );
};

export default ScriptVersionSelector;
