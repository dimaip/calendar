import React from 'react';
import Button from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { toggleZoomControl } from 'redux/actions/zoom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const ZoomControlToggle = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
        <Button
            onClick={() => dispatch(toggleZoomControl())}
            className={css`
                padding: 10px 18px;
                font-size: 16px;
                color: ${theme.colours.darkGray};
            `}
        >
            Aa
        </Button>
    );
};
export default ZoomControlToggle;
