import React from 'react';
import { css } from 'emotion';
import { useRecoilState } from 'recoil';
import langState from 'state/langState';

import SelectBox from '../../components/SelectBox/SelectBox';

/**
 * When switching a language, save the first heading in view and scroll down to it when the rendering is finished.
 * Yes, this is about as dirty hack as you'll ever see, feel free to refactor if you got time to spare
 */
const restoreScroll = (): void => {
    const allHeadings = Array.from(document.querySelectorAll('.H1,.H2,.H3,.H4'));
    // First element in or below view, if none found choose the last element
    const firstElementInView =
        allHeadings.find((el) => {
            const rect = el.getBoundingClientRect();
            return rect.top >= 0;
        }) || allHeadings[allHeadings.length - 1];
    // Take its text to look for the same heading after render
    const headingText = firstElementInView?.textContent;
    let step = 0;
    const callback = (): void => {
        if (headingText) {
            // Find a heading with the same text as the saved one
            const allHeadings = Array.from(document.querySelectorAll('.H1,.H2,.H3,.H4')).find(
                (el) => el.textContent === headingText
            );
            const boundingBox = allHeadings?.getBoundingClientRect();
            // If the element hasn't been rendered yet, wait 100ms more
            if (!(boundingBox && boundingBox?.top > 0) && step < 10) {
                // eslint-disable-next-line no-console
                console.log('Element not rendered yet, trying again in 100ms', step);
                step++;
                setTimeout(callback, 100);
            } else {
                allHeadings?.scrollIntoView({ block: 'center' });
            }
        }
    };
    setTimeout(callback, 150);
};

const serviceLanguages = [
    {
        value: 'ru',
        label: 'РУС',
    },
    {
        value: 'csj',
        label: 'ЦСЯ',
    },
    {
        value: 'parallel',
        label: 'Параллельно',
    },
];

const LanguageSwitcher = () => {
    const [langStateValue, setLang] = useRecoilState(langState);
    return (
        <SelectBox
            className={css`
                max-width: 59px;
            `}
            items={serviceLanguages}
            value={langStateValue.lang}
            onChange={(lang) => {
                restoreScroll();
                setLang({ ...langStateValue, lang: lang });
            }}
        />
    );
};
export default LanguageSwitcher;
