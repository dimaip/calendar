import memoize from 'lodash.memoize';

// Originally inspired by http://www.holytrinityorthodox.com/ru/calendar/v2staff/loadCalendar_v2.js

const fastingLevels = {
    1: 'полное воздержание от пищи',
    2: 'cухоядение',
    3: 'горячая пища без масла',
    4: 'пища с растительным маслом',
    5: 'разрешается рыба',
    6: 'разрешается рыбная икра',
    7: 'исключается мясо',
    8: '',
};

const calculateEasterDateMemoized = memoize(year => {
    // Pascha Calculation
    let pascha_m;
    let pascha_d;
    const r1 = year % 19;
    const r2 = year % 4;
    const r3 = year % 7;
    const ra = 19 * r1 + 16;
    const r4 = ra % 30;
    const rb = 2 * r2 + 4 * r3 + 6 * r4;
    const r5 = rb % 7;
    const rc = 3 + r4 + r5;

    if (rc < 30) {
        pascha_m = 3; // Pascha is  in April
        pascha_d = rc; // Pascha day in Aplil
    } else {
        pascha_m = 4; // Pascha is in May
        pascha_d = rc - 30; // Pascha day in May
    }
    return { d: pascha_d, m: pascha_m, y: year };
});

export const calculateEasterDate = year => {
    const { y, m, d } = calculateEasterDateMemoized(year);
    // Clone the date when accessing
    return new Date(y, m, d);
};

export const makeIsEasterOffsetRange = date => (offsetBegin, offsetEnd) => {
    let d, m, y;
    if (typeof date === 'string') {
        const splitDateString = date.split('-');
        [y, m, d] = [splitDateString[0], splitDateString[1] - 1, splitDateString[2]];
    } else {
        y = date.getFullYear();
        m = date.getMonth();
        d = date.getDate();
    }
    date = new Date(y, m, d);
    const begin = calculateEasterDate(y);
    begin.setDate(begin.getDate() + offsetBegin);
    if (!offsetEnd) {
        return begin.getTime() === date.getTime();
    }
    const end = calculateEasterDate(y);
    end.setDate(end.getDate() + offsetEnd);
    return begin.getTime() <= date.getTime() && date.getTime() <= end.getTime();
};

export const getLentInfo = memoize(
    date => {
        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();
        let fastingLevel = 8;
        let fastName = 'Постный день';
        let colour = null;
        let calendarColour = null;
        let icon = null;

        const pascha = calculateEasterDate(y);

        const current_date = new Date(y, m, d);
        const current_day_of_week = current_date.getDay();

        // console.log('Days since Easter', Math.floor((current_date.getTime() - pascha.getTime()) / (3600 * 24 * 1000)));
        // console.log(
        //     'Weeks since Easter',
        //     Math.floor((current_date.getTime() - pascha.getTime()) / (3600 * 24 * 7 * 1000))
        // );

        // Cristmass Lent
        const cristmass_lent_begin = new Date(y, 10, 28);
        const cristmass_lent_nicolos = new Date(y, 11, 19);
        const cristmass_lent_theotocos = new Date(y, 11, 4);
        const end_of_current_year = new Date(y, 11, 31);
        const begin_of_current_year = new Date(y, 0, 1);
        const cristmass_preprazd = new Date(y, 0, 2);
        const cristmass_lent_end = new Date(y, 0, 6);

        if (current_date >= cristmass_lent_begin && current_date < cristmass_lent_nicolos) {
            if (
                current_day_of_week == 0 ||
                current_day_of_week == 2 ||
                current_day_of_week == 4 ||
                current_day_of_week == 6
            ) {
                fastingLevel = 5;
            }
            if (current_day_of_week == 1) {
                fastingLevel = 3;
            }
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
            if (
                current_date.valueOf() == cristmass_lent_theotocos.valueOf() &&
                (current_day_of_week == 3 || current_day_of_week == 5)
            ) {
                fastingLevel = 5;
            }
        }

        if (
            (current_date >= cristmass_lent_nicolos && current_date <= end_of_current_year) ||
            (current_date >= begin_of_current_year && current_date < cristmass_preprazd)
        ) {
            fastName = 'Рождественский пост';
            if (current_day_of_week == 0 || current_day_of_week == 6) {
                fastingLevel = 5;
            }
            if (current_day_of_week == 1) {
                fastingLevel = 3;
            }
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
            if (current_day_of_week == 2 || current_day_of_week == 4) {
                fastingLevel = 4;
            }
        }

        if (current_date >= cristmass_preprazd && current_date <= cristmass_lent_end) {
            fastName = 'Рождественский пост';
            if (current_day_of_week == 0 || current_day_of_week == 6) {
                fastingLevel = 4;
            }
            if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
            if (current_day_of_week == 2 || current_day_of_week == 4) {
                fastingLevel = 3;
            }
        }

        // After Cristmass Lent
        const beg = new Date(y, 0, 20); // January 20th
        const beg_pharesee = calculateEasterDate(y);
        beg_pharesee.setDate(pascha.getDate() - 69); // Begin of Pharesee week
        const end_pharesee = calculateEasterDate(y);
        end_pharesee.setDate(pascha.getDate() - 63); // End of Pharesee week
        const one_week_before_great_lent = calculateEasterDate(y);
        one_week_before_great_lent.setDate(pascha.getDate() - 55); // One week before Great Lent starts

        if (
            (current_date >= beg && current_date < beg_pharesee) ||
            (current_date >= end_pharesee && current_date < one_week_before_great_lent)
        ) {
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 5;
            }
        }

        // Meat free week
        const beg_meet_free_week = calculateEasterDate(y);
        beg_meet_free_week.setDate(pascha.getDate() - 55); // Begin of Meet free week
        const end_meet_free_week = calculateEasterDate(y);
        end_meet_free_week.setDate(pascha.getDate() - 49); // End of Meet free week
        if (current_date >= beg_meet_free_week && current_date <= end_meet_free_week) {
            fastingLevel = 7;
        }

        // Uspensky Lent
        const uspensky_lent_begin = new Date(y, 7, 14);
        const transfiguration = new Date(y, 7, 19);
        const uspensky_lent_end = new Date(y, 7, 28);

        if (current_date >= uspensky_lent_begin && current_date < uspensky_lent_end) {
            if (current_day_of_week == 0 || current_day_of_week == 6) {
                fastingLevel = 4;
            }
            if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
            if (current_day_of_week == 2 || current_day_of_week == 4) {
                fastingLevel = 3;
            }
            if (current_date.valueOf() == transfiguration.valueOf()) {
                fastingLevel = 5;
            }

            fastName = 'Успенский пост';
        }

        // After Uspensky Lent
        if (current_date >= uspensky_lent_end && current_date < cristmass_lent_begin) {
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
        }

        // Petrov Lent
        const petrov_lent_begin = calculateEasterDate(y);
        petrov_lent_begin.setDate(pascha.getDate() + 57);
        const petrov_lent_end = new Date(y, 6, 12);
        if (current_date >= petrov_lent_begin && current_date < petrov_lent_end) {
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
            if (
                current_day_of_week == 0 ||
                current_day_of_week == 2 ||
                current_day_of_week == 4 ||
                current_day_of_week == 6
            ) {
                fastingLevel = 5;
            }
            if (current_day_of_week == 1) {
                fastingLevel = 3;
            }

            fastName = 'Петров пост';
        }

        // After Petrov Lent
        if (current_date >= petrov_lent_end && current_date < uspensky_lent_begin) {
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
        }

        // Great Lent
        const great_lent_begin = calculateEasterDate(y);
        great_lent_begin.setDate(pascha.getDate() - 48);
        const palm_saturday = calculateEasterDate(y);
        palm_saturday.setDate(pascha.getDate() - 8);
        const palm_sunday = calculateEasterDate(y);
        palm_sunday.setDate(pascha.getDate() - 7);
        const theotocos = new Date(y, 3, 7);
        const great_lent_end = calculateEasterDate(y);
        great_lent_end.setDate(pascha.getDate() - 1);

        if (current_date >= great_lent_begin && current_date <= great_lent_end) {
            if (current_day_of_week == 0 || current_day_of_week == 6) {
                fastingLevel = 4;
            }
            if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 2;
            }
            if (current_day_of_week == 2 || current_day_of_week == 4) {
                fastingLevel = 3;
            }

            fastName = 'Великий пост';
            colour = '#7b68ee';
        }
        if (current_date.valueOf() == great_lent_begin.valueOf()) {
            fastingLevel = 1;
        }
        if (current_date.valueOf() == palm_saturday.valueOf()) {
            fastingLevel = 6;
            calendarColour = 'gold';
            colour = '#AE841A';
        }
        if (current_date.valueOf() == palm_sunday.valueOf()) {
            fastingLevel = 5;
        }
        if (
            current_date.valueOf() == theotocos.valueOf() &&
            current_date >= great_lent_begin &&
            current_date <= palm_sunday
        ) {
            fastingLevel = 5;
        }
        if (
            current_date.valueOf() == theotocos.valueOf() &&
            current_date > palm_sunday &&
            current_date < great_lent_end
        ) {
            fastingLevel = 4;
        }
        if (current_date > palm_sunday && current_date < great_lent_end && current_day_of_week == 5) {
            fastingLevel = 1;
        }
        if (current_date > palm_sunday && current_date < great_lent_end && current_day_of_week == 6) {
            fastingLevel = 2;
        }

        // After Great Lent
        const greatLentBegin = calculateEasterDate(y);
        greatLentBegin.setDate(pascha.getDate() + 7);
        const pentecost = calculateEasterDate(y);
        pentecost.setDate(pascha.getDate() + 49);
        if (current_date >= greatLentBegin && current_date < pentecost) {
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 5;
            }
        }

        // One Day Lent
        const sochelnik_cr = new Date(y, 0, 6);
        const sochelnik = new Date(y, 0, 18);
        const beheading = new Date(y, 8, 11);
        const elevation = new Date(y, 8, 27);
        const sretenie = new Date(y, 1, 15);
        const preobrazhenie = new Date(y, 7, 19);
        const uspenie = new Date(y, 7, 28);
        const rozh_bogor = new Date(y, 8, 21);
        const pokrov = new Date(y, 9, 14);
        const vvedenie = new Date(y, 11, 4);
        const joann = new Date(y, 6, 7);
        const peter = new Date(y, 6, 12);
        const bogoslov = new Date(y, 4, 21);

        if (
            current_date.valueOf() == sochelnik_cr.valueOf() ||
            current_date.valueOf() == sochelnik.valueOf() ||
            current_date.valueOf() == beheading.valueOf() ||
            current_date.valueOf() == elevation.valueOf()
        ) {
            fastingLevel = 4;
        }
        if (
            current_date.valueOf() == sretenie.valueOf() ||
            current_date.valueOf() == preobrazhenie.valueOf() ||
            current_date.valueOf() == uspenie.valueOf() ||
            current_date.valueOf() == rozh_bogor.valueOf() ||
            current_date.valueOf() == pokrov.valueOf() ||
            current_date.valueOf() == vvedenie.valueOf() ||
            current_date.valueOf() == joann.valueOf() ||
            current_date.valueOf() == peter.valueOf() ||
            current_date.valueOf() == bogoslov.valueOf()
        ) {
            if (current_day_of_week == 3 || current_day_of_week == 5) {
                fastingLevel = 5;
            }
        }

        // Sviatki
        const sviatki_begin = new Date(y, 0, 7);
        const sviatki_end = new Date(y, 0, 17);
        if (current_date >= sviatki_begin && current_date <= sviatki_end) {
            fastingLevel = 8;
        }

        // Paresee
        const paresee_begin = calculateEasterDate(y);
        paresee_begin.setDate(pascha.getDate() - 69);
        const paresee_end = calculateEasterDate(y);
        paresee_end.setDate(pascha.getDate() - 63);
        const pentecost_begin = calculateEasterDate(y);
        pentecost_begin.setDate(pascha.getDate() + 49);
        const pentecost_end = calculateEasterDate(y);
        pentecost_end.setDate(pascha.getDate() + 55);

        if (
            (current_date >= paresee_begin && current_date < paresee_end) ||
            (current_date > pentecost_begin && current_date <= pentecost_end)
        ) {
            fastingLevel = 8;
        }

        // Svetlaia sedmitsa
        const svetlaia_begin = calculateEasterDate(y);
        const svetlaia_end = calculateEasterDate(y);
        svetlaia_end.setDate(pascha.getDate() + 6);

        if (current_date > svetlaia_begin && current_date <= svetlaia_end) {
            fastingLevel = 8;
        }

        if (fastingLevel && fastingLevel < 8 && !icon) {
            icon = 'fast.svg';
        }

        if (fastingLevel) {
            return {
                fastName: fastingLevel !== 8 ? fastName : 'Поста нет',
                fastingLevel,
                fastingLevelName: fastingLevels[fastingLevel],
                colour,
                calendarColour,
                icon,
            };
        }

        return null;
    },
    date => `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
);

export const getFeastInfo = memoize(
    _date => {
        let title = '';
        let feastType = null;
        let colour = null;
        let calendarColour = null;
        let icon = null;
        let vasiliy = false;
        let lpod = false;
        const y = _date.getFullYear();
        const m = _date.getMonth();
        const d = _date.getDate();
        const date = new Date(y, m, d);

        const pascha = calculateEasterDate(y);

        const isEasterOffsetRange = makeIsEasterOffsetRange(date);

        {
            // В какие дни служится Литургия Преждеосвященных Даров?
            // По средам и пятницам Великого поста, в праздник Первого и Второго обретения главы Иоанна Предтечи (9 марта по новому стилю), в четверг пятой седмицы Великого поста (14 апреля в 2016 году), в день памяти 40 мучеников Севастийских, а также в первые три дня Страстной седмицы.
            // Исключения:
            // В праздник Благовещения Пресвятой Богородицы всегда служится литургия св. Иоанна Златоуста, вне зависимости от дня недели.
            // Если обретение главы Иоанна Предтечи и день памяти 40 мучеников Севастийских приходятся на выходные дни — служится литургия или Иоанна Златоуста (в субботу) или Василия Великого (в воскресенье).
            if (
                isEasterOffsetRange(-7 * 6 - 4) ||
                isEasterOffsetRange(-7 * 6 - 2) ||
                isEasterOffsetRange(-7 * 5 - 4) ||
                isEasterOffsetRange(-7 * 5 - 2) ||
                isEasterOffsetRange(-7 * 4 - 4) ||
                isEasterOffsetRange(-7 * 4 - 2) ||
                isEasterOffsetRange(-7 * 3 - 4) ||
                isEasterOffsetRange(-7 * 3 - 2) ||
                isEasterOffsetRange(-7 * 2 - 4) ||
                isEasterOffsetRange(-7 * 2 - 3) ||
                isEasterOffsetRange(-7 * 2 - 2) ||
                isEasterOffsetRange(-7 * 1 - 4) ||
                isEasterOffsetRange(-7 * 1 - 2) ||
                isEasterOffsetRange(-6) ||
                isEasterOffsetRange(-5) ||
                isEasterOffsetRange(-4) ||
                (date.getDay() !== 0 && // not weekend
                    date.getDay() !== 6 &&
                    (new Date(y, 2, 9).getTime() == date.getTime() || new Date(y, 2, 22).getTime() == date.getTime())) // glava Ioanna // 40 sev much
            ) {
                lpod = true;
            }
            // Blagoveshenie overrides lpod
            if (new Date(y, 3, 7).getTime() == date.getTime()) {
                lpod = false;
            }
        }

        {
            if (
                isEasterOffsetRange(-7 * 6) ||
                isEasterOffsetRange(-7 * 5) ||
                isEasterOffsetRange(-7 * 4) ||
                isEasterOffsetRange(-7 * 3) ||
                isEasterOffsetRange(-7 * 2) ||
                isEasterOffsetRange(-3) ||
                isEasterOffsetRange(-1) ||
                new Date(y, 0, 14).getTime() == date.getTime()
            ) {
                vasiliy = true;
            }
            // Blagoveshenie overrides vasiliy
            if (new Date(y, 3, 7).getTime() == date.getTime()) {
                vasiliy = false;
            }
        }

        // в навечерия Рождества Христова и Богоявления, и в день праздника святого Василия.
        if (pascha.getTime() == date.getTime()) {
            title = 'Пасха';
            feastType = '12';
            calendarColour = 'red';
        }

        const palm_sunday = calculateEasterDate(y);
        palm_sunday.setDate(pascha.getDate() - 7);

        if (palm_sunday.getTime() == date.getTime()) {
            title = 'Вход Господень в Иерусалим';
            feastType = '12';
            colour = '#529c54';
            calendarColour = 'green';
            icon = 'vhod.jpg';
        }

        if (isEasterOffsetRange(39, 47)) {
            icon = 'ascension.svg';
        }

        const holy_Ascension = calculateEasterDate(y);
        holy_Ascension.setDate(pascha.getDate() + 39);

        const fomina = calculateEasterDate(y);
        fomina.setDate(pascha.getDate() + 7);

        if (holy_Ascension.getTime() == date.getTime()) {
            title = 'Вознесение';
            feastType = '12';
            colour = '#ff4e4e';
            calendarColour = 'red';
        }

        const strastnayaBegin = calculateEasterDate(y);
        strastnayaBegin.setDate(pascha.getDate() - 6);

        if (date >= strastnayaBegin && date < pascha) {
            icon = 'passion.svg';
        }

        if (date >= pascha && date < fomina) {
            colour = '#ff4e4e';
            icon = 'easter.svg';
        }
        if (date >= fomina && date < holy_Ascension) {
            colour = '#ff4e4e';
            icon = 'easter2.svg';
        }

        const pentecost = calculateEasterDate(y);
        pentecost.setDate(pascha.getDate() + 49);

        if (isEasterOffsetRange(49, 55)) {
            icon = 'pentecost.svg';
            colour = '#529c54';
        }

        if (pentecost.getTime() == date.getTime()) {
            title = 'Пятидесятница';
            feastType = '12';
            calendarColour = 'green';
        }

        if (new Date(y, 8, 21).getTime() == date.getTime()) {
            title = 'Рождество Богородицы';
            feastType = '12';
            colour = '#4169E1';
            calendarColour = 'blue';
        }

        if (new Date(y, 8, 27).getTime() == date.getTime()) {
            title = 'Воздвижение Креста Господня';
            feastType = '12';
            colour = '#7b68ee';
        }

        if (new Date(y, 11, 4).getTime() == date.getTime()) {
            title = 'Введение во храм Пресвятой Богородицы';
            feastType = '12';
            colour = '#4169E1';
            calendarColour = 'blue';
        }

        if (new Date(y, 0, 7).getTime() == date.getTime()) {
            title = 'Рождество Христово';
            feastType = '12';
            calendarColour = 'red';
        }

        if (new Date(y, 0, 18).getTime() == date.getTime()) {
            colour = '#7b68ee';
        }
        if (new Date(y, 0, 19).getTime() == date.getTime()) {
            title = 'Крещение Господне';
            feastType = '12';
            colour = '#ff4e4e';
            calendarColour = 'red';
        }

        if (new Date(y, 0, 7).getTime() <= date.getTime() && date.getTime() <= new Date(y, 0, 17).getTime()) {
            colour = '#ff4e4e';
        }

        if (new Date(y, 1, 15).getTime() == date.getTime()) {
            title = 'Сретение Господне';
            feastType = '12';
            colour = '#4169E1';
            calendarColour = 'blue';
        }

        if (new Date(y, 3, 7).getTime() == date.getTime()) {
            title = 'Благовещение Пресвятой Богородицы';
            feastType = '12';
            colour = '#4169E1';
            calendarColour = 'blue';
            icon = 'annunciation.jpg';
        }

        if (new Date(y, 7, 19).getTime() == date.getTime()) {
            title = 'Преображение Господне';
            feastType = '12';
            colour = '#ff4e4e';
            calendarColour = 'red';
            icon = 'transfiguration.png';
        }

        if (new Date(y, 7, 28).getTime() == date.getTime()) {
            title = 'Успение Богородицы';
            feastType = '12';
            colour = '#4169E1';
            calendarColour = 'blue';
        }
        if (new Date(y, 7, 28).getTime() <= date.getTime() && date.getTime() <= new Date(y, 8, 5).getTime()) {
            icon = 'uspenie.svg';
        }

        if (new Date(y, 9, 14).getTime() == date.getTime()) {
            title = 'Покров Пресвятой Богородицы';
            feastType = 'great';
            colour = '#4169E1';
            calendarColour = 'blue';
        }

        if (new Date(y, 0, 14).getTime() == date.getTime()) {
            title = 'Обрезание Господне';
            feastType = 'great';
            colour = '#ff4e4e';
            calendarColour = 'blue';
        }

        if (new Date(y, 6, 7).getTime() == date.getTime()) {
            title = 'Рождество Иоанна Крестителя';
            feastType = 'great';
            icon = 'baptist.png';
            calendarColour = 'red';
            colour = '#ff4e4e';
        }

        if (new Date(y, 6, 12).getTime() == date.getTime()) {
            title = 'День святых первоверховных апостолов Петра и Павла';
            feastType = 'great';
            icon = 'peterAndPaul.svg';
            calendarColour = 'gold';
        }

        if (new Date(y, 6, 13).getTime() == date.getTime()) {
            icon = 'peterAndPaul.svg';
        }

        if (new Date(y, 8, 11).getTime() == date.getTime()) {
            title = 'Усекновение главы Иоанна Предтечи';
            feastType = 'great';
            icon = 'baptist.png';
            colour = '#7b68ee';
        }

        return {
            title,
            feastType,
            colour,
            calendarColour,
            icon,
            vasiliy,
            lpod,
        };
    },
    date => `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
);
