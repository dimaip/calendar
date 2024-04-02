import scriptVersionsState, { Version } from 'state/scriptVersionsState';
import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useRecoilState } from 'recoil';
import { useAuth } from 'oidc-react';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import scriptVersionSelectorIsActiveState from 'state/scriptVersionSelectorIsActiveState';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import TrashIcon from 'components/svgs/TrashIcon';
import DotsMenu from 'components/DotsMenu/DotsMenu';
import Share from 'components/Share/Share';
import ShareLogin from 'components/Share/ShareLogin';
import PencilLine from 'components/svgs/PencilLine';
import Check from 'components/svgs/Check';
import Pencil from 'components/svgs/Pencil';

import { DuplicateButton } from './DuplicateButton';

export const ScriptVersion = ({ version, serviceId }: { version: Version; serviceId: string }) => {
    const theme = useTheme();
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(version.name);

    const [_scriptVersionSelectorIsActive, setScriptVersionSelectorIsActive] = useRecoilState(
        scriptVersionSelectorIsActiveState
    );
    const [scriptVersions, setScriptVersions] = useRecoilState(scriptVersionsState(serviceId));
    const [currentScriptVersion, setCurrentScriptVersion] = useRecoilState(currentScriptVersionState(serviceId));
    const [_, setScriptEditorIsActive] = useRecoilState(scriptEditorIsActiveState);
    const auth = useAuth();
    const userId = auth.userData?.profile?.sub;

    const saveNameHandler = () => {
        setScriptVersions([
            ...(scriptVersions || []).filter((v) => v.id !== version?.id),
            {
                ...version,
                name: newName,
            },
        ]);
        setEditMode(false);
    };

    return (
        <ButtonBox
            key={version.id}
            onClick={() => {
                if (!editMode) {
                    setCurrentScriptVersion(version.id);
                    setScriptVersionSelectorIsActive(false);
                    setScriptEditorIsActive(false);
                }
            }}
            className={css`
                border: ${version.id === currentScriptVersion ? `2px solid ${theme.colours.primary}` : undefined};
                padding: ${editMode ? 0 : 12}px;
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
                    {editMode ? (
                        <div
                            className={css`
                                margin-top: 8px;
                                margin-bottom: 8px;
                                margin-left: 8px;
                                margin-right: 8px;
                            `}
                        >
                            <Input
                                onChange={(e) => {
                                    setNewName(e.target.value);
                                }}
                                value={newName}
                                onEnter={saveNameHandler}
                                placeholder="Введите название чина…"
                                autoFocus
                                style={{ padding: 8 }}
                            />
                        </div>
                    ) : (
                        version.name
                    )}
                </div>

                <Button
                    className={css`
                        flex-grow: 0;
                        flex-shrink: 0;
                        margin-right: 4px;
                        margin-top: 3px;
                        padding: 0;
                    `}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (version.sourceUserId) {
                            alert(
                                'Этим чином с вами поделились. Скопируйте его чтобы иметь возможность редактировать.'
                            );
                        } else {
                            setEditMode(!editMode);
                        }
                    }}
                >
                    {editMode ? (
                        <Check colour={version.sourceUserId ? theme.colours.lightGray : theme.colours.primary} />
                    ) : (
                        <PencilLine colour={version.sourceUserId ? theme.colours.lightGray : theme.colours.primary} />
                    )}
                </Button>

                <div style={editMode ? { marginTop: 0, marginBottom: 0 } : { marginTop: -12, marginBottom: -12 }}>
                    <DotsMenu className="scriptVersionSelector-dotsMenu">
                        <Button
                            className={css`
                                padding: 6px 6px !important;
                                width: 100%;
                                text-align: left;
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if (version.sourceUserId) {
                                    alert(
                                        'Этим чином с вами поделились. Скопируйте его чтобы иметь возможность редактировать.'
                                    );
                                } else {
                                    setCurrentScriptVersion(version.id);
                                    setScriptVersionSelectorIsActive(false);
                                    setScriptEditorIsActive(true);
                                }
                            }}
                        >
                            <span
                                className={css`
                                    font-size: 13px;
                                `}
                            >
                                <Pencil
                                    size={20}
                                    colour={theme.colours.gray}
                                    style={{ verticalAlign: 'text-bottom', marginRight: 3 }}
                                />{' '}
                                Редактировать
                            </span>
                        </Button>

                        {userId ? (
                            <div>
                                <Share
                                    className="scriptVersionSelector-share"
                                    title={version.name}
                                    url={`${process.env.PUBLIC_URL}/#/share/${btoa(
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

                        <DuplicateButton serviceId={serviceId} version={version} />

                        <Button
                            className={css`
                                padding: 6px 6px !important;
                                width: 100%;
                                text-align: left;
                            `}
                            onClick={(e) => {
                                e.stopPropagation();
                                setScriptVersions(scriptVersions.filter((i) => i.id !== version.id));
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
                                <TrashIcon
                                    size={20}
                                    colour={theme.colours.gray}
                                    style={{ verticalAlign: 'text-bottom', marginRight: 3 }}
                                />{' '}
                                Удалить
                            </span>
                        </Button>
                    </DotsMenu>
                </div>
            </div>
        </ButtonBox>
    );
};
