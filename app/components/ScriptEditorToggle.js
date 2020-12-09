import React from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Pencil from 'components/svgs/Pencil';
import { useSetRecoilState } from 'recoil';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';

const ScriptEditorToggle = () => {
    const theme = useTheme();
    const setScriptEditorIsActive = useSetRecoilState(scriptEditorIsActiveState);

    return (
        <Button
            title="Редактировать чин"
            onClick={() => {
                setScriptEditorIsActive(true);
            }}
            className={css`
                padding: 12px !important;
                margin-right: 6px;
                font-size: 16px;
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
                border-bottom: 1px solid ${theme.colours.lineGray};
            `}
        >
            <span
                className={css`
                    color: ${theme.colours.gray};
                    display: inline-block;
                    width: 20px;
                `}
            >
                <Pencil />
            </span>{' '}
            <span
                className={css`
                    font-size: 13px;
                `}
            >
                Редактировать чин
            </span>
        </Button>
    );
};
export default ScriptEditorToggle;
