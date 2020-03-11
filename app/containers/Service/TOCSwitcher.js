import React from 'react';
import liturgyTOC from './Texts/liturgyTOC';
import SelectBox from '../../components/SelectBox/SelectBox';
import { css } from 'emotion';

const TOCSwitcher = () => {
    const items = Object.keys(liturgyTOC).map(item => ({
        value: item,
        label: liturgyTOC[item],
    }));
    return (
        <SelectBox
            className={css`
                flex-shrink: 1;
                max-width: 70px;
                @media (min-width: 340px) {
                    max-width: 80px;
                }
                @media (min-width: 360px) {
                    max-width: 100px;
                }
                @media (min-width: 380px) {
                    max-width: 120px;
                }
                @media (min-width: 400px) {
                    max-width: 140px;
                }
            `}
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
