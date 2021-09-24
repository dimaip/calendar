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
            group: 'Литургия',
            TOC: liturgyTOC,
        },
        {
            title: 'Литургия Василия Великого',
            id: 'vasiliy',
            enabled: readings['Литургия'] && vasiliy,
            calendar: true,
            lang: true,
            skipRedirect: false,
            group: 'Литургия',
            TOC: liturgyTOC,
        },
        {
            title: 'Литургия преждеосвященных даров',
            id: 'lpod',
            enabled: readings['Вечерня'] && lpod,
            calendar: true,
            lang: true,
            skipRedirect: false,
            group: 'Литургия',
            TOC: lpodTOC,
        },

        {
            title: 'Пасхальные часы',
            id: 'easterHours',
            enabled: isEasterOffsetRange(0, 6),
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Часослов',
        },
        {
            title: 'Третий час',
            id: 'thirdHour',
            enabled: !isEasterOffsetRange(0, 6),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
        },
        {
            title: 'Шестой час',
            id: 'sixthHour',
            enabled: !isEasterOffsetRange(0, 6),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
        },
        {
            title: 'Великая вечерня',
            id: 'vespersChurch',
            enabled: isEasterOffsetRange(49),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            TOC: vespersTOC,
        },
        {
            title: 'Полуночница',
            id: 'polunochnica',
            enabled: true,
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
        },

        // {
        //     title: 'Молитва о жертвах советских репрессий',
        //     id: 'molitvaPamyati',
        //     enabled: true,
        //     calendar: false,
        //     lang: false,
        //     skipRedirect: true,
        //     group: 'Требы',
        // },

        {
            title: 'Краткая утреня',
            id: 'matins',
            enabled: true,
            calendar: true,
            lang: false,
            skipRedirect: true,
            group: 'Домашняя молитва',
            TOC: matinsTOC,
        },
        {
            title: 'Краткая вечерня',
            id: 'vespers',
            enabled: !isEasterOffsetRange(49),
            calendar: true,
            lang: false,
            skipRedirect: true,
            group: 'Домашняя молитва',
            TOC: vespersTOC,
        },
        {
            title: 'Покаянный канон',
            id: 'pokajanni',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
        },
        {
            title: 'Чин приготовления',
            id: 'chinPrigotovlenija',
            enabled: true,
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
        },
        {
            title: 'Благодарственные молитвы',
            id: 'blagodarstvennie',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
        },
    ];
};
export default makeServices;
