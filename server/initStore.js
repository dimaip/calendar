import { fetchDay } from '../app/redux/actions/getDay';
import dateFormat from 'dateformat';

export default function initStore(route) {
    let date;
    switch (true) {
        case /\/date\/\d{4}-\d{2}-\d{2}/.test(route):
            const found = route.match(/\/date\/(\d{4}-\d{2}-\d{2})/);

            date = found[1];
            break;

        default:
            date = dateFormat(new Date(), 'yyyy-mm-dd');
            break;
    }
    return fetchDay(date).then(dayResult => {
        const days = {},
            day = dayResult.day;
        days[dayResult.date] = day;

        // Compile an initial state
        return {
            days: {
                date,
                days,
                day,
                error: '',
                loaded: true,
            },
        };
    });
}
