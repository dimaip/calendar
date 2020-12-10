import React, { useContext } from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Pencil from 'components/svgs/Pencil';
import { useRecoilState } from 'recoil';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';

const ScriptEditorToggle = () => {
    const theme = useTheme();
    const { toggleOpen } = useContext(DotsMenuContext);
    const [scriptEditorIsActive, setScriptEditorIsActive] = useRecoilState(scriptEditorIsActiveState);
    const label = scriptEditorIsActive ? 'Завершить редактирование' : 'Редактировать чин';

    return (
        <Button
            title={label}
            onClick={() => {
                setScriptEditorIsActive(!scriptEditorIsActive);
                toggleOpen();
            }}
            className={css`
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
                {label}
            </span>
        </Button>
    );
};
export default ScriptEditorToggle;
