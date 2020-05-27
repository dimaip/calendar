import React from 'react';

const getProkimenData = (day, date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0) {
        if (day?.glas === 1) {
            return {
                title: 'Прокимен, глас 1 (Пс 32:22, 1)',
                verse1: 'Да будет, Господи, милость Твоя на нас, / ибо мы уповаем на Тебя.',
                stih: 'Радуйтесь, праведные, о Господе! Правым подобает восхвалять Его.',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/93a63811b5b5283340a7d2ff9fdeae18c2f66c89/%D0%93%D0%BB%D0%B0%D1%81%201.mp3',
            };
        }
        if (day?.glas === 2) {
            return {
                title: 'Прокимен, глас 2 (Пс 117:14, 18)',
                verse1: 'Господь – сила моя и песнь, / и Он – спасение моё.',
                stih: 'Наказал, о, наказал Он меня, но смерти не пре́дал меня.',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/b221b6393ed6066797a207b3e723a5b1accc4007/%D0%93%D0%BB%D0%B0%D1%81%202.mp3',
            };
        }
        if (day?.glas === 3) {
            return {
                title: 'Прокимен, глас 3 (Пс 46:7, 2)',
                verse1: 'Пойте Богу нашему, пойте; / пойте Царю нашему, пойте!',
                stih: 'Восплещи́те руками, все народы, воскликните Богу гласом радости!',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/d92c6fa86cf29549c5aad43ca40418475fd1ad47/%D0%93%D0%BB%D0%B0%D1%81%203.mp3',
            };
        }
        if (day?.glas === 4) {
            return {
                title: 'Прокимен, глас 4 (Пс 103:24, 1)',
                verse1: 'Велики́, о Господи, труды Твои, / всё с премудростию Ты сотворил.',
                stih: 'Благослови Господа, душа моя! Господи, Боже мой, Ты весьма велик.',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/3c505f694548e531493ef669f394cbf610822e22/%D0%93%D0%BB%D0%B0%D1%81%204.mp3',
            };
        }
        if (day?.glas === 5) {
            return {
                title: 'Прокимен, глас 5 (Пс 11:8, 2)',
                verse1: 'Ты, Господи, нас сохранишь, / сбережёшь от рода сего вовек.',
                stih: 'Господи, спаси! Ибо правого не сыска́ть.',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/5ef52d7e3bb98d16432203d4612458a649757d0a/%D0%93%D0%BB%D0%B0%D1%81%205.mp3',
            };
        }
        if (day?.glas === 6) {
            return {
                title: 'Прокимен, глас 6 (Пс 27:9, 1)',
                verse1: 'Спаси, Господи, народ Твой/ и благослови наследие Твоё!',
                stih: 'К Тебе, Господи, взываю: «Боже мой, не безмолвствуй мне в ответ!»',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/d1370ebbb683830ec4105b9e5206c3a1783862f3/%D0%93%D0%BB%D0%B0%D1%81%206.mp3',
            };
        }
        if (day?.glas === 7) {
            return {
                title: 'Прокимен, глас 7 (Пс 28:11, 1)',
                verse1: 'Господь народу Своему подаст мощь, / одари́т миром людей Своих.',
                stih: 'Воздайте Господу, Божьи сыны́, воздайте Господу царскую честь!',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/a32c7ba3708efb7f0ee3221630db495457bb9509/%D0%93%D0%BB%D0%B0%D1%81%207.mp3',
            };
        }
        if (day?.glas === 8) {
            return {
                title: 'Прокимен, глас 8 (Пс 75:12, 2)',
                verse1: 'Давайте обеты, исполняйте их/ пред Господом – Он Бог ваш!',
                stih: 'Ве́дом во Иудее Бог, велико́ во Израиле имя Его.',
                audio:
                    'https://psmb-neos-resources.hb.bizmrg.com/target/psmb/d71c0f034fd43689822d8bd9e0bc94a1b8fdf737/%D0%93%D0%BB%D0%B0%D1%81%208.mp3',
            };
        }
    }
    if (dayOfWeek === 1) {
        return {
            title: 'Прокимен, глас 4 (Пс 103:4, 1)',
            verse1: 'Ве́тры вестниками Твоими творишь, / слу́гами Твоими – пламена́ огня.',
            stih: 'Благослови Господа, душа моя! Господи, Боже мой, Ты весьма велик.',
        };
    }
    if (dayOfWeek === 2) {
        return {
            title: 'Прокимен, глас 7 (Пс 63:11, 2)',
            verse1: 'Возвеселится праведник о Господе/ и будет надеяться на Него.',
            stih: 'Услышь, Боже, голос мой в молитве моей!',
        };
    }
    if (dayOfWeek === 3) {
        return {
            title: 'Прокимен, глас 3, песнь Богородицы (Лк 1:46-48)',
            verse1: 'Величает душа Моя Господа, / и ликует дух Мой о Боге, Спасителе Моём,',
            stih: 'Ибо призре́л Он на малость рабы Своей: вот, блаженною назовут Меня из рода в род!',
        };
    }
    if (dayOfWeek === 4) {
        return {
            title: 'Прокимен, глас 8 (Пс 18:5, 2)',
            verse1: 'По всей земле несётся их глас, / до концов вселенной – слово их.',
            stih: 'Славу Божью пове́дают небеса, и о деле рук Его вещает твердь.',
        };
    }
    if (dayOfWeek === 5) {
        return {
            title: 'Прокимен, глас 7 (Пс 98:5, 1)',
            verse1: 'Превозноси́те Господа Бога нашего / и поклоняйтесь подножию ног Его, ибо свя́то оно!',
            stih: 'Господь есть Царь, да трепещут народы!',
        };
    }
    if (dayOfWeek === 6) {
        return {
            title: 'Прокимен, глас 8 (Пс 31:11, 1)',
            verse1: 'Возвеселитесь же о Господе / и возрадуйтесь, праведные!',
            stih: 'Блажен, кому отпущены беззакония и чьи грехи прощены.',
            title2: 'И умершим, глас 6 (Пс 24:13)',
            verse2: 'Ду́ши их/ пребудут во бла́ге.',
        };
    }
    return null;
};

const Prokimen = ({ title, verse1, stih, title2, verse2, audio }) => (
    <>
        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> {title}</span>
            {verse1 && <br />}
            {verse1}
        </p>
        {stih && (
            <p className="_-ОСНОВНОЙ_Основной-б-отст">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Стих</span> {stih}
            </p>
        )}
        {title2 && <p className="_-ОСНОВНОЙ_Основной-отст1-5">{title2}</p>}
        {verse2 && <p className="_-ОСНОВНОЙ_Основной-б-отст">{verse2}</p>}
        {audio && (
            <audio controls>
                <source src={audio} type="audio/mpeg" />
            </audio>
        )}
    </>
);

const Prokimens = ({ day, date }) => {
    const commonProkimen = getProkimenData(day, date);
    let prokimens = day?.parts?.liturgy?.['Прокимен']
        ? [commonProkimen, ...day.parts.liturgy['Прокимен']]
        : [commonProkimen];
    prokimens = prokimens.filter(Boolean);
    const exclusiveProkimens = prokimens.filter(prokimen => prokimen.replace);
    prokimens = exclusiveProkimens.length ? exclusiveProkimens : prokimens;
    prokimens = prokimens.length
        ? prokimens
        : [
              {
                  title: 'Прокимен, глас…',
              },
          ];

    return (
        <>
            {prokimens.map(prokimen => (
                <Prokimen key={prokimen.title} {...prokimen} />
            ))}
        </>
    );
};

export default Prokimens;
