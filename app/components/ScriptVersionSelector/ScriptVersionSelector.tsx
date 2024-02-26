import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useRecoilState } from 'recoil';
import { useAuth } from 'oidc-react';
import Button from 'components/Button/Button';
import Drawer from 'components/Drawer/Drawer';
import Input from 'components/Input/Input';
import scriptVersionSelectorIsActiveState from 'state/scriptVersionSelectorIsActiveState';
import scriptVersionsState from 'state/scriptVersionsState';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import TrashIcon from 'components/svgs/TrashIcon';
import SectionHeading from 'containers/Main/SectionHeading';
import Pencil from 'components/svgs/Pencil';
import Switch from 'components/svgs/Switch';
import DotsMenu from 'components/DotsMenu/DotsMenu';
import Share from 'components/Share/Share';
import ShareLogin from 'components/Share/ShareLogin';

import { useAddNewVersion } from './useAddNewVersion';

const ScriptVersionSelector = ({ serviceId }) => {
    const theme = useTheme();
    const [scriptVersionSelectorIsActive, setScriptVersionSelectorIsActive] = useRecoilState(
        scriptVersionSelectorIsActiveState
    );
    const [scriptVersions, setScriptVersions] = useRecoilState<boolean>(scriptVersionsState(serviceId));
    const [currentScriptVersion, setCurrentScriptVersion] = useRecoilState<string | null>(
        currentScriptVersionState(serviceId)
    );
    const [newVersionName, setNewVersionName] = useState('');
    const [_, setScriptEditorIsActive] = useRecoilState(scriptEditorIsActiveState);
    const auth = useAuth();
    const userId = auth.userData?.profile?.sub;

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
                            <ButtonBox
                                key={version.id}
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
                                            margin-top: 3px;
                                        `}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();

                                            setCurrentScriptVersion(version.id);
                                            setScriptVersionSelectorIsActive(false);
                                            setScriptEditorIsActive(true);
                                        }}
                                    >
                                        <Pencil colour={theme.colours.primary} />
                                    </div>

                                    <div style={{ marginTop: -12, marginBottom: -12 }}>
                                        <DotsMenu className="scriptVersionSelector-dotsMenu">
                                            <Button
                                                className={css`
                                                    padding: 6px 6px !important;
                                                    width: 100%;
                                                    text-align: left;
                                                `}
                                                onClick={() => {
                                                    setScriptVersions(
                                                        scriptVersions.filter((i) => i.id !== version.id)
                                                    );
                                                    if (version.id === currentScriptVersion) {
                                                        setCurrentScriptVersion(null);
                                                    }
                                                }}
                                            >
                                                <span
                                                    className={css`
                                                        font-size: 13px;
                                                    `}
                                                >
                                                    <TrashIcon size={20} colour={theme.colours.gray} /> Удалить
                                                </span>
                                            </Button>
                                            {userId ? (
                                                <div>
                                                    <Share
                                                        className="scriptVersionSelector-share"
                                                        title={version.name}
                                                        url={`${process.env.PUBLIC_URL}/share/${btoa(
                                                            JSON.stringify({
                                                                userId,
                                                                serviceId,
                                                                versionId: version.id,
                                                            })
                                                        )}`}
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <ShareLogin className="scriptVersionSelector-share" />
                                                </div>
                                            )}
                                        </DotsMenu>
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
