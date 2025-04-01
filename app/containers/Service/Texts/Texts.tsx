import { getFeastInfo, makeIsDate, makeIsEasterOffsetRange } from 'domain/getDayInfo';
import { useRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';

export const bratMolitvoslovPrayers = [
    // {
    //     value: 'RealRussia',
    //     label: 'Молитва об обретении настоящей России, её возрождении и спасении',
    // },
    {
        value: 'PravdaMir',
        label: 'Молитва о правде и мире',
    },
    {
        value: 'BratEdinstvo',
        label: 'Молитва о братском единстве еп. Макария (Опоцкого)',
    },
    {
        value: 'ChurchCountry',
        label: 'Молитва Господу о церкви и стране',
    },
    {
        value: 'Neplyuev',
        label: 'Молитва Н. Н. Неплюева о братстве',
    },
    {
        value: 'Opotsky1',
        label: 'Молитва о созидании Тела Церкви Христовой, об исполнении Нового Завета в Крови Его',
    },
    {
        value: 'Opotsky2',
        label: 'Молитва пред вкушением святого Хлеба и Чаши благословения',
    },
    {
        value: 'Opotsky3',
        label: 'Молитва перед Причастием (с особыми прошениями)',
    },
];

interface ServiceInfo {
    title: string;
    id: string;
    enabled: boolean;
    calendar: boolean;
    lang: boolean;
    skipRedirect: boolean;
    group: string;
    warn: boolean;
}

// New texts must be put into `Texts/ServiceIdUppercase/index.dyn.tsx` and then added here

const useServices = (date, readings = {}): ServiceInfo[] => {
    const { vasiliy, lpod } = getFeastInfo(new Date(date));

    const [customPrayers] = useRecoilState(customPrayersState('Sugubaja'));

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const isDate = makeIsDate(date);

    return [
        {
            title: 'Входные молитвы и облачение. Проскомидия',
            id: 'vhodOblachenie',
            enabled: Boolean(readings['Литургия'] || lpod),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Литургия',
            warn: true,
        },
        {
            title: 'Литургия Иоанна Златоуста',
            id: 'zlatoust',
            enabled: readings['Литургия'] && !vasiliy && !lpod,
            calendar: true,
            lang: true,
            skipRedirect: false,
            group: 'Литургия',
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
            warn: true,
        },

        {
            title: 'Пасхальное богослужение',
            id: 'easterChin',
            enabled: isEasterOffsetRange(0),
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Пасхальные часы',
            id: 'easterHours',
            enabled: isEasterOffsetRange(0, 6),
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Утреня',
            id: 'matinsObihod',
            enabled: isEasterOffsetRange(0),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Третий час',
            id: 'thirdHour',
            enabled: !isEasterOffsetRange(0, 6) && !isDate(1, 6) && !isDate(1, 18),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Шестой час',
            id: 'sixthHour',
            enabled: !isEasterOffsetRange(0, 6) && !isDate(1, 6) && !isDate(1, 18),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Девятый час',
            id: 'ninthHour',
            enabled: !isEasterOffsetRange(0, 6) && !isDate(1, 6) && !isDate(1, 18),
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
            warn: true,
        },
        {
            title: 'Великое повечерие с каноном св. Андрея Критского',
            id: 'velikoePovecherie',
            enabled: isEasterOffsetRange(-7 * 7 + 1, -7 * 7 + 4),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },
        {
            title: 'Полуночница',
            id: 'polunochnica',
            enabled: !isEasterOffsetRange(0, 5) && !isDate(1, 6) && !isDate(1, 18),
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Часослов',
            warn: true,
        },

        {
            title: 'Погребение',
            id: 'pogrebenie',
            enabled: true,
            calendar: true,
            lang: true,
            skipRedirect: true,
            group: 'Требы',
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
            title: 'Молебен о болящих',
            id: 'molebenBoliaschih',
            enabled: true,
            calendar: false,
            lang: true,
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
            warn: false,
            scriptEditor: true,
        },
        {
            title: 'Вечерня братским чином',
            id: 'vespers',
            enabled: true,
            calendar: true,
            lang: false,
            skipRedirect: true,
            group: 'Домашняя молитва',
            warn: false,
            scriptEditor: true,
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
            title: 'Молитвы до и после трапезы',
            id: 'molitvaTrapeza',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            group: 'Домашняя молитва',
            warn: false,
        },
        {
            title: 'Псалмы и духовные песнопения',
            id: 'psalmsSpiritualCants',
            enabled: true,
            calendar: false,
            lang: true,
            skipRedirect: true,
            warn: false,
            group: '',
        },
        ...bratMolitvoslovPrayers.map((i) => ({
            title: i.label,
            id: `bratMolitvoslov/${i.value}`,
            enabled: true,
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Братский молитвослов',
            warn: false,
            hideTOC: true,
        })),
        ...customPrayers.map((i) => ({
            title: i.text.split('\n')[0],
            id: `customPrayer/${i.id}`,
            enabled: true,
            calendar: false,
            lang: false,
            skipRedirect: true,
            group: 'Братский молитвослов',
            warn: false,
            hideTOC: true,
            customPrayerId: i.id,
        })),
    ];
};
export default useServices;
