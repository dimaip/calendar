import React from 'react';
import Tooltip from 'components/Tooltip/Tooltip';

const getPrichastenData = (day, date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0) {
        return {
            title: 'Причастный стих воскресный (Пс 148:1)',
            verse1: 'Хвали́те Господа с небес, хвали́те Его на высо́тах!',
        };
    }
    if (dayOfWeek === 1) {
        return {
            title: 'Причастный стих (Пс 103:4)',
            verse1: 'Ве́тры вестниками Твоими творишь, слу́гами Твоими – пламена́ огня.',
        };
    }
    if (dayOfWeek === 2) {
        return {
            title: 'Причастный стих (Пс 111:6-7)',
            verse1: 'В вечной памяти будет праведник, худой молвы́ не убоится.',
        };
    }
    if (dayOfWeek === 3) {
        return {
            title: 'Причастный стих (Пс 115:4)',
            verse1: 'Чашу спасения приму́, и имя Господне призову.',
        };
    }
    if (dayOfWeek === 4) {
        return {
            title: 'Причастный стих (Пс 18:5)',
            verse1: 'По всей земле несётся их глас, до концов вселенной – слово их.',
        };
    }
    if (dayOfWeek === 5) {
        return {
            title: 'Причастный стих (Пс 73:12)',
            verse1: 'Боже, на земле Ты устроил спасение.',
        };
    }
    if (dayOfWeek === 6) {
        return {
            title: 'Причастный стих (Пс 32:1)',
            verse1: 'Радуйтесь, праведные, о Господе! Правым подобает восхвалять Его.',
            title2: 'И умершим (Пс 64:5; 101:13)',
            verse2: 'Блаженны, кого избрал Ты и при́нял, Господи, и память о них из рода в род.',
        };
    }
    return null;
};

const Prichasten = ({ title, verse1, title2, verse2 }) => (
    <>
        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                {' '}
                {title}{' '}
                <Tooltip>
                    <>
                        То есть прича́стен (кино́ник) дня или святого. Поётся во время прича­ще­ния в алтаре (а иногда и в
                        храме).
                    </>
                </Tooltip>
            </span>
        </p>

        {verse1 && <p className="_-ОСНОВНОЙ_Основной-отст1-5">{verse1}</p>}
        {title2 && <p className="_-ОСНОВНОЙ_Основной-отст1-5">{title2}</p>}
        {verse2 && <p className="_-ОСНОВНОЙ_Основной-б-отст">{verse2}</p>}
    </>
);

const Prichastens = ({ day, date }) => {
    const commonPrichasten = getPrichastenData(day, date);
    let prichastens = day?.liturgyParts?.['Причастен']
        ? [commonPrichasten, ...day.liturgyParts['Причастен']]
        : [commonPrichasten];
    prichastens = prichastens.filter(Boolean);
    const exclusivePrichastens = prichastens.filter(prichasten => prichasten.replace);
    prichastens = exclusivePrichastens.length ? exclusivePrichastens : prichastens;
    prichastens = prichastens.length
        ? prichastens
        : [
              {
                  title: 'Причастный стих',
              },
          ];

    return (
        <>
            {prichastens.map(prichasten => (
                <Prichasten key={prichasten.title} {...prichasten} />
            ))}
        </>
    );
};

export default Prichastens;
