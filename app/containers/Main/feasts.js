// This is legacy code with shit-quality and it is partially borrowed from http://www.holytrinityorthodox.com/ru/calendar/v2staff/loadCalendar_v2.js

var level1 = 'полное воздержание от пищи';
var level2 = 'cухоядение';
var level3 = 'горячая пища без масла';
var level4 = 'пища с растительным маслом';
var level5 = 'разрешается рыба';
var level6 = 'разрешается рыбная икра';
var level7 = 'исключается мясо';
var level8 = '';

const calculateEasterDate = year => {
    // Pascha Calculation
    let pascha_m;
    let pascha_d;
    var r1 = year % 19;
    var r2 = year % 4;
    var r3 = year % 7;
    var ra = 19 * r1 + 16;
    var r4 = ra % 30;
    var rb = 2 * r2 + 4 * r3 + 6 * r4;
    var r5 = rb % 7;
    var rc = 3 + r4 + r5;

    if (rc < 30) {
        pascha_m = 3; // Pascha is  in April
        pascha_d = rc; // Pascha day in Aplil
    } else {
        pascha_m = 4; // Pascha is in May
        pascha_d = rc - 30; // Pascha day in May
    }

    return new Date(year, pascha_m, pascha_d); // Set Pascha Date
};

export function lent(date) {
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    var fasting_level = '';
    var fast_name = 'Постный день';

    var pascha = calculateEasterDate(y);

    var current_date = new Date(y, m, d);
    var current_day_of_week = current_date.getDay();

    // Cristmass Lent
    var cristmass_lent_begin = new Date(y, 10, 28);
    var cristmass_lent_nicolos = new Date(y, 11, 19);
    var cristmass_lent_theotocos = new Date(y, 11, 4);
    var end_of_current_year = new Date(y, 11, 31);
    var begin_of_current_year = new Date(y, 0, 1);
    var cristmass_preprazd = new Date(y, 0, 2);
    var cristmass_lent_end = new Date(y, 0, 6);

    if (current_date >= cristmass_lent_begin && current_date < cristmass_lent_nicolos) {
        if (
            current_day_of_week == 0 ||
            current_day_of_week == 2 ||
            current_day_of_week == 4 ||
            current_day_of_week == 6
        ) {
            fasting_level = level5;
        }
        if (current_day_of_week == 1) {
            fasting_level = level3;
        }
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
        if (
            current_date.valueOf() == cristmass_lent_theotocos.valueOf() &&
            (current_day_of_week == 3 || current_day_of_week == 5)
        ) {
            fasting_level = level5;
        }
    }

    if (
        (current_date >= cristmass_lent_nicolos && current_date <= end_of_current_year) ||
        (current_date >= begin_of_current_year && current_date < cristmass_preprazd)
    ) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fasting_level = level5;
        }
        if (current_day_of_week == 1) {
            fasting_level = level3;
        }
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fasting_level = level4;
        }
    }

    if (current_date >= cristmass_preprazd && current_date <= cristmass_lent_end) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fasting_level = level4;
        }
        if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fasting_level = level3;
        }
    }

    if (current_date >= cristmass_lent_begin && current_date <= cristmass_lent_end) {
        fast_name = 'Рождественский пост';
    }

    // After Cristmass Lent
    var beg = new Date(y, 0, 20); // January 20th
    var beg_pharesee = calculateEasterDate(y);
    beg_pharesee.setDate(pascha.getDate() - 69); // Begin of Pharesee week
    var end_pharesee = calculateEasterDate(y);
    end_pharesee.setDate(pascha.getDate() - 63); // End of Pharesee week
    var one_week_before_great_lent = calculateEasterDate(y);
    one_week_before_great_lent.setDate(pascha.getDate() - 55); // One week before Great Lent starts

    if (
        (current_date >= beg && current_date < beg_pharesee) ||
        (current_date >= end_pharesee && current_date < one_week_before_great_lent)
    ) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level5;
        }
    }

    // Meat free week
    var beg_meet_free_week = calculateEasterDate(y);
    beg_meet_free_week.setDate(pascha.getDate() - 55); // Begin of Meet free week
    var end_meet_free_week = calculateEasterDate(y);
    end_meet_free_week.setDate(pascha.getDate() - 49); // End of Meet free week
    if (current_date >= beg_meet_free_week && current_date <= end_meet_free_week) {
        fasting_level = level7;
    }

    // Uspensky Lent
    var uspensky_lent_begin = new Date(y, 7, 14);
    var transfiguration = new Date(y, 7, 19);
    var uspensky_lent_end = new Date(y, 7, 28);

    if (current_date >= uspensky_lent_begin && current_date < uspensky_lent_end) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fasting_level = level4;
        }
        if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fasting_level = level3;
        }
        if (current_date.valueOf() == transfiguration.valueOf()) {
            fasting_level = level5;
        }

        fast_name = 'Успенский пост';
    }

    // After Uspensky Lent
    var cristmass_lent_begin = new Date(y, 10, 28);
    if (current_date >= uspensky_lent_end && current_date < cristmass_lent_begin) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
    }

    // Petrov Lent
    var petrov_lent_begin = calculateEasterDate(y);
    petrov_lent_begin.setDate(pascha.getDate() + 57);
    var petrov_lent_end = new Date(y, 6, 12);
    if (current_date >= petrov_lent_begin && current_date < petrov_lent_end) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
        if (
            current_day_of_week == 0 ||
            current_day_of_week == 2 ||
            current_day_of_week == 4 ||
            current_day_of_week == 6
        ) {
            fasting_level = level5;
        }
        if (current_day_of_week == 1) {
            fasting_level = level3;
        }

        fast_name = 'Петров пост';
    }

    // After Petrov Lent
    if (current_date >= petrov_lent_end && current_date < uspensky_lent_begin) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
    }

    // Great Lent
    var great_lent_begin = calculateEasterDate(y);
    great_lent_begin.setDate(pascha.getDate() - 48);
    var palm_saturday = calculateEasterDate(y);
    palm_saturday.setDate(pascha.getDate() - 8);
    var palm_sunday = calculateEasterDate(y);
    palm_sunday.setDate(pascha.getDate() - 7);
    var theotocos = new Date(y, 3, 7);
    var great_lent_end = calculateEasterDate(y);

    if (current_date > great_lent_begin && current_date < great_lent_end) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fasting_level = level4;
        }
        if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fasting_level = level3;
        }

        fast_name = 'Великий пост';
    }
    if (current_date.valueOf() == great_lent_begin.valueOf()) {
        fasting_level = level1;
    }
    if (current_date.valueOf() == palm_saturday.valueOf()) {
        fasting_level = level6;
    }
    if (current_date.valueOf() == palm_sunday.valueOf()) {
        fasting_level = level5;
    }
    if (
        current_date.valueOf() == theotocos.valueOf() &&
        current_date > great_lent_begin &&
        current_date <= palm_sunday
    ) {
        fasting_level = level5;
    }
    if (current_date.valueOf() == theotocos.valueOf() && current_date > palm_sunday && current_date < great_lent_end) {
        fasting_level = level4;
    }
    if (current_date > palm_sunday && current_date < great_lent_end && current_day_of_week == 5) {
        fasting_level = level1;
    }
    if (current_date > palm_sunday && current_date < great_lent_end && current_day_of_week == 6) {
        fasting_level = level2;
    }

    // After Great Lent
    var beg = calculateEasterDate(y);
    beg.setDate(pascha.getDate() + 7);
    var pentecost = calculateEasterDate(y);
    pentecost.setDate(pascha.getDate() + 49);
    if (current_date >= beg && current_date < pentecost) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fasting_level = level5;
        }
    }

    // One Day Lent
    var sochelnik_cr = new Date(y, 0, 6);
    var sochelnik = new Date(y, 0, 18);
    var beheading = new Date(y, 8, 11);
    var elevation = new Date(y, 8, 27);
    var sretenie = new Date(y, 1, 15);
    var preobrazhenie = new Date(y, 7, 19);
    var uspenie = new Date(y, 7, 28);
    var rozh_bogor = new Date(y, 8, 21);
    var pokrov = new Date(y, 9, 14);
    var vvedenie = new Date(y, 11, 4);
    var joann = new Date(y, 6, 7);
    var peter = new Date(y, 6, 12);
    var bogoslov = new Date(y, 4, 21);

    if (
        current_date.valueOf() == sochelnik_cr.valueOf() ||
        current_date.valueOf() == sochelnik.valueOf() ||
        current_date.valueOf() == beheading.valueOf() ||
        current_date.valueOf() == elevation.valueOf()
    ) {
        fasting_level = level4;
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
            fasting_level = level5;
        }
    }

    // Sviatki
    var sviatki_begin = new Date(y, 0, 7);
    var sviatki_end = new Date(y, 0, 17);
    if (current_date >= sviatki_begin && current_date <= sviatki_end) {
        fasting_level = level8;
    }

    // Paresee
    var paresee_begin = calculateEasterDate(y);
    paresee_begin.setDate(pascha.getDate() - 69);
    var paresee_end = calculateEasterDate(y);
    paresee_end.setDate(pascha.getDate() - 63);
    var pentecost_begin = calculateEasterDate(y);
    pentecost_begin.setDate(pascha.getDate() + 49);
    var pentecost_end = calculateEasterDate(y);
    pentecost_end.setDate(pascha.getDate() + 55);

    if (
        (current_date >= paresee_begin && current_date < paresee_end) ||
        (current_date > pentecost_begin && current_date <= pentecost_end)
    ) {
        fasting_level = level8;
    }

    // Svetlaia sedmitsa
    var svetlaia_begin = calculateEasterDate(y);
    var svetlaia_end = calculateEasterDate(y);
    svetlaia_end.setDate(pascha.getDate() + 6);

    if (current_date > svetlaia_begin && current_date <= svetlaia_end) {
        fasting_level = level8;
    }

    if (fasting_level) return [fast_name, fasting_level];

    return false;
}

export function highlightDays(date) {
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();

    var dates12 = [];
    var tips12 = [];

    var pascha = calculateEasterDate(y);

    dates12.push(pascha);
    tips12.push('Пасха');

    var publican_and_Pharisee = calculateEasterDate(y);
    publican_and_Pharisee.setDate(pascha.getDate() - 70);

    var meatfare_Sunday = calculateEasterDate(y);
    meatfare_Sunday.setDate(pascha.getDate() - 56);

    var forgiveness_Sunday = calculateEasterDate(y);
    forgiveness_Sunday.setDate(pascha.getDate() - 49);

    var palm_sunday = calculateEasterDate(y);
    palm_sunday.setDate(pascha.getDate() - 7);
    dates12.push(palm_sunday);
    tips12.push('Вход Господень в Иерусалим');

    var mid_Pentecost = calculateEasterDate(y);
    mid_Pentecost.setDate(pascha.getDate() + 24);

    var holy_Ascension = calculateEasterDate(y);
    holy_Ascension.setDate(pascha.getDate() + 39);
    dates12.push(holy_Ascension);
    tips12.push('Вознесение');

    var pentecost = calculateEasterDate(y);
    pentecost.setDate(pascha.getDate() + 49);
    dates12.push(pentecost);
    tips12.push('Пятидесятница');

    var all_Saints = calculateEasterDate(y);
    all_Saints.setDate(pascha.getDate() + 56);

    dates12.push(new Date(y, 8, 21));
    tips12.push('Рождество Богородицы');

    dates12.push(new Date(y, 8, 27));
    tips12.push('Воздвижение Креста Господня');

    dates12.push(new Date(y, 11, 4));
    tips12.push('Введение во храм Пресвятой Богородицы');

    var christmasLentBegin = new Date(y, 10, 28);
    var christmas = new Date(y, 0, 7);
    dates12.push(christmas);
    tips12.push('Рождество Христово');

    dates12.push(new Date(y, 0, 19));
    tips12.push('Крещение Господне');

    dates12.push(new Date(y, 1, 15));
    tips12.push('Сретение Господне');

    dates12.push(new Date(y, 3, 7));
    tips12.push('Благовещение Пресвятой Богородицы');

    dates12.push(new Date(y, 7, 19));
    tips12.push('Преображение Господне');

    var uspenieLentBegin = new Date(y, 7, 14);
    var uspenie = new Date(y, 7, 28);
    dates12.push(uspenie);
    tips12.push('Успение Богородицы');

    var datesgreat = [];
    var tipsgreat = [];
    datesgreat.push(new Date(y, 9, 14));
    tipsgreat.push('Покров Пресвятой Богородицы');

    datesgreat.push(new Date(y, 0, 14));
    tipsgreat.push('Обрезание Господне');

    datesgreat.push(new Date(y, 6, 7));
    tipsgreat.push('Рождество Иоанна Крестителя');

    const peterAndPaul = new Date(y, 6, 12);
    datesgreat.push(peterAndPaul);
    tipsgreat.push('День святых первоверховных апостолов Петра и Павла');

    datesgreat.push(new Date(y, 8, 11));
    tipsgreat.push('Усекновение главы Иоанна Предтечи');

    for (var i = 0; i < dates12.length; i++) {
        if (+dates12[i] == +date) {
            return ['highlight-12', tips12[i]];
        }
    }
    for (var i = 0; i < datesgreat.length; i++) {
        if (+datesgreat[i] == +date) {
            return ['highlight-great', tipsgreat[i]];
        }
    }

    var lent_check = lent(new Date(y, m, d));

    if (lent_check[1] == level1 || lent_check[1] == level2 || lent_check[1] == level3 || lent_check[1] == level4)
        return ['highlight-post123', lent_check[0]];
    if (lent_check[1] == level7) return ['highlight-post7', lent_check[0]];
    if (lent_check) return ['highlight-post', lent_check[0]];

    return ['', ''];
}
