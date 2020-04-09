import React from 'react';
const VhodnoiStih = ({ day }) => {
    const vhodnoiStih = day?.liturgyParts?.['Входной стих'];
    if (vhodnoiStih) {
        return (
            <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span> {vhodnoiStih}
            </p>
        );
    }

    return (
        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен вход </span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Благословенны входящие</span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во святое</span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святых Твоих </span>
            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
        </p>
    );
};

export default VhodnoiStih;
