import React, { useContext } from 'react';
import { css } from 'emotion';
import FindInPage from '@material-ui/icons/FindInPage';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';
import Button from 'components/Button/Button';
import { useTheme } from 'emotion-theming';

export const FindInPageButton = ({ onOpen }: { onOpen: () => void }) => {
    const { toggleOpen } = useContext(DotsMenuContext);
    const theme = useTheme();
    return (
        <Button
            title="Найти…"
            onClick={() => {
                toggleOpen();
                onOpen();
            }}
            className={css`
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
            `}
        >
            <FindInPage htmlColor={theme.colours.gray} style={{ marginLeft: -2, marginRight: -2 }} />{' '}
            <span
                className={css`
                    font-size: 13px;
                    line-height: 18px;
                    vertical-align: super;
                `}
            >
                Найти…
            </span>
        </Button>
    );
};
