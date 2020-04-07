import React from 'react';
import liturgyTOC from './Texts/liturgyTOC';
import lpodTOC from './Texts/lpodTOC';
import SelectBox from '../../components/SelectBox/SelectBox';
import { css } from 'emotion';

const mapServiceTOC = {
    zlatoust: liturgyTOC,
    vasiliy: liturgyTOC,
    lpod: lpodTOC,
};

const TOCSwitcher = ({ serviceId }) => {
    const data = mapServiceTOC[serviceId];
    if (!data) {
        return null;
    }
    const items = Object.keys(data).map(item => ({
        value: item,
        label: data[item],
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
            value={''}
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
