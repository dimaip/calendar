import React from 'react';

const Zadastoinik = ({ day }) => {
    const zadastoinik = day?.liturgyParts?.['Задостойник'];
    if (zadastoinik) {
        return (
            <>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> {zadastoinik}</span>
                </p>
            </>
        );
    }
    return (
        <>
            <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                    {' '}
                    Воистину подобает блаженною именовать тебя как Богородицу, вечно­блаже́нную и всенепоро́
                </span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ч­ную, и Матерь Бога нашего. </span>
            </p>
            <p className="_-ОСНОВНОЙ_Основной-б-отст">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                    Че́ствуемую превыше херувимов и славную не­срав­ненно более серафимов, девственно Бога-Слово
                    ро­дившую, поистине Богородицу — тебя величаем
                </span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
            </p>
        </>
    );
};
export default Zadastoinik;
