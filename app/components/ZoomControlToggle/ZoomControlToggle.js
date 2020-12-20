import React, { useContext } from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';
import zoomControlShownState from 'state/zoomControlShownState';
import { useSetRecoilState } from 'recoil';

const ZoomControlToggle = () => {
    const theme = useTheme();
    const { toggleOpen } = useContext(DotsMenuContext);
    const setZoomControlShown = useSetRecoilState(zoomControlShownState);

    return (
        <Button
            title="Изменить шрифт"
            onClick={() => {
                setZoomControlShown(true);
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
                Aa
            </span>{' '}
            <span
                className={css`
                    font-size: 13px;
                `}
            >
                Изменить шрифт
            </span>
        </Button>
    );
};
export default ZoomControlToggle;
