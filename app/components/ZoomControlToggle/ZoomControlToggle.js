import React from 'react';
import Button from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleZoomControl } from 'redux/actions/zoom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const ZoomControlToggle = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const zoomControlShown = useSelector(state => state.ui.zoomControlShown);
    return (
        <Button
            title="Изменить шрифт"
            onClick={() => dispatch(toggleZoomControl())}
            className={css`
                padding: 6px 6px !important;
                margin-right: 6px;
                font-size: 16px;
                border-radius: 8px;
                color: ${zoomControlShown ? 'white' : theme.colours.darkGray};
                background-color: ${zoomControlShown ? 'gray' : 'white'};
            `}
        >
            Aa
        </Button>
    );
};
export default ZoomControlToggle;
