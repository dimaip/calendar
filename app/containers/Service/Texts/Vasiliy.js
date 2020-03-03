import React from 'react';
import './Vasiliy.css';
import { useParams } from 'react-router-dom';
import forEach from 'lodash.foreach';
import useDay from 'hooks/useDay';
import ReadingItem from 'containers/Readings/ReadingItem';
import isGospel from 'domain/isGospel';
import { css } from 'emotion';

const Readings = ({ readings }) => (
    <>
        {readings.map(({ readingVerse, type }) => (
            <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} />
        ))}
    </>
);

const Vasiliy = ({ lang }) => {
    const { date } = useParams();
    const { data: day } = useDay(date);

    const readings = day?.readings;
    const readingsForService = readings?.['Литургия'];

    const readingVersesWithType = [];
    forEach(readingsForService, (readingVerses, type) => {
        readingVerses.forEach(readingVerse => {
            readingVersesWithType.push({
                readingVerse,
                type,
            });
        });
    });

    const apostolReadings = readingVersesWithType.filter(reading => !isGospel(reading.readingVerse));
    const gospelReadings = readingVersesWithType.filter(reading => isGospel(reading.readingVerse));

    const apostol = (
        <div className={css``}>
            <Readings readings={apostolReadings} />
        </div>
    );
    const gospel = <Readings readings={gospelReadings} />;

    return (
        <div>
            <div id="_idContainer003" className="_idGenObjectStyleOverride-1">
                <p className="_-ОСНОВНОЙ_МеткаНовойСтраницы">
                    <span className="markedBlack"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-Службы ParaOverride-1">
                    <span className="markedRed">
                        <a id="_idTextAnchor001" />
                        I.
                        <br />
                        Литургия оглашаемых
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="markedRed">(1) Приуготовление</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="markedRed"> Открыв завесу и кадя престол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        В гробнице – телом <br /> и в аду – душой как Бог, <br />в раю – с раз­бой­ником <br /> и на
                        престоле – со Отцом и Духом <br />
                        Ты пребывал, Христе, <br /> всё напол­няя, необъя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">тный.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Полное каждение с чтением Пс 50</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-026-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-026"
                            >
                                {' '}
                                *
                            </a>
                        </span>
                    </span>
                    <span className="markedRed">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">О Царь Небесный</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> О Царь Небесный, Хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">тай</span>
                    <span className="markedBlack"> </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> Уте</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">шитель</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">
                        , Дух Истины, о Ты, везде пребывающий и всё наполняющий, Со­кро­вищ­ница благ и жизни Податель,
                        при­ди
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        и вселись в нас, и очи­сти нас от вся­кой скверны, и спа­си, Бла­го
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й, ду­ши наши.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Слава в вышних Богу, <br /> и на земле мир, в человеках благоволение{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> и на земле мир избранникам Его</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">(Дважды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Господи! отве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        рзни уста мои, <br /> и речь моя возвести
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">т хва­лу Тебе.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-2">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Время Господу действовать. Владыка, благослови!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Благословен Бог наш </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">во все дни:</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Помолись обо мне, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Да направит Господь стопы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> твои.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни меня, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог тебя во царствии Своём </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">во все дни:</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-3">
                    <span className="markedRed">***</span>
                </p>
                <p className="petitBigIndent">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Благослови, владыка!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Благословенно Царство Отца и Сына и Святого Ду­ха, ныне и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-1">
                    <span className="markedRed">Великая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> В мире Господу помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> О мире свыше и спасении наших душ Господу по­мо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> О мире всего мира, об укреплении святых Бо­жьих цер­кве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й и единении всех Господу помо­лим­ся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Об этом святом доме и обо всех, с верою, бла­го­го­вени­ем и стра­хом Божьим входящих в него,
                        Го­споду по­мо­лимся.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> О великом господине и отце нашем святейшем патриархе </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и о господине нашем пре­освя­ще</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-петит">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">н­нейшем </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">митрополите</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> архи­епископе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">, или:</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">епи­ско­пе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (имя)]</span>
                    <span className="markedBlack">
                        , почтенном пре­свитер­стве, во Хри­сте дья­кон­стве, обо всём клире и на­роде{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Божьем</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> Го­спо­ду по­мо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> О нашей богохранимой стране </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">, обо всём на­ро­де и властя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">х её Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> Об этом граде </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> об этом селе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> или:</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">об этой святой обите­ли</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack">
                        {' '}
                        и обо всех городах и стра­нах и верою жи­ву­щих в них Господу помолимся.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> О благоприятной погоде, об изобилии плодо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">в зем­ли и мирных вре­мена</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> О плавающих, путеше</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">ствующих, боля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">щих, стра­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">ж­ду­щих, пленённых, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">за правду го­ни­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">мых и заключённых,</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> и спа­се­нии их Го­споду помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> Об избавле­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нии нас от всякого угнетения, гнева, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">бе­ды</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> и принуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ния Господу помолимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Бо­же, Тво­ею бла­годатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> Всесвяту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ю, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">чную, преблагослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">н­ную, славную нашу Вла­дычицу Богородицу и Веч­ноде­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ву Ма­рию со всеми святыми помяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х се­бя, и друг друга, и всю жизнь нашу Хри­сту </span>
                    <span className="markedRed">(или более древнее:</span>
                    <span className="markedBlack"> чрез Христа</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Богу пре­да­дим </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Тебе, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-2">
                    <span className="markedRed">(2) Антифоны изобразительные</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-025-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-025"
                            >
                                {' '}
                                **
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">
                        Молитва перед пением
                        <br />
                        первого антифона
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Господи, Боже наш, Ты, Чья власть несравне</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нна и слава непостижи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ма, Чья милость безмерна и человеколюбие несказа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        нно, – Ты же, Владыка, по Своему благосердию воз­зри на нас и на этот святой дом и яви
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> Твою неисто­щи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мую милость и сострадание нам и моля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щимся с нами,&nbsp;–</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> ибо Тебе подобает вся слава, честь и поклонение, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-1">
                    <span className="markedRed">
                        Первый антифон
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(Пс 102)</span>
                </p>

                {lang === 'default' && (
                    <>
                        <p className="basetIndent_5 ParaOverride-4">
                            <span className="markedBlack"> </span>
                            <span className="markedRed">Н</span>
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Благослови Господа, душа моя!
                                <br /> Благословен Ты, Господи.
                            </span>
                        </p>
                        <p className="basetIndent_5 ParaOverride-4">
                            <span className="markedBlack">
                                {' '}
                                Благослови Господа, душа моя,
                                <br /> и всё, что во мне, — имя святое Его;
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                благослови Господа, душа моя,
                                <br /> и не забывай всех даро́в Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Он прощает все беззакония твои,
                                <br /> исцеляет все неду`ги твои,
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                избавляет от истле́ния жизнь твою,
                                <br /> милостью и щедротами венчает тебя,
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                насыщает бла́гами зрелость твою;
                                <br /> как у орла, обновится юность твоя!
                            </span>
                        </p>
                        <p className="petitIndent_1_5 ParaOverride-4">
                            <span className="markedBlack"> </span>
                            <span className="markedRedBold">[</span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Милость творит Господь,
                                <br /> тесни`мых защищает права́;
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                открыл Он Моисею пути Свои,
                                <br /> сына́м Изра́илевым — деяния Свои:
                            </span>
                            <span className="markedRedBold">]</span>
                        </p>
                        <p className="basetIndent_6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                щедр и ми`лостив Господь,
                                <br /> долготерпелив и благ весьма,
                            </span>
                        </p>
                        <p className="petitIndent_6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedBold">[</span>
                            <span className="markedRedIndex _idGenCharOverride-1">1 </span>
                            <span className="markedBlack">
                                прогневается не до конца,
                                <br /> и враждует не вове́к.
                            </span>
                        </p>
                        <p className="petitIndent_1_5">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Не по беззакониям нашим сотворил Он нам,
                                <br /> и не по грехам нашим воздал Он нам;
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack"> но как высоки`</span>
                            <span className="markedBlack">
                                {' '}
                                небеса над землёй,
                                <br /> сильна́ милость Его к боящимся Его;
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                как восток от запада далёк,
                                <br /> беззакония наши отдали`л Он от нас;
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                как ми`лует отец детей,
                                <br /> ми`лует Господь боящихся Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Ибо знает Он состав наш,
                                <br /> па́
                            </span>
                            <span className="markedBlack">мятует, что мы — персть.</span>
                        </p>
                        <p className="petitIndent_1_5 ParaOverride-6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1 </span>
                            <span className="markedBlack">
                                Человек — дни его подобны траве,
                                <br /> как цвет полево́й, отцветают они;
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                повеет над ним — и нет его,
                                <br /> и не узна́ет его место его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Но милость Господня от века и вове́к
                                <br /> к боя´щимся Его,
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                и правда Его на сына́х сынов
                                <br /> тех, кто хранит Завет Его,
                                <br />
                                кто помнит заповеди Его
                                <br /> и претворяет их в дела.
                            </span>
                        </p>
                        <p className="petitIndent_1_5 ParaOverride-6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Господь воздвиг престол Свой на небесах,
                                <br /> и всё объе́млет царство Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Благословите Господа, все Вестники Его,
                                <br /> сильные, творящие слово Его,
                                <br /> вне́
                            </span>
                            <span className="markedBlack">
                                мля звуку сло́ва Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Благословите Господа, все Воинства Его,
                                <br /> слу`ги Его, творящие волю Его!
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Благословите Господа, все дела Его,
                                <br /> на всяком месте владычества Его!
                            </span>
                            <span className="markedRedBold">]</span>
                        </p>
                        <p className="basetIndent_5 ParaOverride-4">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Благослови Господа, душа моя,
                                <br /> и всё, что во мне, — имя святое Его! <br />
                                Благословен Ты, Господи!
                            </span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="basetIndent_5 ParaOverride-4">
                            <span className="markedBlack"> </span>
                            <span className="markedRed">Н</span>
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Благослови, душе моя, Господа.
                                <br /> Благословен еси, Господи.
                            </span>
                        </p>
                        <p className="basetIndent_5 ParaOverride-4">
                            <span className="markedBlack">
                                {' '}
                                Благослови, душе моя, Господа,
                                <br /> и вся внутренняя моя Имя святое Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Благослови, душе моя, Господа,
                                <br /> и не забывай всех воздаяний Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Очищающаго вся беззакония твоя,
                                <br /> исцеляющаго вся недуги твоя.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Избавляющаго от истления живот твой,
                                <br /> венчающаго тя милостию и щедротами.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Исполняющаго во благих желание твое:
                                <br /> обновится, яко орля, юность твоя.
                            </span>
                        </p>
                        <p className="petitIndent_1_5 ParaOverride-4">
                            <span className="markedBlack"> </span>
                            <span className="markedRedBold">[</span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Творяй милостыни Господь,
                                <br /> и судьбу всем обидимым.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Сказа пути Своя Моисеови,
                                <br /> сыновом Израилевым хотения Своя.
                            </span>
                            <span className="markedRedBold">]</span>
                        </p>
                        <p className="basetIndent_6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Щедр и милостив Господь,
                                <br /> долготерпелив и многомилостив.
                            </span>
                        </p>
                        <p className="petitIndent_6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedBold">[</span>
                            <span className="markedRedIndex _idGenCharOverride-1">1 </span>
                            <span className="markedBlack">
                                Не до конца прогневается,
                                <br /> ниже в век враждует.
                            </span>
                        </p>
                        <p className="petitIndent_1_5">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Не по беззаконием нашим сотворил есть нам,
                                <br /> ниже по грехом нашим воздал есть нам.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack"> Яко по высоте</span>
                            <span className="markedBlack">
                                {' '}
                                небесней от земли,
                                <br /> утвердил есть Господь милость Свою на боящихся Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Елико отстоят востоцы от запад,
                                <br /> удалил есть от нас беззакония наша.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Якоже щедрит отец сыны,
                                <br /> ущедри Господь боящихся Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack">
                                {' '}
                                Яко Той позна создание наше,
                                <br />
                            </span>
                            <span className="markedBlack">помяну, яко персть есмы.</span>
                        </p>
                        <p className="petitIndent_1_5 ParaOverride-6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1 </span>
                            <span className="markedBlack">
                                Человек, яко трава дние его,
                                <br /> яко цвет сельный, тако оцветет.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Яко дух пройде в нем, и не будет,
                                <br /> и не познает ктому места своего.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Милость же Господня от века и до века
                                <br /> на боящихся Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                И правда Его на сынех сынов,
                                <br /> хранящих завет Его,
                                <br /> и помнящих заповеди Его
                                <br /> творити я.
                            </span>
                        </p>
                        <p className="petitIndent_1_5 ParaOverride-6">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Господь на небеси уготова Престол Свой,
                                <br /> и Царство Его всеми обладает.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Благословите Господа, ангели Его,
                                <br /> сильнии крепостию, творящии слово Его,
                            </span>
                            <span className="markedBlack">
                                услышати глас словес Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Благословите Господа, вся силы Его,
                                <br /> слуги Его, творящии волю Его.
                                <br />
                            </span>
                            <span className="markedRedIndex _idGenCharOverride-1">2</span>
                            <span className="markedBlack CharOverride-1"> </span>
                            <span className="markedBlack">
                                Благословите Господа, вся дела Его,
                                <br /> на всяком месте владычества Его.
                            </span>
                            <span className="markedRedBold">]</span>
                        </p>
                        <p className="basetIndent_5 ParaOverride-4">
                            <span className="markedBlack"> </span>
                            <span className="markedRedIndex _idGenCharOverride-1">1</span>
                            <span className="markedBlack">
                                {' '}
                                Благослови, душе моя, Господа,
                                <br /> и вся внутренняя моя Имя святое Его. <br />
                                Благословен еси, Господи.
                            </span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">малая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedRed"> Д</span>
                    <span className="markedBlack"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedRed"> Д</span>
                    <span className="markedBlack">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Тво­ею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="markedBlack"> Всесвяту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ю, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">чную, преблагослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нную, слав­ную нашу Вла­ды­чицу Богородицу и Вечноде­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ву Ма­рию со все­ми свя­тыми помяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х се­бя, и друг друга, и всю жизнь нашу Христу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="markedBlack"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="markedBlack"> Богу пре­да­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="markedBlack">по­святи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedRed"> Н</span>
                    <span className="markedBlack"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">
                        Молитва перед пением
                        <br />
                        второго антифона
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Господи Боже наш, спаси народ Твой и благо­слови на­следие Твоё, Церковь Твою в полноте сохрани,
                        освяти лю­бя­щих красоту
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        дома Твоего; Ты в ответ прославь их Твоей бо­же­ственной си­лой и не оставь нас, на­дею­щих­ся
                        на Тебя, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> ибо Твоя власть и Твои царствие, и сила, и слава, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-1">
                    <span className="markedRed">
                        Второй антифон
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(Пс 145)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack CharOverride-3"> </span>
                    <span className="markedBlack">Хвали Господа, душа моя!</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> Восхвалю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> Господа, доко</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ле живу;
                        <br /> буду петь пред Богом моим,
                        <br /> поку
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        да есмь.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack CharOverride-3"> </span>
                    <span className="markedBlack">
                        Не надейтеся на вельмож,
                        <br /> на Адамова сына – в нём спасения нет:
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack CharOverride-3"> </span>
                    <span className="markedBlack">
                        выйдет дух его, он вернётся в землю свою,
                        <br /> в тот день погибнут все замыслы его.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack"> Бла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        го тому, кому в помощь Иакова Бог,
                        <br /> чья надежда – на Господа, на Бога своего,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        на Того, Чьё творение – небеса и земля,
                        <br /> и море, и всё, что в них,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack">
                        {' '}
                        Кто хранит верность вовек,
                        <br />
                    </span>
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">
                        для утесняемых вершит суд,
                        <br /> а
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        лчущим подаёт хлеб; <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        Господь выводит узников на свет,
                        <br /> Господь отверзает очи слепцам,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack"> Господь выпрямляет тех, кто согбе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        н,
                        <br /> Господь праведным благоволи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        т,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        Господь пришельцев хранит,
                        <br /> помогает сироте
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        и вдове,
                        <br /> но искриви
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">т неправедных путь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2 </span>
                    <span className="markedBlack">Царствует Господь вове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        к,
                        <br /> Бог твой, о Сион, – в род и род.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedRed"> Слава, и ныне.</span>
                    <span className="markedBlack"> Единородный Сын и Сло­во Бо­га,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> Ты, бессмертный, ради нашего спасения добро­вольно во­плоти­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">вшийся</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> от святой Бого­ро­дицы и Вечно­де­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">вы Ма­рии,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> неизменно воче­ло­ве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">чившийся</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> и распя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">тый, Хри­сте Боже, Смер­тию смерть попра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в­ший,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> один из Свя­той Тро­ицы,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> прославляемый вместе с От­цом и Свя­тым Ду­хом, – спаси нас!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[И далее Малая ектения, см. с. 5.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">
                        Молитва перед пением
                        <br />
                        третьего антифона
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Ты эти общие и согласные молитвы нам даро­ва</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        л и даже двоим и троим, согласно собравшимся во имя Твоё, просимое подавать обещал, – Ты же и
                        ныне прошения слуг Твоих на пользу исполни: подай нам в нынешнем веке познание Твоей Истины, а в
                        будущем Жизнь вечную дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">
                        ибо Ты благой и человеколюбивый Бог и мы вос­сылаем славу Те­бе,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Свя­тому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                    <span className="markedBlack">ныне и все­гда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Третий антифон</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-024-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-024"
                            >
                                {' '}
                                ***
                            </a>
                        </span>
                    </span>
                    <span className="markedRed">
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(Мф 5:3-12)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        Во царствии Своём вспомни о нас, Господи, <br /> когда Ты при­дёшь царствовать!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedRed"> На 12</span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        Блаженны нищие духом,
                        <br /> ибо их есть Царство Небесное.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack">
                        {' '}
                        Блаженны скорбящие,
                        <br /> ибо будут они уте
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">шены.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedRed"> На </span>
                    <span className="markedRed">10</span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                    <span className="markedBlack">
                        Блаженны кроткие,
                        <br /> ибо они примут в удел землю.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack"> Блаженны а</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        лчущие и жаждущие правды,
                        <br /> ибо будут они насыщены.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedRed"> На 8 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        Блаженны милосердные,
                        <br /> ибо будут они помилованы.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack"> Блаженны те, чьи сердца</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> чисты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ,<br /> ибо увидят они Бога.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedRed"> На 6 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        Блаженны миротворцы,
                        <br /> ибо наречены
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> они будут сына</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ми Божьими. <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack">
                        {' '}
                        Блаженны гонимые за правду,
                        <br /> ибо их есть Царство Небесное.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedRed"> На 4 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedBlack">
                        {' '}
                        Блаженны вы, когда станут вас <br /> бесчестить и гнать <br /> и лживо скажут про вас всякое{' '}
                        <br /> худое слово – из-за Меня.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedBlack">
                        {' '}
                        Радуйтесь и веселитесь, <br /> ибо велика
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> награда ваша на Небесах!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="markedRed"> [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="markedRed"> Слава.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                    <span className="markedRed"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="markedRed"> И ныне.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-6">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="markedRed">(3) Малый вход с Евангелием</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-8">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Господу помолимся!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2">
                    <span className="markedRed">Молитва перед входом</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Владыка, Господи Боже наш, Ты установил на Небесах чины</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        и воинства ангелов и архангелов для служения Твоей Славе, – соделай же, чтобы с нашим входом
                        вошли святые ангелы, вместе с нами служа
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> и прославляя Твою благость, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="markedBlack"> ибо Тебе подобает вся слава, честь и поклонение, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Благослови, владыка, святой вход!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Благословен вход </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">Благословенны входящие</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">во святое</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> святых Твоих </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> [Все продвигаются вперёд.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Показывая народу Евангелие:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Премудрость! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Ста­нем благоговейно!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-9">
                    <span className="markedRed">
                        Входная песнь
                        <br />
                        литургии оглашаемых
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Приди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те, покло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нимся и припадём ко Христу!</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> Вос­крес­ший из мёртвых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или в соответствии с празд­ником)</span>
                    <span className="markedBlack">,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> Сын Божий, спа­си нас, поющих Те­бе:</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> аллилуия!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-9">
                    <span className="markedRed"> Тропари и кондаки праздника и храма.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Господу помолимся!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">
                        Молитва перед пением <br />
                        Трисвятой песни
                    </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-023-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-023"
                            >
                                {' '}
                                ****
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Боже святой и во святыне пребывающий, Тебя Три­святой песнью серафимы воспевают и херувимы
                        славословят, Тебе все небесные силы поклоняются! Ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack"> из небытия</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> в бытие</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        всё привёл, Ты сотворил человека по Своему образу и подобию и всеми Твоими да­ра
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ми его наделил; Ты и прося</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        щему по­даёшь премудрость и разум, и согрешающего не презираешь, ибо установи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        л ему во спасение покаяние. Ты удостоил нас, убогих и недостойных слуг Твоих, и в этот час стать
                        пред лицом славы Твоего святого жертвенника и должное поклонение и славословие Тебе приносить, –
                        Ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> же, Владыка, прими</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack"> и от уст нас, грешных, Трисвяту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ю песнь и посети нас Своей благостью; прости нам все вольные и невольные согрешения, освяти
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        наши души и тела и дай нам праведно служить Тебе во все дни жизни на­шей, по хода
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ­тайству святой Богородицы и всех святых, во все века творивших угодное Тебе, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        ибо Ты свят, Боже наш, и мы воссылаем славу Тебе, Отцу и Сыну и Святому Духу, ныне и всегда
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="markedRed"> [Тихо:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Благослови, владыка, пение Трисвято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">го!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed">
                        {' '}
                        После благословения выходит дьякон перед свя­ты­ми вра­тами и, поводя орарём, даёт тон сто­ящему
                        народу, го­воря:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Трисвятое</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-022-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-022"
                            >
                                {' '}
                                *****
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Свято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й Боже, свято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й Крепкий, свято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й Бессмерт­ный, помилуй нас </span>
                    <span className="markedRed">(трижды)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Слава, и ныне. </span>
                    <span className="markedBlack">Свято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й Бессмертный, помилуй нас. Свято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й Боже, свято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й Крепкий, свято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й Бес­смерт­ный, помилуй нас.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-2">
                    <span className="markedRed">(4) Чтения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-10">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Повели, владыка!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> [Благословляя чтеца:]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Благословен, кто во имя Господне грядёт!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д </span>
                    <span className="markedBlack">Благослови, владыка, горний престол!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Благословляя горнее место:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Благословен Ты на славном престоле царствия Тво­его, Ты, восседающий на херувимах{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Дан 3:54-55)</span>
                    <span className="markedBlack">, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Вне</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">млем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedRed">Ч [и Н]</span>
                    <span className="markedBlack"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Ч</span>
                    <span className="markedBlack"> Прокимен, глас… </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Прокимны см. в приложе­ниях.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Ч</span>
                    <span className="markedBlack"> Из книги Деяний святых апостолов чтение </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> Из Соборного по­сла­ния Иакова</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> (или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> Петра</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> чтение; </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> Из Послания к римлянам </span>
                    <span className="markedRed">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> к коринфянам, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> к галатам</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">святого</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> апо­сто­ла Павла чтение</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    <span className="markedRed">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Будем внимательны!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания">
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРН-КУРСИВ">Чтение Апостола</span>
                </p>
                {apostol}
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Мир тебе, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">читавшему</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Ч</span>
                    <span className="markedBlack"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания">
                    <span className="_-ВЫДЕЛЕНИЯ_REGULAR">Проповедь</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Господу помолимся!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">
                        Молитва <br />
                        перед чтением Евангелия
                    </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-021-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-021"
                            >
                                {' '}
                                ******
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Возжги</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> в сердцах наших, человеколюби</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        вый Владыка, Твоего богопознания чистый свет и наши духовные очи открой для уразумения{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                    <span className="markedBlack">евангельской проповеди. Вложи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> в нас и страх пред Твоими благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ми за</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">поведями, дабы, одолев </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">все</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> устремления плотски</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">е, мы провели жизнь духовную, всегда мысля и совершая благоуго</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">дное Тебе, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> ибо Ты просвещение душ и тел наших, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Хри­сте</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> Боже, и мы воссылаем славу Те­бе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        вме­сте со безначальным Твоим Отцом и все­святым и благим <br />и животворящим Твоим Ду­хом,
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и все­гда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Благослови меня, владыка, – благовестителя святого апос­тола и евангелиста{' '}
                    </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Благословляя:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Бог, по хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">тайству святого славного и все­хва</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ль­ного апо­сто­ла и евангелиста </span>
                    <span className="markedRed">(имя), </span>
                    <span className="markedBlack">да даст тебе, бла­го­веству­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ю­щему, слово со многой силою для совершения Бла­го­ве­стия Своего воз­любленного Сына, Господа
                        нашего Иису­са Христа!
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Принимая Евангелие от пресвитера:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Вынося Евангелие из алтаря:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">Ч</span>
                    <span className="markedBlack"> Аллилуия, аллилуия, аллилуия,</span>
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedBlack">глас…</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Народ припевает </span>
                    <span className="markedBlack">Аллилуия </span>
                    <span className="markedRed">трижды – здесь и после каждого стиха.</span>
                    <span className="markedBlack"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Стихи см. в прило­жениях.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Во время чтения и пения аллилуария – каждение Евангелия</span>
                    <span className="markedRed CharOverride-4">,</span>
                    <span className="markedRed"> как Слова Божьего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed">
                        {' '}
                        Стоя на амвоне лицом к народу или в центре храма лицом на восток:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Премудрость! Станем благоговейно! Услышим свя­тое Евангелие!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> От </span>
                    <span className="markedRed">(имя) </span>
                    <span className="markedBlack">святого Благовестия чтение.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Слава Тебе, Господи, слава Тебе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Будем внимательны! </span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-12">
                    <span className="markedRed">Чтение Евангелия</span>
                </p>
                {gospel}
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Мир тебе, благовеству</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ющему!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Слава Тебе, Господи, слава Тебе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_REGULAR">Проповедь</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Сугубая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Возгласим мы все от всей души и от всего помышления нашего воззовём!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Господь Вседержитель, Бог отцов наших, молим Тебя, услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Помилуй нас, Боже, по великой милости Твоей, молим Тебя, услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(трижды на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Ещё мы молимся о великом господине и отце на­шем святейшем па­три­архе{' '}
                    </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        и о господине нашем преосвященнейшем митрополите{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> ар­хи­епи­скопе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">епископе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (имя)]</span>
                    <span className="markedBlack">, и обо всех во Хри­сте </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">предстоящих</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> бра­тьях наших.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Ещё мы молимся о нашей богохранимой стране </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">
                        , и обо всём народе и властях её, дабы проводить нам спокойную и тихую жизнь во всём
                        благо­честиво и до­стойно.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Ещё мы молимся о наших братьях священниках, священ­но­и</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ноках, и обо всём во Христе братстве нашем</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Ещё мы молимся о блаженных и всегда помина­емых свя­тей­ших патриархах православных, и
                        со­зда­те­лях этого святого дома{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[если в обители:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> этой свя­той обители</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack">,</span>
                    <span className="markedRed"> </span>
                    <span className="markedBlack">и о прежде почивших отцах и брать­ях </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и сё­страх наших, и о чадах </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> рабах</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Божьих </span>
                    <span className="markedRed">(имена)</span>
                    <span className="markedBlack">,</span>
                    <span className="markedRed"> </span>
                    <span className="markedBlack">и обо всех</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">, здесь и повсюду ле­жащих, пра­вослав­ных </span>
                    <span className="markedRed">[или: </span>
                    <span className="markedBlack">христианах</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        Ещё мы молимся о милости, жизни, мире, здра­вии, спа­се­нии, посещении, прощении и отпуще
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нии гре­хов чад </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> рабов</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Божьих </span>
                    <span className="markedRed">(имена)</span>
                    <span className="markedBlack">, и всех бра­тьев </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и сестёр</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> свя­того дома сего </span>
                    <span className="markedRed">[или:</span>
                    <span className="markedBlack"> святой обители сей</span>
                    <span className="markedRed">]</span>
                    <span className="markedRed CharOverride-5">.</span>
                    <span className="markedRed">
                        <span id="footnote-020-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-020"
                            >
                                {' '}
                                *******
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Ещё мы молимся о принося</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щих поже</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ртвования и де­ла­ющих доброе для этого святого и вседостойного хра­ма, о в нём трудя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щихся, пою­щих и пред­сто­я­щих лю­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">дях, ожидающих от Тебя великой и неисто­щи­мой милости.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">
                        Молитва при усердном <br />
                        (сугубом) молении
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Господи Боже наш, прими это усердное моление от служителей Твоих, и помилуй нас, по мно­жеству
                        Твоей милости, и яви
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        Твоё сострадание к нам и ко всему народу Твоему, ожидающему от Тебя неистощи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мой милости, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> ибо Ты ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">лостивый и человеколюби</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">вый Бог и мы воссылаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-1">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="markedRed">(5) Отпуст оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-9">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Оглашаемые, помолитесь Господу!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedRed">Оглашаемые</span> <span className="markedBlack">Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Ектения об оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Верные, помолимся об оглашаемых, дабы Го­сподь помиловал их,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй</span>
                    <span className="markedRed"> (на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> огласил их словом Истины,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> открыл им Евангелие правды,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> соединил их со Своей святой, ка­фо­ли­ческой </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> вселенской, соборной</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> и апостольской Цер­ко­вью.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        Спаси, помилуй, поддержи и сохрани их, Боже, Тво­ею благодатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Оглашаемые, главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> ваши пред Господом пре­кло­ни</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Преклоняя головы:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedRed">Оглашаемые</span>
                    <span className="markedBlack"> Пред Тобой, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Молитва об оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Господи Боже наш, живущий на Небесах и взи­раю­щий на всё создание Своё, воззри
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> и на рабов Твоих оглашаемых, склони</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">вших пред Тобой свои гла­вы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[</span>
                    <span className="markedRed">имена]</span>
                    <span className="markedBlack">, и дай им лёгкое бремя </span>
                    <span className="markedRed">[</span>Христово<span className="markedRed">]</span>
                    <span className="markedBlack">
                        , соделай их до­стойными членами Твоей святой Церкви и удостой их купели возрождения, прощения
                        грехов и одежды нетления, для познания Тебя, нашего истинного Бога, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        дабы и они славили с нами вседостойное и пре­кра­с­ное имя Твоё,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те! Оглашаемые, изы­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те! Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те!</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-019-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-019"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedBlack"> Пусть не останется никого из оглашаемых </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и просве­щае­мых</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">!</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-018-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-018"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> [Все непричащающиеся с благоговением покидают цер­ковь.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-Службы">
                    <span className="markedRed">
                        <a id="_idTextAnchor002" />
                        II.
                        <br />
                        Литургия верных
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-13">
                    <span className="markedRed">(1) Приуготовление</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-8">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Все верные, снова и снова в мире Господу помо­лим­ся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Молитва первая</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-017-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-017"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Господи, Ты яви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л нам это великое та</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ин­ство спасения, Ты удостоил нас, убогих и недостойных чад Своих, стать служителями Твоего
                        святого жертвенника, – Ты же и укрепи нас силой Твоего Святого Духа для этого служения, дабы,
                        не­осужде
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        нно став пред лицом Твоей святой Славы, мы приносили Тебе жертву хвалы, ведь совершаешь Ты всё
                        во всех. И да будет, Господи, наша жертва за грехи наши и совершённые по неведению Твоим народом
                        приятной и благоугодной пред лицом Твоим. –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Громко:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Ибо Тебе подобает вся слава, честь и поклонение, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во ве­ки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">
                        Великая ектения
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(сокращённая)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> О мире свыше и спасении наших душ Господу помо­лимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        О мире всего мира, об укреплении святых Божьих цер­квей и единении всех Господу помолимся.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Об этом святом доме и обо всех, с верою, благоговением и страхом Божьим входящих в него, Господу
                        по­мо­лимся.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> Об избавле</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нии нас от всякого угнетения, гнева, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">бе­ды</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> и принуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ния Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Молитва вторая</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Боже, Ты посетил на­шу малость милостью и состраданием и поставил нас, убогих, и грешных, и
                        недо­стойных чад Своих, пред лицом Твоей святой Славы для слу­жения святому жер­твеннику Твоему,
                        – Ты же и укрепи нас силой Твоего Святого Духа для этого служения и дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        й нам слово, чтобы открыть уста наши и при­зывать благодать Твоего Святого Духа на при­носи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мые нами дары</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">. –</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> </span>
                    <span className="markedRed">Громко:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Дабы мы, под Твоей властью всегда хра­ни­мые, воссылали славу Тебе,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                    <span className="markedBlack">ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed">
                        {' '}
                        Дьякон (или предстоятель) совершает малое каждение с чте­нием Пс 50
                    </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-016-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-016"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedRed">. При этом предстоятель молится:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Молитва предстоятеля о себе </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Никто из свя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">занных плотски</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ми по</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        хотями и на­слаж­де­ниями не достоин приступать и прибли­жать­ся к Тебе или слу­жить Тебе, Царю
                        Славы, ибо слу­жение Тебе – велико
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> и страшно для са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">х небес­ных сил; и однако Ты, по Своему несказа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        н­но­му и безмер­ному человеколюбию, не­пре­ложно и неизменно став Человеком и
                        Пер­во­свя­щенником нашим, при­ношение этого общего слу­жения и бескровной жертвы пере­да
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л нам как Владыка всего; ибо один Ты, Господи Бо­же наш, влады</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        чествуешь надо всем, что на небе и на земле, Ты – на престоле хе­ру­вимском носи­мый,
                        се­ра­фимов Господь и Царь Изра
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">иля, один Святой и во свя­тыне пребывающий.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Посему</span>
                    <span className="markedBlack"> прошу Тебя, одного благо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">го и внимающего моль­ба</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м: воззри</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> и на меня, грешного и негодного служителя Твоего</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-015-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-015"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedBlack">
                        , и силой Твоего Свя­того Духа укрепи меня, облечённого благодатью священства, для предстояния
                        перед Твоим свя­тым престолом и принесения в жертву Твоего свя­того и непорочного тела и
                        драгоценной кро
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ви.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Преклони</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в свою главу</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        , к Тебе приступаю и прошу Тебя: не отврати лица Твоего от меня и не извергни меня из числа сыно
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в Твоих, но бла­говоли</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        , чтобы и через ме­ня, греш­ного и недо­стой­ного служителя Твоего, были при­несены
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> Те­бе эти дары</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> ибо Ты Сам принося</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щий и приноси</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мый, при­ни­ма­ющий и раздаваемый, Христе Боже наш, и мы воссы­ла­ем славу Те­бе, вместе со
                        безначальным Твоим Отцом и все­святым и благим и живо­творящим Твоим Ду­хом, ныне и всегда и во
                        ве­ки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="markedRed">(2) Вход</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">
                        Херувимская песнь
                        <br />
                        (входная песнь Литургии верных)
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> 1-я часть Херувимской песни:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Херувимов в таинстве изображая…</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> В то же время:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Херувимов в таинстве изображая <br /> и живо­творя­щей Троице <br /> Трисвятую песнь воспевая,{' '}
                        <br />
                        вся­кое ныне жи­тейское <br /> отло
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">жим попечение,</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> дабы приня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ть нам Царя всего сущего, <br /> стражей ангельской
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="markedBlack"> незримо сопровожда</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ­емого.
                        <br />
                        Аллилуия, аллилуия, аллилуия.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> (Трижды.) </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">В Великий четверг:</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Тра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">пезы та</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        инственной Твоей, о Сын Божий,
                        <br />
                        ме­ня прича­стни­ком ныне прими
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        ,<br />
                        ибо я врагам Твоим{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Твоей</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">
                        {' '}
                        тайны не выдам
                        <br />и не дам Тебе того же целования, что Иу­да,
                        <br />
                        но, словно разбойник, исповедую Тебя:
                        <br />
                        вспомни обо мне, Го­споди, во царствии Своём!{' '}
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Аллилуия, аллилуия, аллилуия.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> В Великую субботу:</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Да молчит всякая плоть человеческая,
                        <br />
                    </span>
                    <span className="markedBlack">
                        и да стоит со страхом и трепетом,
                        <br />и ничего земного в себе да не помышляет,
                        <br />
                        ибо Царь ца
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">рствующих и Господь госпо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        дствующих
                        <br />
                        приходит, дабы быть за
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        кланным <br />и отдать Себя в пищу верным.
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> И шествуют пред Ним чины</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        ангельские,
                        <br />
                        все начала и власти,
                        <br />
                        многоокие херувимы и шестикрылые серафимы,
                        <br />
                        лица закрывая и возглашая песнь:
                        <br />
                        аллилуия, аллилуия, аллилуия.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> К народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Простите меня, братья </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и сёстры</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">, греш­ного!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Прости и ты нас, досточти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мый отче!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> У жертвенника – после омовения рук:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Боже, будь милостив ко мне, грешному!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Тихо – после проскомидии и покрытия даров:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Подыми, владыка!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Дьякону, принимающему дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Возденьте руки ваши ко св­ятыне, <br /> и бла­гословите Го­с­пода!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 133:2.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed">
                        {' '}
                        Далее совершается Великий вход с приготов­лен­ными к прино­ше­нию хле­бом и вином.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-14">
                    <span className="markedRed">
                        Проскомидийные
                        <br />
                        поминовения
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Великого господина и отца нашего </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">, свя­тей­шего патри­ар­ха Мо­сковского и всея Руси </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и господина нашего преосвящен­ней­ше­го </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">, ми­тро­по­лита </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> архиепископа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> епи­скопа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (титул)]</span>
                    <span className="markedBlack">, да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог во цар­ствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во ве­ки ве­ков;</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        преосвященных митрополитов, архиепископов и еписко­пов, и весь священнический и монашеский чин,
                        и{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">прочий</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> клир церков­ный, братьев </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и сестёр</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> святого дома сего,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст">
                    <span className="markedBlack"> вас и всех </span>
                    <span className="markedRed">(или как у греков:</span>
                    <span className="markedBlack"> и всех вас</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> право­слав­ных </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> благочестивых</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> христи­ан да вос­по</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во ве­ки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Д и Н</span>
                    <span className="markedBlack"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог твоё пресвитерство во цар­ствии Своём!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="markedRed"> К дьякону – тихо:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог твоё священнодья</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">конство во царствии Своём </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">во все дни:</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь. </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> 2-я часть Херувим­ской песни: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Дабы приня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ть нам Царя всего сущего</span>
                    <span className="markedBlack CharOverride-6">… </span>
                    <span className="markedRed">(См. с. 22.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Тихо – ставя св. дары на пре­стол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Достопочтенный Иосиф,
                        <br /> сняв с креста непорочное те­ло Твоё, <br />
                        плащани
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        цей чистой с ароматами обвил <br /> и, погребая, в гробнице новой положи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        В гробнице – телом <br /> и в аду – душой как Бог, <br />в раю – с разбойником <br /> и на
                        престоле – со Отцом и Ду­хом <br />
                        Ты пребывал, Христе, <br /> всё наполняя, не­объя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">тный.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> О, сколь живоно</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        сным и воистину
                        <br />{' '}
                    </span>
                    <span className="markedBlack">прекраснее ра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        я <br /> и све­т­лее любого царского чертога <br />
                        явился, Христе, гроб Твой – <br /> источник нашего воскресения!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Покрывая св. дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Достопочтенный Иосиф…</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Кадя св. дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Одари</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        ми­ло­с­тию Твоею Сион,
                        <br /> стены Иерусалима отстрой! <br />
                        Тогда будут жертвы угодны Тебе,
                        <br /> всесожже
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ний и возношений обряд; <br />
                        тогда возло
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        жат тельцов <br /> на алтарь Твой{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 50:20-21)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">К дьякону:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни меня, брат и сослужитель!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="markedRed"> К предстоятелю:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог твоё пресви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">тер­ство во царствии Своём!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Помолись обо мне, брат святой!</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="markedRed"> Д </span>
                    <span className="markedBlack">
                        Дух Святой да сойдёт на тебя, <br /> и Сила Вышнего да осени
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">т тебя!</span>
                    <span className="markedRed"> (Лк 1:35.)</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Тот же Дух да содействует нам во все дни жизни нашей!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни меня, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог тебя во царствии Своём </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">во все дни:</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">Просительная ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Восполним нашу молитву Господу!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> О приносимых святых дара</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedBlack">
                        Об этом святом доме и обо всех, с верою, благо­го­ве­нием и стра­хом Божьим входящих в него,
                        Господу по­мо­лимся.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> Об избавлении нас от всякого угнетения, гнева, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">бе­ды</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> и принуж­дения Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Весь день провести свято, мирно и без­греш­но у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Подай, Господи </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Ангела мира – верного наставника, хранителя душ и тел на­ших – у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Прощения и отпущения наших грехов и согрешений у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Доброго и полезного нашим ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">шам и мира миру у Господа испросим.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Остальное время нашей жизни прожить в мире и покаянии у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Безболезненной, непо­стыд­ной, мирной христианской кончины нашей жизни и доброго ответа пред
                        Христом на Страш­ном Суде испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Всесвяту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ю, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">чную, преблагослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нную, слав­ную нашу Вла­дычи­цу Богородицу и Вечноде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ву Марию со всеми свя­тыми помяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х се­бя, и друг друга, и всю жизнь нашу Христу </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> чрез Христа</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Богу пре­дадим </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">Молитва перед возношением</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="markedRed"> По поставлении св. даров на престол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Господи Боже наш, Ты созда</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        л нас и привёл в эту жизнь, Ты показал нам пути ко спасению и да­рова
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        л откровение небесных таинств! Ты поставил нас на это служение силой Твоего Святого Духа – так
                        удостой нас, Господи, стать служителями Нового Завета Твоего и совершителями Твоих святых
                        таинств. По множеству Твоей милости прими нас, приближающихся к Твоему святому жертвеннику, дабы
                        мы были достойны приносить Тебе эту духовную и бескровную жертву за грехи наши и совершённые по
                        неведению Твоим народом. Приня
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в же её на Свой святой, и пренебесный, и умопостига</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">емый жертвенник, как благоуха</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ние приятное, в ответ ниспошли нам благодать Твоего Святого Духа.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Боже, обрати Свой взор на нас, и воззри</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> на это наше служение, и прими его, как Ты при</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нял да­ры</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> Авеля, жертвы Ноя, всесож­жения Авраама, приношения Моисе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">я и Ааро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">на и мирные жерт­вы Самуи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ла. </span>
                    <span className="markedBlack">Как Ты при</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        нял от Твоих святых апостолов это истинное служение, так, по благости Твоей, Господи, прими и из
                        рук нас, грешных, эти предлежащие
                    </span>
                    <span className="markedBlack"> дары</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        , дабы и мы, удо­стоившись безупречно служить Твоему святому жерт­вен­ни­ку, обрели награду
                        верных и разумных домо­прави
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">телей в Страшный День Твоего справедливого воздаяния, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        по состраданию единородного Сына Твоего, с Кото­рым Ты благословен, вместе со всесвяты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">м и живо­творя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">щим Твоим Духом, ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-9">
                    <span className="markedRed">(3) Целование мира и исповедание веры</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Молитва перед целованием</span> мира
                    <span className="_-РЕДКИЕ_Знак-сноски-красной CharOverride-7">
                        <span id="footnote-014-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-014"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Господи </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Иисусе Христе,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedBlack">
                        Боже наш, Созидатель любви и благ Податель, дай и нам, чадам Твоим, любить друг друга, как
                        возлюбил нас Ты, дабы, соединённые любовью единой, мы к Тебе, Богу, приступили, и вознесли Тебе
                        хвалу, и причастились Твоим святым таинствам, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> ибо Ты Любовь наша и мы воссылаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">вместе со безначальным Твоим Отцом и всесвяты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-петит">t</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и животворя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-петит">t</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">щим Твоим Духом,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedRed"> Д</span>
                    <span className="markedBlack"> Возлю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">бим друг друга! </span>
                    <span className="markedRed">(Или: </span>
                    <span className="markedBlack">Будем приветст­во­вать друг друга целованием святым! – </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Рим 16:16.</span>
                    <span className="markedRed">
                        )
                        <span id="footnote-013-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-013"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedRed">П [и Н] </span>
                    <span className="markedBlack">
                        Возлюблю Тебя, Господи, крепость моя! <br /> Господь – твердыня моя{' '}
                    </span>
                    <span className="markedRed">
                        <br />
                    </span>
                    <span className="markedBlack"> и прибежище моё</span>
                    <span className="markedRed CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 17:2-3)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-б-отст">
                    <span className="markedRed"> (Триж­ды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Сослужащим [и затем народу], христосуясь:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Христос посреди нас!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed">Сослужащие [и затем народ] </span>
                    <span className="markedBlack">И есть, и будет</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-012-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-012"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed"> После преподания всем любви и мира:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Двери, двери!</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-011-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-011"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="markedBlack"> В Премудрости будем внимать!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">Символ веры</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Опахивая св. дары возду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-красн">`</span>
                    <span className="markedRed">хом: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Верую в одного Бога – Отца</span>
                    <span className="markedBlack CharOverride-4">,</span>
                    <span className="markedBlack">
                        {' '}
                        Вседержителя, Твор­ца неба и земли, всего видимого и невидимого.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        И в одного Господа Иисуса Христа, Сына Божь­его&nbsp;– еди­но­родного, от Отца рождённого прежде
                        всех вре­мён{' '}
                    </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> миров</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">
                        , Свет от Света, Бога истинного от Бо­га ис­тин­но­го, рождённого,{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">но</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">
                        {' '}
                        не сотворённого, едино­сущ­ного От­цу, – чрез Которого всё стало;
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        ради нас, людей, и для нашего спасения сшед­шего с Не­бес, и воплоти
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">вшегося от Духа Свя­того и Де­вы Ма­рии, и ставшего Человеком;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> и распя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        того за нас при Пилате Понтийском, и стра­дав­шего, и погребённого;
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> и воскресшего </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> восставшего</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> в третий день, по Пи­са­нию;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> и восшедшего </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> вознёсшегося</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> на Небеса, и воссевшего по правую руку от Отца;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> и снова гряду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        щего во Славе, дабы судить живых и мёрт­вых, и Царству Его не будет конца.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        И в Духа Святого – Господа, животворящего, от От­ца ис­ходящего, со Отцом и Сыном вместе
                        почитаемого и прославляемого, говорившего через про­роков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> В одну святую, кафоли</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">ческую </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> вселенскую, со­бор­ную</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> и апостольскую Церковь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Признаю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack"> одно крещение, ради прощения грехов.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Ожидаю воскресения мёртвых </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> и Жизни будущего века </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (т.&nbsp;е. вечной Жизни и нового состояния всего мира)
                    </span>
                    <span className="markedBlack">. </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Н]</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="markedRed">(4) Св. возношение (ана</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedRed">фора)</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-010-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-010"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Станем строго, станем благоговейно! Будем со вни­манием святое возношение в мире при­но­сить:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> жертву хвалы, милость и мир.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> К народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Благодать Господа нашего Иисуса Хри­ста, и любовь Бога и Отца, и общение Святого Ду­ха да будет
                        со всеми вами!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> И со духом твоим.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Воздев руки:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Вознесём сердца!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Возно</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">сим ко Господу.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Возблагодари</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м Господа!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Достойно это, и праведно, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и справедливо</span>
                    <span className="markedRed">]</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-009-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-009"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="markedRed">Вводная часть (префа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedRed">цио)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> О </span>
                    <span className="markedBlack">
                        Сущий, Владыка, Господь, Бог-Отец, Вседержитель, Которому подобает поклонение! Поистине достойно
                        это, и праведно,{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и справедливо,</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> и сообра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">зно великолепию святости Твоей – восхвалять Те­бя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        , воспевать Тебя, благословлять Тебя, покло­няться Тебе, благодарить Тебя и прославлять Тебя,
                        одного воистину существующего Бо­га, и с сокрушённым сердцем и сми­ре
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нным духом приносить Те­бе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> это наше духовное служение, ибо Ты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> нам дарова</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л познание Твоей Истины.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Но способен ли кто изре</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">чь могущество Твоё, возвестить все хвалы Тебе или пове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        дать все чудеса Твои, которые Ты совершаешь во всякое время? – о Ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        , Владыка всего, Господь неба и земли и всего видимого и невидимого творения, восседающий на
                        престоле Славы и прозрева
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ющий бездны, безначальный, невидимый, непостижи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мый, необъятный, неизменный, Отец Господа нашего Иисуса Христа, великого Бога и Спасителя,
                        Надежды нашей.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        Он же есть образ Твоей благости, верный отпечаток, в Себе являющий Тебя, Отца; Он есть живое
                        Сло­во, истинный Бог, превечная Премудрость, Жизнь, Освящение, Сила, Свет истинный.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> От Него и Дух Святой явился, Дух Истины, как дар усыновле</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ния, залог будущего наследия, на­ча</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ток вечных благ, животворящая сила, источник освящения.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        От этого Духа обретая силу, Тебе поклоняются <br />и воссылают неоскудева
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ющее славословие все духовные и разумные создания, ибо они все – служители Твои: Тебя восхваляют
                        ангелы, архангелы, престолы, господства, начала, власти, силы и многоокие херувимы, вокруг Тебя
                        предстоят серафимы – шесть крыл у одних и шесть крыл у других, – и двумя они покрывают лица
                        свои, а двумя – ноги, и двумя летают, в не­пре­станном славо­словии взывая друг ко другу
                        неумолка
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ющими устами,</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed">Д [или П] Соделывает звездицей образ Креста.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> победную песнь воспевая, восклицая, возглашая и говоря </span>
                    <span className="markedRed">(звездица отлагается)</span>
                    <span className="markedBlack">:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> свят, свят, свят Господь Савао</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ф </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. небесных воинств)</span>
                    <span className="markedBlack">; полны</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> небо и зе­мля Славы Твоей! Оса</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">н­на </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. спасение)</span>
                    <span className="markedBlack"> в выш­них! Благословен Гряду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">­щий во имя Господне! Оса</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">н­на в вышних! </span>
                    <span className="markedRed">(Народ вторит.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        С этими блаженными силами, человеколюбивый Владыка, и мы, грешные, восклицаем и говорим: Ты
                        поистине свят и всесвят, и нет меры великолепию святости Твоей; и праведен Ты во всех делах
                        Своих, ибо Ты всё навёл на нас по справедливости и истинному суду!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="markedRed">Воспоминание (ана</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedRed">мнесис)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> Ты созда</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        л человека, взяв прах из земли, и образом Твоим, Боже, его почтил, и посели
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        л его в раю сладостном, пообещав ему бессмертную Жизнь и наслаждение вечными бла
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">гами через соблюдение за</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">поведей Твоих. Но ослу</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">шавшего­ся Тебя, истинного Бога, созда</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        вшего его, и об­ма­ном змия прельщённого, и умерщвлённого собствен­ными согреше­ниями, Ты изгнал
                        его по справедливому су­ду Твоему, Боже, из ра
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        я в мир сей и воз­вратил в землю, из которой он был взят, уготовля
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">я ему спасение через возрождение в Само</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м Твоём Христе.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Ты не отвратился окончательно от Своего создания, которое сотворил, о Благо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        й, и не забыл дело рук Своих, но по Своему милосердию мно­гообра
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">зно посещал его: Ты посылал пророков, творил зна</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мения через Своих святых, в каждом роде благоугожда</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        вших Тебе, Ты говорил нам устами Своих слуг пророков, предвозвещая нам грядущее спасение, Ты
                        Закон дал в помощь и ангелов поставил хранителями. А когда настала полнота времён, Ты говорил
                        нам в Само
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        м Своём Сыне, чрез Которого Ты и ход веков сотворил. Он же, будучи излуче­нием Твоей Славы и
                        отпечатком Сущности{' '}
                    </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">Ипостаси</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">
                        {' '}
                        Твоей, всё держа могущественным словом Своим, не почитал хищением быть равным Тебе, Богу и Отцу;
                        но, будучи Богом превечным, Он явился на земле и жил с людьми и, от святой Девы воплотившись,
                        ума
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">­лил Само­го</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">` </span>
                    <span className="markedBlack">Себя, при­ня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в человеческий облик и соделавшись подобным уничиже</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        нному телу на­шему, дабы и нас соделать подобными Своему славному образу.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Поскольку через человека грех вошёл в мир и через грех </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">пришла</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">
                        {' '}
                        смерть, Твой единородный Сын, сущий в недрах Твоих, Бога и Отца, родился от женщины – святой
                        Богородицы и Вечноде
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">вы Марии, – родился под Законом, чтобы в Своей пло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ти осудить грех, дабы умирающие в Адаме оживотво­ри</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">лись в Само</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м Твоём Христе. А прожи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в в мире сем, дав спаси­тельные повеления и избавив нас от и</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        доль­ского заблуждения, Он при­вёл нас к познанию Тебя, истинного Бога и От­ца, приобретя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> Себе нас как народ и</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        збранный, царственное священство, род святой. И очистив нас во­дою и освятив Духом Святым, Он
                        вместо нас Себя отда
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л смерти, которой принадлежали мы, про</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        данные под власть Греха. И сойдя чрез крест во ад, чтобы Собой наполнить всё, Он расторг утробу
                        смерти. И воскре
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">с­нув в третий день и проложи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в путь всякой пло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ­ти к воскре­сению из мёртвых&nbsp;– ибо невозможно было тлению удержать Начальника
                        Жизни,&nbsp;– Он соделался на­ча
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">т­ком усопших, пе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        рвенцем из мёртвых, дабы иметь Ему между всеми во всём первенство. И взойдя на Небеса, Он{' '}
                    </span>
                    <span className="markedBlack">
                        воссел по правую сторону Твоего величия в вышних; Он и придёт воздать каждому по делам его.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Он же в воспоминание Своего спасительного страдания оставил нам то, что мы ныне, по заповеди
                        Его, возлагаем пред Тобою. Ибо намере­ва
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ясь вый­ти на&nbsp;Свою добровольную, и славную, и жи­во­творя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        щую смерть, Он в ту ночь, в которую отдавал Себя за Жизнь мира, взяв хлеб в Свои святые и
                        непорочные руки и показав его Тебе, Богу и Отцу, возблагода­рив и благословив, освятив, преломи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л и</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> пода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л его Своим святым ученикам и апостолам, сказав: «Прими</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те, вкуси</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те, это тело Моё, за вас преломляемое ради прощения грехов».</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П </span>
                    <span className="markedBlack">Так же взяв и чашу с пло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">дом вино­градной лозы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> и смешав вино с водой, возблагодарив и благословив, освятив,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> пода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        л её Своим святым ученикам и апостолам, сказав: «Пейте из неё все, это кровь Моя, кровь Нового
                        Завета, за вас и за многих изливаемая ради прощения грехов.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П </span>
                    <span className="markedBlack">
                        Сие творите в воспоминание обо Мне. Ибо всякий раз, когда вы еди
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        те этот хлеб и пьёте чашу сию, Мою Смерть возве­щаете, Моё Воскресение испове
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">дуете».</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Вот, Владыка, и мы, воспомина</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">я Его спасительные страдания, животворя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        щий крест, тридневное погребение, из мёртвых воскресение, на Небеса восхождение, по правую руку
                        от Тебя, Бога и Отца, восседание и Его славное и страшное Второе Пришествие,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed">Д [или П] Возносит хлеб и вино.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Твоё из Твоего Тебе принося всегда и везде</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-008-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-008"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedBlack">,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Тебя воспеваем, Тебя благословляем, Тебя бла­го­да­рим, Господи, и Тебе молимся, Боже наш!{' '}
                    </span>
                    <span className="markedRed">(На­род вто­рит.)</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-007-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-007"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-17">
                    <span className="markedRed">Призывание (эпи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedRed">клесис)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Посему</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        , Владыка всесвятой, и мы, Твои грешные и недостойные служи­тели, удостоенные служить Твоему
                        святому жертвеннику не по пра­вед­ности нашей, ибо ничего доброго не совершили на земле, но по
                        Твоей милос­ти и состраданию Твоему, которые Ты обильно излил на нас, с дерз­но­вением
                        приближаемся к Твоему святому жертвен­ни­ку и, возложи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в пред Тобой ото</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">бра­зы </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (т.&nbsp; е. реальное подобие, заместительные образы)
                    </span>
                    <span className="markedBlack">
                        {' '}
                        святого Тела и Крови Твоего Христа, Тебе мо­лимся и просим Тебя, о Святой святых, чтобы по
                        благо­воле
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        нию Твоей благости пришёл Твой Дух Святой на нас и на эти предлежащие дары
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">, и благословил их, и освятил, и явил:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Благослови, владыка, святой хлеб!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="markedRed"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> этот хлеб – сами</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        м святым телом Господа, и Бога, и Спа­сителя нашего Иисуса Христа,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д [и Н]</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Благослови, владыка, святую чашу!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> а чашу сию – само</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        й святою кровью Господа, и Бога, и Спасителя нашего Иисуса Христа,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedRed">Д [и Н]</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> [Благословляя:]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> проли</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">той за Жизнь мира </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и спасение</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Д [и Н]</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Благослови, владыка, их вместе!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Благословляя: </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Преложи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в </span>
                    <span className="markedRed">(т. е. перемени</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-красн">t</span>
                    <span className="markedRed">в)</span>
                    <span className="markedBlack"> Твоим Духом Святым.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-006-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-006"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedBlack"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Д [и Н]</span>
                    <span className="markedBlack"> Аминь, аминь, аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни меня, святой владыка, грешного!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнит Господь Бог тебя во царствии Своём </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">во все дни:</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Отходя на прежнее место:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="markedRed">Ход</span>
                    <span className="markedRed">а</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedRed">тайство (интерц</span>
                    <span className="markedRed">е</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedRed">ссио)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Нас же всех, от одного хлеба и одной чаши причащающихся, соедини друг со другом для обще­ния
                        одного Святого Духа, и соделай так, чтобы никто из нас не причащался святому те­лу и кро
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ви Твоего Христа в су­д или во осуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ние, но чтобы мы снискали Твою милость и благоволение – вместе со всеми святыми, во все века
                        тво­рившими угодное Те­бе:{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> с пра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        отцами, отцами, пат­риар­хами, пророками, апостолами, про­по­ведниками, благове
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">стниками, мучени­ками, исповедниками, учи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">­телями, и со ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">хами всех праведников, в вере достиг­ших совершенства </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">почивших</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> и особенно со всесвято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">чной, пре­благослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нной, славной нашей Владычицей Богородицей и Вечноде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">вой Марией;</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Во время каждения св. даров:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> О тебе радуется, Благодатная, всё творение,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> ангельский собор и человечес­кий род!</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> О храм освящённый и духовный рай,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> дев хвала,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> от тебя Бог воплотился</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> и – превечный Бог наш – Младенцем стал.</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> Он утробу твою престолом сотворил</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> и чрево твоё про­страннее небес соделал.</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> О тебе радуется, Благодатная, всё творение – слава тебе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П </span>
                    <span className="markedBlack">
                        и со святым Иоанном, пророком, Предтечей и Крестителем, со святыми славными и всехвальными
                        апостолами,
                    </span>{' '}
                    <span className="markedBlack">со святыми </span>
                    <span className="markedRed">(имена)</span>
                    <span className="markedBlack">
                        , которых па­мять ныне совершаем, и со всеми святыми Твоими, по молит­вам которых воззри на нас,
                        Боже.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> И ещё воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мни всех прежде усопших с надеждой на воскресение для Жизни вечной{' '}
                    </span>
                    <span className="markedBlack">чад </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> рабов</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Твоих </span>
                    <span className="markedRed">(имена усопших)</span>
                    <span className="markedBlack">, и упокой их там, где сияет свет лица Твоего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Ещё мы мо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">лим Тебя</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> о спасении, посещении и отпущении грехов чад </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> рабов</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Твоих </span>
                    <span className="markedRed">(имена живых)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Ещё мы мо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">лим Тебя: воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Господи, Твою святую, кафолическую </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">вселенскую, соборную</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">
                        {' '}
                        и апостольскую Церковь, существующую от края до края земли, и умиротвори
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> её, ту, что при­обрёл Ты </span>
                    <span className="markedBlack">
                        драгоценной Кровью Твоего Христа, и этот святой дом утверди до скончания века.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мни, Господи, принёсших Тебе эти дары, и тех, за кого и через кого, и то, ради чего они
                        при­несли их.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Господи, принося</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щих поже</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ртвования и делаю­щих доброе для Твоих святых церквей и заботящихся о бедных. Воздай им Твоими
                        неистощимыми небесными дара
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ми, дару</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й им вместо земного – небесное, вместо вре</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">менного – вечное, вместо тленного – нетленное.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Господи, находящихся в пусты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нях и гора</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х, в пещерах и ущельях земли.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Господи, пребывающих в девстве, и благо­честии, и подви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">жничестве, и в чистой жизни.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мни, Господи, всякое начальство и власть, и наших братьев, находящихся в правительстве, и всё
                        воинство: добрых в доброте
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> сохрани, злых добрыми соделай, по благости Твоей.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мни, Господи, предстоящих людей и по ува­житель­ным причинам отсутствующих и помилуй их и нас,
                        по множеству Твоей милости. Закрома
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> их наполни всяким добро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        м, супругов в мире и единомыс­лии сохрани, младен­цев воспитай, юность наставь, старость
                        поддержи, мало­ду
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        шных утешь, расточённых собери, заблудших обрати и соедини с Твоей святой, кафолической{' '}
                    </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">вселенской, соборной</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> и апостольской Цер­ковью. Обуреваемых ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        хами нечистыми – освободи, плавающих со­про­води, путешествующим сопутствуй, за вдов заступись,
                        сиро
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">т защити, пленных избавь, боль­ных исцели.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Боже, тех, кто </span>
                    <span className="markedRed">(</span>
                    <span className="markedBlack">пребывает</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> под судом и на рудни­ка</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х, в ссылках и на горьких работах, и </span>
                    <span className="markedBlack">во всяком угнетении, принужде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нии и в беде, как и всех нужда­ющихся в Твоём великом благо­се</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">рдии: и лю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        бящих нас, и ненавидя­щих, и поручивших нам, недостойным, молиться за них.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> И весь Твой народ воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мни, Господи Боже наш, и на всех излей Твою неистощимую милость, всем подавая просимое для
                        спасения.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> И тех, кого мы не воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мнили по неве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">дению, или забвению, или из-за множества имён, Сам воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мни их, Боже, знающий каждого возраст и имя, знающий каждого от чрева матери его, ведь Ты,
                        Господи, – помощь для беспо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мощных, надежда для отча</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">явшихся, спаситель для те</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">р­пя­щих крушение, для плавающих при</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">стань, для боля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        щих врач. Ты Сам будь для всех всем, ведь Ты знаешь каждого человека – и прошения его, каждый
                        дом – и ну
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">жды его.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Избавь, Господи, и этот град </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> это село </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> эту святую обитель</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack">, как и все города</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        и страны, от голода, эпидемии, землетрясения, наводнения, пожара, меча, нападения иноземцев и
                        междо­усоб­ных войн.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> И среди первых воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Господи, великого гос­подина и отца на­шего </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">, святейшего па­триарха Москов­ско­го и всея Ру­си, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и господина на­шего преосвященнейшего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">, мит­ропо­ли­та </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> ар­хи­епи­скопа, епископа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (титул)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> и да­ру</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й ему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/им</span>
                    <span className="markedBlack"> слу­жить Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-им</span>
                    <span className="markedBlack"> святой</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-ым</span>
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">цер­кви</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-а</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м</span>
                    <span className="markedBlack"> в ми­ре, в чести, невредимым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="markedBlack">, здра­вым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="markedBlack">, дол­го­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">н­ству­ю­щим</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="markedBlack">, пра­виль­но пре­подаю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щим</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="markedBlack"> сло­во Твоей Ис­тины;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д </span>
                    <span className="markedBlack">и всех </span>
                    <span className="markedRed">(</span>
                    <span className="markedBlack">присутствующих здесь</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> братьев и се­стёр! </span>
                    <span className="markedRed">(На­род вторит:</span>
                    <span className="markedBlack"> и всех братьев и сестёр.</span>
                    <span className="markedRed">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Господи, и всех епископов православных, правильно преподаю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щих слово Твоей Истины.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мни, Господи, по Сво­ему многому состраданию, и моё недостоинство, и прости мне все вольные и
                        невольные согрешения, и по моим грехам не воспрепятствуй благодати Твоего Святого Духа сойти на
                        лежащие пред Тобой дары
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мни, Господи, и </span>
                    <span className="markedRed">(</span>
                    <span className="markedBlack">всех</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> пресви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">теров, во Хри­сте дья</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">конов, и весь иной священ­нослу­жа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">­щий чин, и не посрами</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> никого из нас, сто­я</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">щих вокруг Твоего святого жертвенника.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Посети нас в благости Твоей, Господи, явись нам в Своём неистощимом сострадании: благоприятную и
                        полезную погоду нам дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й, подай тихие дожди земле для плодородия; благослови увенча</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ние времён года благос­тью Твоей; положи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> конец разделению церквей, угаси</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> вражду язычников </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">народов</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">, восстания е</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ресей скоро расстрой, силой Твоего Святого Духа;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> всех нас прими в Твоё Царство, соделав сына</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ми света и сына</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ми дня; </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Твой Мир и Твою Любовь дару</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й нам, Господи Боже наш, ибо Ты уже всё свершил ради нас.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> И дай нам едиными уста</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ми и единым сердцем про­слав­лять и воспевать вседостойное и прекра­с­ное имя Твоё,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и все­гда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-19">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="markedRed">(5) Приготовление ко причащению</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-10">
                    <span className="markedRed"> Народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        И да будут милости великого Бога и Спаси­теля нашего Иисуса Христа со всеми вами!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> И со духом твоим.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="markedRed">
                        Просительная Ектения
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед Молитвой Господней)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedRed"> Д </span>
                    <span className="markedBlack">Всех святых воспомяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в, снова и снова в мире Го­спо­ду помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> О принесённых и освящённых святых дара</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х Го­споду помолимся,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> дабы человеколюбивый Бог наш, приня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в их на Свой свя­той и пре­небесный и умопостига</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">емый жер­твен­ник, словно бла­го­уха</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ние духовное, в ответ нис­по­сла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        л нам бо­же­ственную благодать и дар Святого Ду­ха. – Помо­лим­ся!
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedBlack">Об избавле</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нии нас от всякого угнетения, гнева, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">бе­ды</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> и принуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ния Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Весь день провести свято, мирно и без­греш­но у Го­спо­да испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Подай, Господи </span>
                    <span className="markedRed">(на каждое прошение)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Ангела мира – верного наставника, хранителя душ и тел наших – у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Прощения и отпущения наших грехов и согрешений у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Доброго и полезного нашим ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">шам и мира миру у Господа испро­сим.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Остальное время нашей жизни прожить в мире и покаянии у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        Безболезненной, не­по­стыд­ной, мирной христианской кончины нашей жизни и доброго ответа пред
                        Христом на Страш­ном Суде испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Единства веры и общения Святого Духа испросив, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">х се­бя, и друг друга, и всю жизнь нашу Христу </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> чрез Христа</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Богу пре­дадим </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Молитва перед причащением</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П </span>
                    <span className="markedBlack">
                        Боже наш, Бог спасающий, научи нас достойно благодарить Тебя за Твои благодея
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ния, которые Ты для нас совершил и совершаешь. Ты, Боже наш, при
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нял эти дары</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">, – очисти же нас от всякой скверны пло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ти и духа и научи в страхе Твоём достигать со­верше</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        нной святости, дабы, принимая с чистым свидетельством нашей совести часть от святынь Твоих, мы
                        соединились со святым телом и кровью Твоего Христа, и, приня
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        в их достойно, Христа имели живущим в сердцах наших и стали храмом Твоего Святого Духа.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        Боже наш, соделай же, чтобы никто из нас не был виновным пред этими Твоими страшными и небесными
                        таинства­ми или не
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        мощным душой и телом от недостойного им прича­щения, но дай нам до нашего последнего вздоха
                        достойно принимать часть от святынь Твоих для достижения Жиз­ни вечной и благоприя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        тного ответа на Стра­шном Суде пред Твоим Христом, дабы и мы, со всеми святыми, во все века
                        творившими угодное Тебе, стали причаст
                    </span>
                    <span className="markedBlack">никами Твоих вечных благ, которые Ты угото</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">вал лю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">бящим Тебя, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> И удостой нас, Владыка, со дерзновением не­осуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нно сметь именовать Тебя, Небесного Бо­га, Отцом и говорить </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> воспевать</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">: </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="markedRed"> П и Н</span>
                    <span className="markedBlack">
                        {' '}
                        Отец наш Небесный!
                        <br />
                        да святи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        тся имя Твоё,
                        <br />
                        да придёт Царство Твоё,
                        <br />
                        да будет воля Твоя
                        <br />и на земле, как на Небе;
                        <br />
                        хлеб наш насущный подай нам сегодня,
                        <br />и прости нам долги
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        наши,
                        <br />
                        как и мы простили должникам нашим,
                        <br />и не введи нас во искушение,
                        <br />
                        но избавь нас от лукавого <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. от зла или от злого – дьявола)</span>
                    <span className="markedBlack">, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> ибо Твои царствие, и сила, и слава, </span>
                    <span className="markedBlack CharOverride-2">
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack">
                        {' '}
                        <br />
                        ныне и всегда и во веки веков{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Мф 6:9-13)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-8">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П </span>
                    <span className="markedBlack">Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н </span>
                    <span className="markedBlack">И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">` </span>
                    <span className="markedBlack">наши пред Господом прекло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ним!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Пред Тобой, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="markedRed">Молитва главопреклонная</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> О Владыка Господь, Отец сострадания и Бог всякого утеше</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ния, склони</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">вших пред Тобой свои главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> благослови, освяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">, сохрани, укрепи, утвер­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        , от всякого злого дела отврати и со всяким добрым делом сочетай, и удостой их не­осуж­де
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">нно причаститься этим </span>
                    <span className="markedBlack">
                        Твоим непорочным и жи­во­творящим таинствам для прощения грехов и общения Святого Духа, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack">
                        {' '}
                        по милости, и состраданию, и человеколюбию еди­нород­ного Сына Твоего, с Которым Ты благословен,
                        вместе со всесвя­ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">м и живо­тво­ря</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">щим Твоим Ду­хом, ны­не и все­гда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-10">
                    <span className="markedRed">
                        Молитва
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед возношением св. хлеба)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="markedRed"> Тихо: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Вне</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мли, Господи Иисусе Христе, Боже наш, из свя­той обители Своей</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-005-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-005"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedBlack">, и при­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">, дабы освя­ти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ть нас, – Ты, со Отцом на Не­бе­сах восседающий и с нами невидимо здесь при­су­т­ствую­щий, – и
                        бла­го­воли
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> Твоей сильной рукою пре­пода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ть нам часть от Твоего непорочного тела и драгоценной крови, и через нас – всему народу{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Твоему</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[П и Д</span>
                    <span className="markedBlack"> Боже, будь милостив ко мне, грешному! </span>
                    <span className="markedRed">(Трижды.)]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Будем внимательны!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="markedRed"> Вознося св. хлеб:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Святыня – святы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack">
                        {' '}
                        Один Святой, один Господь – Иисус Христос, во сла­ву Бога-Отца, аминь.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Раздроби, владыка, святой хлеб!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Раздробляется и раздаётся Агнец Божий, <br /> раз­дро­б­ля­емый и не разделяемый, <br />
                        всегда вкушаемый и ни­когда не оскудева
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ющий, <br /> но причаща
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ющихся освя­ща</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ющий.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Дополни, владыка, святой поти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">р!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Влагая частицу ИС в св. потир </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (т. е. как бы воссо­единяя с Духом Жизни Тело и Кровь Хри­стовы)
                    </span>
                    <span className="markedRed">:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Полнота </span>
                    <span className="markedRed">(</span>
                    <span className="markedBlack">об­щения</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Духа Святого.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Д</span>
                    <span className="markedBlack"> Аминь. Благослови, владыка, теплоту!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Благословенна </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">живая</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> теплота святынь Тво­их, ныне и все­гда и во веки веков, аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Вливая в св. потир теплоту:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Теплота веры, наполненная Духом Святым</span>
                    <span className="markedRed"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. Духом Жизни)</span>
                    <span className="markedBlack">, аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Дробится частица ХС для причащения в алтаре</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-004-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-004"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedRed">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-20">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-1">
                    <span className="markedRed">(6) Св. причащение</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="markedRed">Молитва перед св. дарами</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[П</span>
                    <span className="markedBlack"> Молимся всею церковью!</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedRed">П [и Н]</span>
                    <span className="markedBlack">
                        {' '}
                        Верую, Господи, и ис­по­ве­дую, что Ты – по­истине Христос, Сын Бога жи­во­го, пришедший в мир
                        гр
                    </span>
                    <span className="markedBlack">
                        ешников спасти, первый из ко­то­рых – я. Ещё верую, что вот это – непорочное те­ло Твоё, а вот
                        это – драгоценная кровь Твоя.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст-абз">
                    <span className="markedBlack">
                        Молю же Тебя: помилуй меня и прости мне вольные и невольные со­греше­ния мои, соде­ланные словом
                        или делом, в ве
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">дении или неве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">­дении, и удостой меня не­осуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        н­но причас­титься Твоим непорочным таин­ствам для про­щения гре­хов и Жизни вечной, аминь.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="markedBlack"> Тра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">пезы та</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        инственной Твоей, о Сын Божий, ме­ня при­­част­ни­ком и ныне прими
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">, ибо я врагам</span>
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Твоим </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Твоей</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack">
                        {' '}
                        тайны не выдам и не дам Тебе того же целования, что Иу­да, но, словно разбойник, ис­пове
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">дую Те­бя: вспо­м­ни обо м­не, Го­споди, во цар­ствии ­Своём! </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        Прича­щение Твоим святым таинствам, Го­спо­ди, да будет мне не в суд или во осужде
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ние, но для ис­целения ду­ши и тела!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-21">
                    <span className="markedRed">Причащение в алтаре</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed"> Н Причастный стих</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-003-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-003"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedRed">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Дьякон, приступи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        Вот, я приступаю к бессмертному Царю и Богу нашему.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack">
                        {' '}
                        Преподай мне, владыка, драгоценное и святое тело Го­спо­да и Бога и Спасителя нашего Иисуса
                        Христа!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Священнодьякону </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">
                        {' '}
                        преподаётся драгоценное, и свя­тое, и непорочное тело Господа и Бога и Спаси­теля нашего Иисуса
                        Христа для про­ще­ния грехов его и Жизни вечной.{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Аминь.</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Причащаясь сам:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        Вот, я приступаю к бессмертному Царю и Богу нашему.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack">
                        {' '}
                        Драгоценное и всесвятое тело Го­спо­да и Бога и Спа­сителя нашего Иисуса Христа пре­по­даётся
                        мне, пре­свитеру{' '}
                    </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">,</span>
                    <span className="markedRed"> </span>
                    <span className="markedBlack">для прощения грехов мо­их и Жизни вечной. </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Аминь.</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        Драгоценная и святая кровь Господа и Бога и Спаси­теля нашего Иисуса Христа преподаётся мне,
                        пре­сви­теру{' '}
                    </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">, </span>
                    <span className="markedBlack">для прощения грехов мо­их и Жизни вечной.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Целуя чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Вот, это коснулось уст моих, и удали</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">т беззакония мои, и от моих грехов меня очи­стит </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Ис 6:7)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Дьякон, приступи!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Вот, я приступаю к бессмертному Царю и Богу нашему. Преподай мне, владыка, драгоценную и свя­тую
                        кровь Господа и Бога и Спасителя нашего Иису­са Христа!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Служителю Божьему дьякону </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">
                        {' '}
                        преподаётся драгоценная и святая кро­вь Го­спода и Бога и Спаси­теля нашего Иисуса Хри­ста для
                        про­ще­ния гре­хов его и Жизни вечной.{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Аминь.</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Дьякону после причащения:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Вот, это коснулось уст тво­их, и удали</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">т беззакония твои, и от твоих грехов те­бя очистит.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed">
                        {' '}
                        Дробится св. агнец (частицы НИ и КА) и гото­вится св. чаша для народа.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="markedRed">Причащение народа в храме</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed"> В царских вратах народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Со страхом Божьим, и верою, </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">и любовью</span>
                    <span className="markedRed">]</span>
                    <span className="markedBlack"> при­сту­пи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Медленно:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack">
                        {' '}
                        Благословен Грядущий во имя Господне; <br />{' '}
                    </span>
                    <span className="markedBlack">Бог – Го­сподь, и воссиял Он нам! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 117:26-27)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Причащая:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Чаду </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> рабу</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Божьему </span>
                    <span className="markedRed">(имя)</span>
                    <span className="markedBlack">
                        {' '}
                        преподаётся дра­гоцен­ное и свя­то­е тело и кровь Господа и Бо­га и Спа­сителя нашего Иисуса
                        Христа для про­щения грехов его и Жизни вечной.{' '}
                    </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Аминь.</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> При этом медленно поётся причастный стих:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Тело Христово прими</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те, от источника бессмер­тия вку­си­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="markedRed">После причащения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Увидев Воскресение Христа, покло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        нимся свя­то­му Го­споду Иисусу, одному безгрешному! Кре­сту Твоему поклоняемся, Христе, и
                        святое Вос­кре­сение Твоё по­ём и славим; Ты – Бог наш, кро­ме Тебя иного не зна­ем и имя Твоё
                        призы­ва­ем. При­ди
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">те, все вер­ные, по­кло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        нимся святому Христову Воскресе­нию, ибо при­шла через Крест радость все­му миру! Всегда
                        благо­слов­ляя Госпо­да, воспеваем Вос­кре­сение Его: Он, ради нас распятие претерпев, Смер­тию
                        смерть победил!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        Светись же, светись, новый Иерусалим, ибо Сла­ва Го­сподня над тобою взошла; ныне тор­жествуй и
                        весе­лись, Сион; а ты, чистая Богоро­дица, радуйся Воскре­сению Рождённого тобой.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack">
                        {' '}
                        О Христос – Пасха великая и святейшая, Пре­муд­рость, Божье Слово и Сила! Дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й нам полнее </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> совершеннее</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> к Тебе приобщаться в невечер­ний день Царства Твоего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Отирая оставшиеся частицы с дискоса в чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Своей непорочной Кро­вью отмой от грехов, Го­с­поди, всех воспомина
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">в­ших­ся здесь, по хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">тай­ству святых Твоих!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-22">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="markedRed">(7) Благодарение после причащения</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="markedRed"> Благословляя народ, в заключение: </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Спаси, Бо­же, народ Твой <br /> и благослови наследие Твоё!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 27:9.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack CharOverride-2"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Мы узре</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ли Свет истинный, <br /> при
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        няли Духа Небесно­го, <br />
                        обрели мы веру истинную, <br /> поклоняясь неразде­ль­ной Троице, <br /> ибо Она спасла нас.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Кадя св. чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Превыше небес, Боже, восстань, <br /> распростри
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack"> над зе­м­лёй Славу Твою </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 56:6)</span>
                    <span className="markedBlack"> –</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Относя св. чашу на жертвенник:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[</span>
                    <span className="markedBlack">Благословен Бог наш –</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> К народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Да наполнятся уста наши</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> хвалою Тебе, Госпо­ди,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> дабы нам воспевать славу Твою,</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> ибо Ты удостоил нас сопричастия</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack">
                        {' '}
                        Твоим святым, бо­же­ст­венным, бес­смер­т­ным и животворящим та­инст­вам.
                    </span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> Сохрани нас в Твоём освящении</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> раз­мыш­ля­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ющими весь день о прав­де Твоей.</span>
                    <span className="markedRed">/</span>
                    <span className="markedBlack"> Аллилуия, аллилуия, аллилуия.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-10">
                    <span className="markedRed">Ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Станем благогове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        йно! Причастившись божест­вен­ным, святым, непорочным, бессмертным, не­бесным и жи­во­тво­рящим,
                        страшным Христовым таинствам, до­стойно воз­благодари
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м Господа!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Весь день провести свято, мирно и без­греш­но ис­про­си</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">х себя, и друг друга, и всю жизнь нашу Хри­сту </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> чрез Христа</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack"> Богу пре­дади</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м </span>
                    <span className="markedRed">(или: </span>
                    <span className="markedBlack">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">м</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">
                        Молитва благодарственная
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(после причащения всех)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П </span>
                    <span className="markedBlack">
                        Благодарим Тебя, Господи Боже наш, за причащение Твоим святым, непорочным, бессмертным и
                        небесным таинствам, которые Ты нам дарова
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">л для бла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        га, и освящения, и исцеления душ и тел наших, – Ты же, Владыка всего, дай нам, чтобы приобщение
                        свя­тому телу и крови Твоего Христа вело к вере непостыдной и любви непритворной, к приумноже
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        нию премудрости и исцелению души и тела, к отогнанию всякого противника и соблюдению Твоих за
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        поведей, ко благоприятному ответу на Страшном Суде пред Твоим Христом, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Совершая Евангелием образ Креста над анти­­-мин­сом:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> ибо Ты освящение наше и мы воссы­лаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">От­цу и Сыну и Святому Духу,]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed"> Древний отпуст:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Пойдём в мире!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> С именем Господним.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> При выходе из храма:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Д</span>
                    <span className="markedBlack"> Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Н</span>
                    <span className="markedBlack"> Господи, помилуй.</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="markedRed">Молитва заамвонная</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedRed"> П</span>
                    <span className="markedBlack"> Господи, </span>
                    <span className="markedBlack">благословля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">ющих Тебя благословля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        ющий и полагающихся на Тебя освящающий! Спаси народ Твой и благослови наследие Твоё, Цер­ковь
                        Твою в полноте со­хра­ни, освяти любя­щих красоту
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        {' '}
                        дома Твоего; Ты в ответ прославь их Твоей божественной силой и не ос­тавь нас, на­деющихся на
                        Тебя; д
                    </span>
                    <span className="markedBlack">а</span>
                    <span className="markedBlack">р</span>
                    <span className="markedBlack">у</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й мир миру Твоему, церква</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        м Твоим, свя­щен­ству, нашим правителям, и все­му народу Твоему, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        ибо всякое даяние доброе и всякий дар совер­шенный нисходит свыше – от Тебя, Отца све­тов{' '}
                    </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> светил</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">, и мы вос­сы­ла­ем славу, и благодарение, и поклонение Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сы­ну и Свя­тому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="markedBlack"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-23">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="markedRed">(8) Заключительные молитвы</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="markedRed">
                        Молитва «в сосудохранилище» <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">
                        (перед снятием священных одежд и на потребление <br />
                        св. даров или перед агапической трапезой)
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Исполнились и совершились, насколько в наших силах, Христе Боже наш, таин­ства Твоего замысла{' '}
                    </span>
                    <span className="markedRed">(или:</span>
                    <span className="markedBlack"> промысла</span>
                    <span className="markedRed">)</span>
                    <span className="markedBlack">
                        : мы воспоминали Смерть Твою, видели образ Твоего Вос­кресения, преисполнились{' '}
                    </span>
                    <span className="markedBlack">
                        Твоей бесконечной Жизни, вкусили Твоего неистощимого наслаждения, которого и в будущем веке нам
                        всем удостоиться благоволи, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack">
                        {' '}
                        по милости безначального Отца Твоего и святого и благого и животворящего Твоего Духа, ныне и
                        всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[Н]</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Да будет имя Господне благословенно – отныне и до века! </span>
                    <span className="markedRed">(Трижды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-24">
                    <span className="markedRed"> Далее бывает раздача хлеба – антидора и про­сфор.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-24">
                    <span className="markedRed"> Н Пс 33</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-002-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-002"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedRed"> (может петься и в начале трапезы любви, т.&nbsp;е. агапы).</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-24">
                    <span className="markedRed"> Бла­го­словляя народ на уход, возможно после об­щей трапезы:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack">
                        {' '}
                        Благословение Го­сподне на вас, по Его милости и человеколюбию, ны­не и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Слава Тебе, Христе Боже, Надежда наша, слава Те­бе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н</span>
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Слава, и ныне.</span>
                    <span className="markedBlack"> Господи, помилуй </span>
                    <span className="markedRed">(трижды)</span>
                    <span className="markedBlack">. Бла­го­слови! </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="markedRed">Отпуст</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedRed"> </span>
                    <span className="markedBlack"> </span>
                    <span className="markedRed">По обычаю – с крестом в руках:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">П</span>
                    <span className="markedBlack"> Христос, истинный Бог наш, по хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        тайству всенепорочной Своей Ма­тери, свя­тых слав­ных и все­хваль­ных апосто­лов, во святых
                        от­ца нашего Василия, архи­епи­скопа Кеса
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">рии Каппадоки</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">й­ской, святых </span>
                    <span className="markedRed">(храма и дня)</span>
                    <span className="markedBlack">
                        , и всех свя­тых, да помилует и спасёт нас, по Сво­ей бла­гости и человеколюбию!
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="markedRed"> [В воскресенье:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> Воскресший из мёртвых Христос, истинный Бог наш…</span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="markedRed"> Праздничные отпусты – см. в приложениях.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-9">
                    <span className="markedRed">Многолетие </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(при закрытии завесы)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">Н </span>
                    <span className="markedBlack">Великого го­спо­дина и отца нашего…</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-001-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-001"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="markedBlack"> </span>
                    <span className="markedRed">[И ещё:</span>
                    <span className="markedBlack">
                        {' '}
                        Господи, твердыня на Тебя надеющихся, утверди Церковь, которую Ты приобрёл Своею бесценной
                        Кровию!
                    </span>
                    <span className="markedRed">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-12">
                    <span className="markedRed">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-б-отст">
                    <span className="markedRed"> Священник в алтаре читает благодарственные молитвы</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-000-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-000"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="markedRed">. </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed"> </span>
                    <span className="markedRed">После </span>
                    <span className="markedBlack">Отец наш Небесный:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-9">
                    <span className="markedRed">
                        отпустительный Тропарь <br />
                        св. василия великого,{' '}
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">глас 1</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>
                    <span className="markedBlack">Разнёсся голос твой по всей земле, приня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        вшей слово твоё, которым ты о Боге достойно учил, природу сущего прояснил и нравы людей
                        ис­пра­вил. О&nbsp;царственное священство, отче преподобный, моли Христа Бога о спасении душ
                        наших!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Слава. </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-5">
                    <span className="markedRed">Кондак его же, </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">глас 4</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> Ты стал непоколеби</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">мым основанием церкви, всех людей неотъе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">
                        млемым достоинством наделив и утвердив его учением своим, о праведный Василий, таинства Небес
                        открывший.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> И ныне.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-5">
                    <span className="markedRed">Богородичен, </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">глас 6</span>
                    <span className="markedRed"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="markedBlack"> </span>О Заступница
                    <span className="markedBlack"> христиан безукори</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">зненная, Хо­да</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">­та­ица пред Творцом неизменная, не отвергни молитвенных гла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">
                        сов грешников, но поспе­ши, Бла­гая, на помощь нам, с верою взывающим к те­бе: не замедли с
                        засту
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="markedBlack">пничеством и будь усе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">t</span>
                    <span className="markedBlack">рдна в молитве, Бого­ро­дица, все­гда защищающая чтущих тебя!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="markedRed"> Или ещё тропарь дня.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="markedRed"> </span>
                    <span className="markedBlack">Господи, помилуй</span>
                    <span className="markedRed"> (трижды)</span>
                    <span className="markedBlack">.</span>
                    <span className="markedRed"> </span>
                    <span className="markedBlack">Че</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ CharOverride-5">`</span>
                    <span className="markedBlack">ствуемую превыше херувимов…</span>
                    <span className="markedRed"> </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">*</span>
                    <span className="markedBlack">.</span>
                    <span className="markedRed"> Слава, и ныне. Отпуст </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">**</span>
                    <span className="markedRed">.</span>
                </p>
                <p className="footnoteRed-кунцевая">
                    <span className="markedRed"> * См. кн. 2, с. 211.</span>
                </p>
                <p className="footnoteRed">
                    <span className="markedRed"> ** См. выше, с. 52.</span>
                </p>
                <p className="_-КОЛОНТИТУЛЫ-ОФОРМЛЕН_КОНЦОВКА-отст7 ParaOverride-2">
                    <span className="markedBlack">
                        <img
                            className="_idGenObjectAttribute-1"
                            src="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК-web-resources/image/Изображение_1873.png"
                            alt=""
                        />
                    </span>
                </p>
                <hr className="HorizontalRule-1" />
                <div className="_idFootnotes">
                    <div id="footnote-026" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-026-backlink"
                                >
                                    *
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                См. в книге 2 настоящей серии: Православное богослужение. Литургия св. Иоанна Златоуста.
                                3-е изд., испр. М., 2015. С. 180.{' '}
                            </span>
                        </p>
                    </div>
                    <div id="footnote-025" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-025-backlink"
                                >
                                    **
                                </a>
                            </span>
                            <span className="markedRed"> То есть обычные, типичные.</span>
                        </p>
                    </div>
                    <div id="footnote-024" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-024-backlink"
                                >
                                    ***
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                «Блаженны» могут петься с тропарями из канонов Утрени по Типикону (богослужебному
                                Уставу).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-023" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-023-backlink"
                                >
                                    ****
                                </a>
                            </span>
                            <span className="markedRed"> Если Трисвятое не поётся, то даётся только возглас.</span>
                        </p>
                    </div>
                    <div id="footnote-022" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-022-backlink"
                                >
                                    *****
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                Вместо Трисвятого в Рождество Христово, Богоявление и Страстную (Великую) субботу
                                поётся:{' '}
                            </span>
                            <span className="markedBlack">
                                Все вы, во Христа крестившиеся, во Христа облеклись. Аллилуия!
                            </span>
                            <span className="markedRed"> В Неделю крестопоклонную: </span>
                            <span className="markedBlack">
                                Кресту Твоему поклоняемся, Владыка, и святое Воскресение Твоё славим.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-021" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-021-backlink"
                                >
                                    ******
                                </a>
                            </span>
                            <span className="markedRed"> Изначально могла быть обращена к Богу Отцу (ср. </span>
                            <span className="markedRed CharOverride-4">с. 125</span>
                            <span className="markedRed">).</span>
                        </p>
                    </div>
                    <div id="footnote-020" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-020-backlink"
                                >
                                    *******
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                Далее могут быть ещё добавлены особые прошения, в т. ч. по специальной просьбе верных, о
                                болящих, по случаю различных бедствий, скорбей и нужд и т. д.{' '}
                            </span>
                        </p>
                    </div>
                    <div id="footnote-019" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-019-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                До ХVI–ХVII века с середины Великого поста далее читались Ектения и Молитва о
                                просвещаемых, сохранившиеся в современной Литургии преждеосвящённых даров (
                            </span>
                            <span className="markedRed CharOverride-4">см. ниже, с. 95–96</span>
                            <span className="markedRed">).</span>
                        </p>
                    </div>
                    <div id="footnote-018" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-018-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> Или: </span>
                            <span className="markedBlack">
                                Пусть никто из оглашаемых, никто из тех, чья вера не­твер­да, никто из кающихся, никто
                                из нечистых{' '}
                            </span>
                            <span className="markedRed">(т. е. обуреваемых) </span>
                            <span className="markedBlack">не при­бли­жается к святым та</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedBlack">инствам. Кто не причащается, да покинет собра­ние!</span>
                            <span className="markedRed"> (св. Григорий Двое­слов)</span>
                            <span className="markedBlack">.</span>
                        </p>
                        <p className="_-КОЛОНТИТУЛЫ-ОФОРМЛЕН_КОНЦОВКА-отст7">
                            <span className="markedBlack">
                                <img
                                    className="_idGenObjectAttribute-1"
                                    src="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК-web-resources/image/Изображение_1873.png"
                                    alt=""
                                />
                            </span>
                        </p>
                    </div>
                    <div id="footnote-017" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-017-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                Древнее надписание: «После распростертия илитона» (возможно, с ан­ти­минсом).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-016" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-016-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> См. кн. 2, с. 180.</span>
                        </p>
                    </div>
                    <div id="footnote-015" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-015-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> В церковнославянском тексте далее вставка: </span>
                            <span className="markedBlack">и очисти мою душу и сердце от сове­сти нечистой.</span>
                        </p>
                    </div>
                    <div id="footnote-014" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-014-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                На Руси читалась до сер. ХVII в. Изначально могла быть обращена к Богу-Отцу.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-013" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-013-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> </span>
                            <span className="markedRed">Далее в тексте Служебника вставки:</span>
                        </p>
                        <p className="petitBigIndent">
                            <span className="markedBlack"> </span>
                            <span className="markedRed">Д</span>
                            <span className="markedBlack"> …дабы в единомыслии ис­по­ведать:</span>
                        </p>
                        <p className="petitBigIndent">
                            <span className="markedBlack"> </span>
                            <span className="markedRed">Н</span>
                            <span className="markedBlack">
                                {' '}
                                Отца и Сына и Святого Духа – Троицу единосущ­ную и нераздельную.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-012" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-012-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                Согласно древней практике перед закрытием дверей все верные дают друг другу целование
                                мира и любви со сло­вами:{' '}
                            </span>
                            <span className="markedBlack">Христос посреди нас!</span>
                            <span className="markedRed"> – и отвечая: </span>
                            <span className="markedBlack">И есть, и будет!</span>
                            <span className="markedRed"> [или: </span>
                            <span className="markedBlack">Христос воскрес! </span>
                            <span className="markedRed">– </span>
                            <span className="markedBlack">Воистину воскрес!</span>
                            <span className="markedRed">].</span>
                        </p>
                    </div>
                    <div id="footnote-011" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-011-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                «Дьяконы пусть стоят при дверях… чтобы во время возношения никто не выходил и чтобы не
                                отворялась дверь, хотя бы пришёл и верующий» (Апостольские постанов­ления. 8. 11).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-010" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-010-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> </span>
                            <span className="markedRed">Раздел (4) – Евхаристический кано</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">
                                н. Он со­стоит из вступления и четы­рёх основных частей: префа
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">цио (вводная часть), ана</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">мнесис (воспо­ми­нание), эпи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">клесис (при­зы­вание) и ин­тер­це</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">ссио (хода</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">­тай­ство).</span>
                        </p>
                    </div>
                    <div id="footnote-009" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-009-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> Далее в тексте Служебника вставка: </span>
                            <span className="markedBlack">
                                покло­няться Отцу и Сыну и Святому Духу, Троице еди­носущной и нераз­дельной.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-008" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-008-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                См. у М. Арранца и др. С греч., возможно ещё: «согласно всему (этому) (по всем этим
                                причинам) и для всего (этого)» (Е. Ло­вягин и др.).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-007" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-007-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> </span>
                            <span className="markedRed">
                                В церковнославянском тексте Служебника далее следует вставка: тропарь Третьего часа, со
                                стихами (см. Приложения в кн. 1 серии «Православное богослужение», а также Третий час в
                                кн. 7).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-006" className="_idFootnote">
                        <p className="footnoteRed">
                            <a
                                className="_idFootnoteAnchor _idGenColorInherit"
                                href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-006-backlink"
                            >
                                ********
                            </a>{' '}
                            Неудачная вставка из Литургии св. Иоанна Златоуста.
                        </p>
                    </div>
                    <div id="footnote-005" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-005-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> В тексте Служебника далее вставка: </span>
                            <span className="markedBlack">и со славного пре­стола царствия Твоего.</span>
                        </p>
                    </div>
                    <div id="footnote-004" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-004-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed">
                                {' '}
                                Далее по обычаю предстоятель просит у всех прощения и тихо молится:
                            </span>
                        </p>
                        <p className="footnoteBlack">
                            <span className="markedRed"> П </span>
                            <span className="markedBlack">
                                Отпусти, оставь, прости, Боже, вольные и невольные согре­ше­ния наши, соделанные словом
                                и делом, в ве
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedBlack">дении и неве</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedBlack">дении, днём и в ночи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedBlack">
                                , во уме и помышлении, – всё нам прости, по Своей благости и человеколюбию!
                            </span>
                        </p>
                    </div>
                    <div id="footnote-003" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-003-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> То есть прича</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">стен (кино</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="markedRed">
                                ник) дня или святого – см. в приложениях. Поётся во время прича­ще­ния в алтаре (а
                                иногда и в храме).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-002" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-002-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> См. кн. 2, с. 86.</span>
                        </p>
                    </div>
                    <div id="footnote-001" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-001-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> См. кн. 2, с. 88.</span>
                        </p>
                    </div>
                    <div id="footnote-000" className="_idFootnote">
                        <p className="footnoteRed">
                            <span className="markedRed">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="ЛитСвВасВел_РУС_ПБ3_ДЛЯ_ОГК.html#footnote-000-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="markedRed"> Там же, с. 207–211.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vasiliy;
