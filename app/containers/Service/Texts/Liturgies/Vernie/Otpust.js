import React from 'react';
import Html from 'components/Html/Html';

const Otpust = ({ day, date, serviceType }) => {
    const otpust = day?.parts?.liturgy?.['Отпуст'];
    if (otpust) {
        return <Html html={otpust} />;
    }
    const dateObject = new Date(date);
    const isSunday = dateObject.getDay() === 0;
    const greeting =
        serviceType === 'vasiliy'
            ? ' во святых от­ца нашего Василия, архи­епи­скопа Кесарии Каппадокий­ской,'
            : serviceType === 'zlatoust'
            ? ' во святых от­ца нашего Иоан­на, архи­епи­скопа Константино́по­ль­ско­го, Злато­уста,'
            : '';
    return (
        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                {' '}
                {isSunday ? 'Воскресший из мёртвых ' : ''}Христос, истинный Бог наш, по хода́тайству Своей всенепорочной
                Ма­тери, свя­тых слав­ных и все­хваль­ных апосто­лов,{greeting} святых{' '}
            </span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(храма и дня)</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                {' '}
                и всех свя­тых, да помилует и спасёт нас, по Сво­ей бла­гости и человеколюбию!
            </span>
        </p>
    );
};
export default Otpust;
