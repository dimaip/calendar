import memoize from 'lodash.memoize';

import { calculateEasterDate, makeIsEasterOffsetRange } from './calendar';
import { blue, green, red, violet } from './palette';

export const getFeastInfo = memoize(
    (_date: Date) => {
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
            (date.getDay() !== 0 &&
                date.getDay() !== 6 && // not weekend
                isEasterOffsetRange(-48, -1) && // During lent
                (new Date(y, 2, 9).getTime() === date.getTime() || // glava Ioanna
                    (y !== 2023 && new Date(y, 2, 22).getTime() === date.getTime()) || // 40 sev much
                    new Date(2023, 2, 21).getTime() === date.getTime())) // in 2023 40 sev much has been shifted one day prior
        ) {
            lpod = true;
        }
        // Blagoveshenie overrides lpod
        if (new Date(y, 3, 7).getTime() === date.getTime()) {
            lpod = false;
        }

        if (
            isEasterOffsetRange(-7 * 6) ||
            isEasterOffsetRange(-7 * 5) ||
            isEasterOffsetRange(-7 * 4) ||
            isEasterOffsetRange(-7 * 3) ||
            isEasterOffsetRange(-7 * 2) ||
            isEasterOffsetRange(-3) ||
            isEasterOffsetRange(-1) ||
            (date.getDay() !== 6 && new Date(y, 0, 6).getTime() === date.getTime()) ||
            (date.getDay() === 0 && new Date(y, 0, 7).getTime() === date.getTime()) ||
            new Date(y, 0, 14).getTime() === date.getTime() ||
            (date.getDay() !== 0 && date.getDay() !== 6 && new Date(y, 0, 18).getTime() === date.getTime()) ||
            ((date.getDay() === 0 || date.getDay() === 1) && new Date(y, 0, 19).getTime() === date.getTime())
        ) {
            vasiliy = true;
        }
        // Blagoveshenie overrides vasiliy
        if (
            new Date(y, 3, 7).getTime() === date.getTime() &&
            !(
                isEasterOffsetRange(-7 * 6) ||
                isEasterOffsetRange(-7 * 5) ||
                isEasterOffsetRange(-7 * 4) ||
                isEasterOffsetRange(-7 * 3) ||
                isEasterOffsetRange(-7 * 2)
            )
        ) {
            vasiliy = false;
        }

        // в навечерия Рождества Христова и Богоявления, и в день праздника святого Василия.
        if (pascha.getTime() === date.getTime()) {
            title = 'Пасха';
            feastType = '12';
            calendarColour = 'red';
        }

        const palm_sunday = calculateEasterDate(y);
        palm_sunday.setDate(pascha.getDate() - 7);

        if (palm_sunday.getTime() === date.getTime()) {
            title = 'Вход Господень в Иерусалим';
            feastType = '12';
            colour = green;
            calendarColour = 'green';
            icon = 'vhod.svg';
        }

        if (isEasterOffsetRange(-8)) {
            icon = 'lazar.svg';
        }

        const holy_Ascension = calculateEasterDate(y);
        holy_Ascension.setDate(pascha.getDate() + 39);

        const fomina = calculateEasterDate(y);
        fomina.setDate(pascha.getDate() + 7);

        if (holy_Ascension.getTime() === date.getTime()) {
            title = 'Вознесение';
            feastType = '12';
            colour = red;
            calendarColour = 'red';
        }

        const palamaBegin = calculateEasterDate(y);
        palamaBegin.setDate(6 * pascha.getDate() - 6);

        if (isEasterOffsetRange(-7 * 7)) {
            icon = 'exile.svg';
        }

        if (isEasterOffsetRange(-7 * 6)) {
            icon = 'triumph.svg';
        }

        if (isEasterOffsetRange(-7 * 5)) {
            icon = 'palama.svg';
        }

        if (isEasterOffsetRange(-7 * 4)) {
            icon = 'krestopoklonnaya.svg';
        }

        if (isEasterOffsetRange(-7 * 3)) {
            icon = 'lestvichnik.svg';
        }

        if (isEasterOffsetRange(-7 * 2)) {
            icon = 'egypt.svg';
        }

        const strastnayaBegin = calculateEasterDate(y);
        strastnayaBegin.setDate(pascha.getDate() - 6);

        if (date >= strastnayaBegin && date < pascha) {
            icon = 'passion.svg';
        }

        if (isEasterOffsetRange(-6)) {
            icon = 'passionMonday.svg';
        }
        if (isEasterOffsetRange(-5)) {
            icon = 'passionTuesday.svg';
        }
        if (isEasterOffsetRange(-4)) {
            icon = 'passionWednesday.svg';
        }
        if (isEasterOffsetRange(-2)) {
            icon = 'passionFriday.svg';
        }

        if (date >= pascha && date < fomina) {
            colour = red;
            icon = 'easter.svg';
        }
        if (date >= fomina && date < holy_Ascension) {
            colour = red;
            icon = 'easter2new.svg';
        }
        if (isEasterOffsetRange(7)) {
            icon = 'fomina.svg';
        }
        if (isEasterOffsetRange(7 * 2)) {
            icon = 'myrr.svg';
        }
        if (isEasterOffsetRange(7 * 4)) {
            icon = 'samar.svg';
        }

        const pentecost = calculateEasterDate(y);
        pentecost.setDate(pascha.getDate() + 49);

        if (isEasterOffsetRange(49, 55)) {
            icon = 'pentecost.svg';
            colour = green;
        }

        if (pentecost.getTime() === date.getTime()) {
            title = 'Пятидесятница';
            feastType = '12';
            calendarColour = 'green';
        }

        if (new Date(y, 8, 21).getTime() === date.getTime()) {
            title = 'Рождество Богородицы';
            feastType = '12';
            colour = blue;
            calendarColour = 'blue';
        }
        if (new Date(y, 8, 21).getTime() <= date.getTime() && date.getTime() <= new Date(y, 8, 25).getTime()) {
            icon = 'birthOfOurLady.svg';
        }

        if (new Date(y, 8, 27).getTime() === date.getTime()) {
            title = 'Воздвижение Креста Господня';
            feastType = '12';
            colour = violet;
        }
        if (new Date(y, 8, 27).getTime() <= date.getTime() && date.getTime() <= new Date(y, 9, 4).getTime()) {
            icon = 'krestovozdvizhenie.svg';
        }

        if (new Date(y, 11, 4).getTime() === date.getTime()) {
            title = 'Введение во храм Пресвятой Богородицы';
            feastType = '12';
            colour = blue;
            calendarColour = 'blue';
        }
        if (new Date(y, 11, 4).getTime() <= date.getTime() && date.getTime() <= new Date(y, 11, 8).getTime()) {
            icon = 'vvedenie.svg';
        }

        if (new Date(y, 0, 7).getTime() === date.getTime()) {
            title = 'Рождество Христово';
            feastType = '12';
            calendarColour = 'red';
        }
        if (new Date(y, 0, 7).getTime() <= date.getTime() && date.getTime() <= new Date(y, 0, 13).getTime()) {
            icon = 'christmas.svg';
        }

        if (new Date(y, 0, 18).getTime() === date.getTime()) {
            colour = violet;
        }
        if (new Date(y, 0, 19).getTime() === date.getTime()) {
            title = 'Крещение Господне';
            feastType = '12';
            colour = red;
            calendarColour = 'red';
        }
        if (new Date(y, 0, 19).getTime() <= date.getTime() && date.getTime() <= new Date(y, 0, 27).getTime()) {
            icon = 'baptism.svg';
        }

        if (new Date(y, 0, 7).getTime() <= date.getTime() && date.getTime() <= new Date(y, 0, 17).getTime()) {
            colour = red;
        }

        if (new Date(y, 1, 15).getTime() === date.getTime()) {
            title = 'Сретение Господне';
            feastType = '12';
            colour = blue;
            calendarColour = 'blue';
        }
        if (new Date(y, 1, 15).getTime() <= date.getTime() && date.getTime() <= new Date(y, 1, 22).getTime()) {
            icon = 'candlemas.svg';
        }

        if (new Date(y, 10, 29).getTime() === date.getTime()) {
            icon = 'mathew.svg';
        }
        if (new Date(y, 3, 7).getTime() <= date.getTime() && date.getTime() <= new Date(y, 3, 8).getTime()) {
            colour = blue;
            calendarColour = 'blue';
            feastType = '12';
            icon = 'annunciation.svg';
        }

        if (new Date(y, 7, 19).getTime() === date.getTime()) {
            title = 'Преображение Господне';
            feastType = '12';
            colour = red;
            calendarColour = 'red';
            icon = 'transfiguration.png';
        }

        if (new Date(y, 7, 28).getTime() === date.getTime()) {
            title = 'Успение Богородицы';
            feastType = '12';
            colour = blue;
            calendarColour = 'blue';
        }
        if (new Date(y, 7, 28).getTime() <= date.getTime() && date.getTime() <= new Date(y, 8, 5).getTime()) {
            icon = 'uspenie.svg';
        }

        if (new Date(y, 9, 14).getTime() === date.getTime()) {
            title = 'Покров Пресвятой Богородицы';
            feastType = 'great';
            colour = blue;
            calendarColour = 'blue';
            icon = 'pokrov.svg';
        }

        if (new Date(y, 9, 8).getTime() === date.getTime()) {
            icon = 'serge.svg';
        }

        if (new Date(y, 0, 14).getTime() === date.getTime()) {
            title = 'Обрезание Господне';
            feastType = 'great';
            colour = red;
            calendarColour = 'red';
            icon = 'circumcision.svg';
        }

        if (new Date(y, 6, 7).getTime() === date.getTime()) {
            title = 'Рождество Иоанна Крестителя';
            feastType = 'great';
            icon = 'baptist.png';
            calendarColour = 'red';
            colour = red;
        }

        if (new Date(y, 6, 12).getTime() === date.getTime()) {
            title = 'День святых первоверховных апостолов Петра и Павла';
            feastType = 'great';
            icon = 'peterAndPaul.svg';
            calendarColour = 'gold';
        }

        if (new Date(y, 6, 13).getTime() === date.getTime()) {
            icon = 'peterAndPaul.svg';
        }

        if (new Date(y, 8, 11).getTime() === date.getTime()) {
            title = 'Усекновение главы Иоанна Предтечи';
            feastType = 'great';
            icon = 'baptist.png';
            colour = violet;
        }

        if (
            new Date(y, 9, 9).getTime() === date.getTime() ||
            new Date(y, 4, 21).getTime() === date.getTime() ||
            isEasterOffsetRange(-3)
        ) {
            icon = 'john.svg';
        }

        if (isEasterOffsetRange(39, 47)) {
            icon = 'ascension.svg';
        }

        if (new Date(y, 9, 30).getTime() <= date.getTime() && date.getTime() <= new Date(y, 10, 7).getTime()) {
            icon = 'oct30.svg';
            colour = violet;
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
    (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
);
