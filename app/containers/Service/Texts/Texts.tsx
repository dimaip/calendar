import { getFeastInfo, makeIsEasterOffsetRange } from 'domain/getDayInfo';

import liturgyTOC from './Liturgies/TOC';
import lpodTOC from './Lpod/TOC';
import matinsTOC from './Matins/TOC';
import vespersTOC from './Vespers/TOC';

// New texts must be put into `Texts/ServiceIdUppercase/index.dyn.tsx` and then added here

const makeServices = (date, readings = {}) => {
    const { vasiliy, lpod } = getFeastInfo(new Date(date));

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);

    return [
        {
            title: 'Литургия Иоанна Златоуста',
            id: 'zlatoust',
            enabled: readings['Литургия'] && !vasiliy && !lpod,
            calendar: true,
            lang: true,
            skipRedirect: false,
            group: 'Богослужебные тексты',
            TOC: liturgyTOC,
        },
        {
            title: 'Литургия Василия Великого',
            id: 'vasiliy',
            enabled: readings['Литургия'] && vasiliy,
            calendar: true,
            lang: true,
            skipRedirect: false,
            group: 'Богослужебные тексты',
            TOC: liturgyTOC,
        },
        {
            title: 'Литургия преждеосвященных даров',
            id: 'lpod',
            enabled: readings['Вечерня'] && lpod,
            calendar: true,
            lang: true,
            skipRedirect: false,
            group: 'Богослужебные тексты',
            TOC: lpodTOC,
        },
        {
            title: 'Великая вечерня',
            id: 'vespersChurch',
            enabled: isEasterOffsetRange(49),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Богослужебные тексты',
            TOC: vespersTOC,
        },
        {
            title: 'Канон Пасхи',
            id: 'easterKanon',
            enabled:
                isEasterOffsetRange(0, 6) ||
                isEasterOffsetRange(7 * 2) ||
                isEasterOffsetRange(7 * 3) ||
                isEasterOffsetRange(7 * 4) ||
                isEasterOffsetRange(7 * 5) ||
                isEasterOffsetRange(38),
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Богослужебные тексты',
        },
        {
            title: 'Пасхальные часы',
            id: 'easterHours',
            enabled: isEasterOffsetRange(0, 6),
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Богослужебные тексты',
        },
        {
            title: 'Благодарственные молитвы',
            id: 'blagodarstvennie',
            enabled: true,
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Богослужебные тексты',
        },
        {
            title: 'Покаянный канон',
            id: 'pokajanni',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Богослужебные тексты',
        },
        {
            title: 'Чин приготовления',
            id: 'chinPrigotovlenija',
            enabled: true,
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Богослужебные тексты',
        },
        {
            title: 'Краткая утреня',
            id: 'matins',
            enabled: true,
            calendar: true,
            lang: false,
            skipRedirect: true,
            group: 'Домашнее молитвенное правило',
            TOC: matinsTOC,
        },
        {
            title: 'Краткая вечерня',
            id: 'vespers',
            enabled: !isEasterOffsetRange(49),
            calendar: true,
            lang: false,
            skipRedirect: true,
            group: 'Домашнее молитвенное правило',
            TOC: vespersTOC,
        },
    ];
};
export default makeServices;
