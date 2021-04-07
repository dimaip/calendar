import React from 'react';
import Button from 'components/Button/Button';
import { css } from 'emotion';
import Drawer from 'components/Drawer/Drawer';
import zoomControlShownState from 'state/zoomControlShownState';
import zoomState from 'state/zoomState';
import { useRecoilState } from 'recoil';

const buttonStyle = css`
    width: 70px;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
    border: 1px solid #d9dde5;
    border-radius: 8px;
    margin: 12px;
    padding: 0 !important;
`;
const ZoomControl = (): JSX.Element | null => {
    const [zoomControlShown, setZoomControlShown] = useRecoilState(zoomControlShownState);
    const [zoom, setZoom] = useRecoilState(zoomState);

    return zoomControlShown ? (
        <Drawer
            onClose={() => {
                setZoomControlShown(false);
            }}
        >
            <div
                className={css`
                    text-align: center;
                    font-size: 24px;
                `}
            >
                {zoom >= 1 ? (zoom * 100).toPrecision(3) : (zoom * 100).toPrecision(2)}%
            </div>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `}
            >
                <Button
                    title="Уменьшить шрифт"
                    className={css`
                        ${buttonStyle}
                        font-size: 14px;
                    `}
                    onClick={() => zoom > 0.8 && setZoom(zoom - 0.1)}
                >
                    A-
                </Button>
                <Button
                    title="Увеличить шрифт"
                    className={css`
                        ${buttonStyle}
                        font-size: 18px;
                    `}
                    onClick={() => zoom < 1.5 && setZoom(zoom + 0.1)}
                >
                    A+
                </Button>
            </div>
        </Drawer>
    ) : null;
};
export default ZoomControl;
