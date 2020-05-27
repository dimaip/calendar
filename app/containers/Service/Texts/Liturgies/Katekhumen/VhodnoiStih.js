import React from 'react';
import Html from 'components/Html/Html';
const VhodnoiStih = ({ day, lang }) => {
    const vhodnoiStih = day?.parts?.liturgy?.['Входной стих'];
    if (vhodnoiStih) {
        return <Html html={vhodnoiStih} />;
    }

    return (
        <>
            {lang === 'default' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Приди</span>
                        <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те, покло</span>
                        <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нимся и припадём ко Христу!</span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вос­крес­ший из мёртвых </span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или в соответствии с празд­ником)</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Сын Божий, спа­си нас, поющих Те­бе:</span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> аллилуия!</span>
                    </p>
                </>
            )}
            {lang === 'ЦСЯ' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Приидите, поклонимся и припадем ко Христу. / Спаси ны, Сыне Божий, / Воскресый из мертвых,
                            поющия Ти, / аллилуиа.
                        </span>
                    </p>
                </>
            )}
        </>
    );
};

export default VhodnoiStih;
