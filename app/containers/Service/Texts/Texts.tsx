import { getFeastInfo, makeIsDate, makeIsEasterOffsetRange } from 'domain/getDayInfo';

import liturgyTOC from './Liturgies/TOC';
import lpodTOC from './Lpod/TOC';
import matinsTOC from './Matins/TOC';
import vespersTOC from './Vespers/TOC';

// New texts must be put into `Texts/ServiceIdUppercase/index.dyn.tsx` and then added here

const makeServices = (date, readings = {}) => {
    const { vasiliy, lpod } = getFeastInfo(new Date(date));

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const isDate = makeIsDate(date);

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
            warn: true,
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
            warn: true,
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
            warn: true,
        },

        {
            title: 'Пасхальные часы',
            id: 'easterHours',
            enabled: isEasterOffsetRange(0, 6),
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Третий час',
            id: 'thirdHour',
            enabled: !isEasterOffsetRange(0, 6) && !isDate(1, 6) && !isDate(1, 19),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Шестой час',
            id: 'sixthHour',
            enabled: !isEasterOffsetRange(0, 6) && !isDate(1, 6) && !isDate(1, 19),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
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
            warn: true,
        },
        {
            title: 'Полуночница',
            id: 'polunochnica',
            enabled: !isDate(1, 6) && !isDate(1, 18),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },

        {
            title: 'Лития',
            id: 'litiya',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Требы',
            warn: true,
        },
        {
            title: 'Молитва о жертвах советских репрессий',
            id: 'molitvaPamyati',
            enabled: true,
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Требы',
            warn: false,
        },

        {
            title: 'Утреня братским чином',
            id: 'matins',
            enabled: true,
            calendar: true,
            lang: false,
            skipRedirect: true,
            group: 'Домашняя молитва',
            TOC: matinsTOC,
            warn: false,
        },
        {
            title: 'Вечерня братским чином',
            id: 'vespers',
            enabled: !isEasterOffsetRange(49),
            calendar: true,
            lang: false,
            skipRedirect: true,
            group: 'Домашняя молитва',
            TOC: vespersTOC,
            warn: false,
        },
        {
            title: 'Покаянный канон',
            id: 'pokajanni',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
            warn: false,
        },
        {
            title: 'Чин приготовления',
            id: 'chinPrigotovlenija',
            enabled: true,
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
            warn: false,
        },
        {
            title: 'Благодарственные молитвы',
            id: 'blagodarstvennie',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
            warn: false,
        },
        {
            title: 'Молитвы перед и после еды',
            id: 'molitvaTrapeza',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
            warn: false,
        },
    ];
};
export default makeServices;
