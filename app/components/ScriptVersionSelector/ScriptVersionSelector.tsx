import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useRecoilState } from 'recoil';
import Button from 'components/Button/Button';
import Drawer from 'components/Drawer/Drawer';
import Input from 'components/Input/Input';
import scriptVersionSelectorIsActiveState from 'state/scriptVersionSelectorIsActiveState';
import scriptVersionsState from 'state/scriptVersionsState';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import currentScriptVersionState from 'state/currentScriptVersion';
import SectionHeading from 'containers/Main/SectionHeading';
import Switch from 'components/svgs/Switch';

import { useAddNewVersion } from './useAddNewVersion';
import { ScriptVersion } from './ScriptVersion';

const ScriptVersionSelector = ({ serviceId }: { serviceId: string }) => {
    const theme = useTheme();
    const [scriptVersionSelectorIsActive, setScriptVersionSelectorIsActive] = useRecoilState(
        scriptVersionSelectorIsActiveState
    );
    const [scriptVersions] = useRecoilState(scriptVersionsState(serviceId));
    const [currentScriptVersion, setCurrentScriptVersion] = useRecoilState(currentScriptVersionState(serviceId));
    const [newVersionName, setNewVersionName] = useState('');

    const addNewVersionOriginal = useAddNewVersion(serviceId);

    const addNewVersion = () => {
        addNewVersionOriginal(newVersionName);
        setNewVersionName('');
    };

    return (
        <>
            {scriptVersionSelectorIsActive && (
                <Drawer onClose={() => setScriptVersionSelectorIsActive(false)}>
                    <>
                        <SectionHeading
                            className={css`
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
                                border: ${currentScriptVersion === null
                                    ? `2px solid ${theme.colours.primary}`
                                    : undefined};
                            `}
                        >
                            Исходное чинопоследование
                        </ButtonBox>
                        {scriptVersions.map((version) => (
                            <ScriptVersion key={version.id} version={version} serviceId={serviceId} />
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
                                    className="scriptVersionSelector-input"
                                />
                            </div>
                            <Button
                                onClick={addNewVersion}
                                className={css`
                                    border-radius: 5px;
                                    padding: 12px 12px;
                                    text-align: center;
                                    background: ${theme.colours.primary};
                                    margin-left: 8px;
                                    font-size: 14px;
                                    color: white;
                                `}
                            >
                                Добавить
                            </Button>
                        </div>
                    </>
                </Drawer>
            )}
            <button
                aria-label="меню"
                className={`scriptVersionSelector ${css`
                    border-radius: 5px;
                    padding: 7px;
                    padding-bottom: 3px;
                    text-align: center;
                    background: ${currentScriptVersion ? theme.colours.primary : theme.colours.bgGray};
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
                <span>
                    <Switch colour={currentScriptVersion ? 'white' : undefined} />
                </span>
            </button>
        </>
    );
};

export default ScriptVersionSelector;
