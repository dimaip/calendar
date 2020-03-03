import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'components/Button/Button';
import { setZoom } from 'redux/actions/zoom';
import { css } from 'emotion';
import Drawer from 'components/Drawer/Drawer';
import { toggleZoomControl } from 'redux/actions/zoom';

const buttonStyle = css`
    width: 70px;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
    border: 1px solid #d9dde5;
    border-radius: 3px;
    margin: 12px;
    padding: 0 !important;
`;
const ZoomControl = () => {
    const zoom = useSelector(state => state.settings.zoom);
    const zoomControlShown = useSelector(state => state.ui.zoomControlShown);
    const dispatch = useDispatch();
    return (
        zoomControlShown && (
            <Drawer onClose={() => dispatch(toggleZoomControl())}>
                <div
                    className={css`
                        text-align: center;
                        font-size: 24px;
                    `}
                >
                    {(zoom * 100).toPrecision(3)}%
                </div>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    `}
                >
                    <Button
                        className={css`
                            ${buttonStyle}
                            font-size: 14px;
                        `}
                        onClick={() => dispatch(setZoom((zoom - 0.1).toPrecision(2)))}
                    >
                        A-
                    </Button>
                    <Button
                        className={css`
                            ${buttonStyle}
                            font-size: 18px;
                        `}
                        onClick={() => dispatch(setZoom((zoom + 0.1).toPrecision(2)))}
                    >
                        A+
                    </Button>
                </div>
            </Drawer>
        )
    );
};
export default ZoomControl;
