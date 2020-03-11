import React from 'react';
import liturgyTOC from './Texts/liturgyTOC';
import SelectBox from '../../components/SelectBox/SelectBox';
import { css } from 'emotion';

const TOCSwitcher = () => {
    const items = Object.keys(liturgyTOC).map(item => ({
        value: item,
        label: liturgyTOC[item],
    }));
    let maxWidth = 5;
    if (window.screen.width >= 340) {
        maxWidth = 8;
    }
    if (window.screen.width >= 360) {
        maxWidth = 10;
    }
    if (window.screen.width >= 380) {
        maxWidth = 13;
    }
    if (window.screen.width >= 400) {
        maxWidth = 17;
    }
    return (
        <SelectBox
            className={css`
                flex-shrink: 1;
            `}
            maxLength={maxWidth}
            items={items}
            value={null}
            onChange={anchorID => {
                const domNode = document.getElementById(anchorID);
                if (domNode) {
                    domNode.scrollIntoView({ block: 'center' });
                }
            }}
        />
    );
};
export default TOCSwitcher;
