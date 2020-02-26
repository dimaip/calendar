import React from 'react';
import Button from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { toggleZoomControl } from 'redux/actions/zoom';
import { css } from 'emotion';

const ZoomControlToggle = () => {
    const dispatch = useDispatch();
    return (
        <Button
            onClick={() => dispatch(toggleZoomControl())}
            className={css`
                padding: 10px 18px;
                font-size: 16px;
                color: #000000;
            `}
        >
            Aa
        </Button>
    );
};
export default ZoomControlToggle;
