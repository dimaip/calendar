import React, { useContext } from 'react';
import { css } from 'emotion';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';
import Button from 'components/Button/Button';
import Gear from 'components/svgs/Gear';
import { useRecoilState } from 'recoil';
import menuShownState from 'state/menuShownState';

const Share = () => {
    const { toggleOpen } = useContext(DotsMenuContext);
    const [menuShown, setMenuShown] = useRecoilState(menuShownState);
    return (
        <Button
            title="Меню"
            onClick={() => {
                toggleOpen();
                setMenuShown(!menuShown);
            }}
            className={css`
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
            `}
        >
            <Gear />{' '}
            <span
                className={css`
                    font-size: 13px;
                    line-height: 18px;
                    vertical-align: text-top;
                `}
            >
                Настройки
            </span>
        </Button>
    );
};
export default Share;
