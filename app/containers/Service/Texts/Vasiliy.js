import React from 'react';
import './Shared.css';
import { useParams } from 'react-router-dom';
import forEach from 'lodash.foreach';
import useDay from 'hooks/useDay';
import ReadingItem from 'containers/Readings/ReadingItem';
import isGospel from 'domain/isGospel';
import { css } from 'emotion';
import Tooltip from 'components/Tooltip/Tooltip';

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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-Службы ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor001" />
                        I.
                        <br />
                        Литургия оглашаемых
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(1) Приуготовление</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Открыв завесу и кадя престол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        В гробнице – телом <br /> и в аду – душой как Бог, <br />в раю – с раз­бой­ником <br /> и на
                        престоле – со Отцом и Духом <br />
                        Ты пребывал, Христе, <br /> всё напол­няя, необъя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тный.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Полное каждение с чтением Пс 50</span>
                    <Tooltip>
                        См. в книге 2 настоящей серии: Православное богослужение. Литургия св. Иоанна Златоуста. 3-е
                        изд., испр. М., 2015. С. 180.
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">О Царь Небесный</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О Царь Небесный, Хода</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тай</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Уте</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">шитель</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , Дух Истины, о Ты, везде пребывающий и всё наполняющий, Со­кро­вищ­ница благ и жизни Податель,
                                при­ди
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                и вселись в нас, и очи­сти нас от вся­кой скверны, и спа­си, Бла­го
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й, ду­ши наши.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Царю Небесный, Утешителю, Душе истины, Иже везде сый и вся исполняяй, 
                                Сокровище благих и жизни Подателю, прииди и вселися в ны,
                                и очисти ны от всякия скверны, и спаси, Блаже, души наша.
                            </span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Слава в вышних Богу, <br /> и на земле мир, в человеках благоволение{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и на земле мир избранникам Его</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Дважды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господи! отве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        рзни уста мои, <br /> и речь моя возвести
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т хва­лу Тебе.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Время Господу действовать. Владыка, благослови!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен Бог наш </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Помолись обо мне, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да направит Господь стопы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> твои.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни меня, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог тебя во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="petitBigIndent">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословенно Царство Отца и Сына и Святого Ду­ха, ныне и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Великая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В мире Господу помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О мире свыше и спасении наших душ Господу по­мо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О мире всего мира, об укреплении святых Бо­жьих цер­кве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й и единении всех Господу помо­лим­ся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Об этом святом доме и обо всех, с верою, бла­го­го­вени­ем и стра­хом Божьим входящих в него,
                        Го­споду по­мо­лимся.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О великом господине и отце нашем святейшем патриархе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и о господине нашем пре­освя­ще</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-петит">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">н­нейшем </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">митрополите</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> архи­епископе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">, или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">епи­ско­пе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (имя)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , почтенном пре­свитер­стве, во Хри­сте дья­кон­стве, обо всём клире и на­роде{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Божьем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Го­спо­ду по­мо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О нашей богохранимой стране </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, обо всём на­ро­де и властя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х её Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об этом граде </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> об этом селе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">об этой святой обите­ли</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и обо всех городах и стра­нах и верою жи­ву­щих в них Господу помолимся.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О благоприятной погоде, об изобилии плодо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в зем­ли и мирных вре­мена</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О плавающих, путеше</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ствующих, боля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щих, стра­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ж­ду­щих, пленённых, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">за правду го­ни­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мых и заключённых,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и спа­се­нии их Го­споду помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об избавле­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нии нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ния Господу помолимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Бо­же, Тво­ею бла­годатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Всесвяту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ю, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">чную, преблагослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">н­ную, славную нашу Вла­дычицу Богородицу и Веч­ноде­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ву Ма­рию со всеми святыми помяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х се­бя, и друг друга, и всю жизнь нашу Хри­сту </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или более древнее:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­да­дим </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(2) Антифоны изобразительные</span>
                    <Tooltip>То есть обычные, типичные.</Tooltip>
                </p>
                <p id="antifon1" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва перед пением
                        <br />
                        первого антифона
                    </span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, Боже наш, Ты, Чья власть несравне</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нна и слава непостижи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ма, Чья милость безмерна и человеколюбие несказа</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                нно, – Ты же, Владыка, по Своему благосердию воз­зри на нас и на этот святой дом и яви
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твою неисто­щи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мую милость и сострадание нам и моля</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щимся с нами,&nbsp;–</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Тебе подобает вся слава, честь и поклонение, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, Егоже держава несказанна 
                                и слава непостижима, Егоже милость безмерна и человеколюбие неизреченно. 
                                Сам, Владыко, по благоутробию Твоему, призри на ны и на святый храм сей, 
                                и сотвори с нами и молящимися с нами, 
                                богатыя милости Твоя и щедроты Твоя.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Яко подобает Тебе всякая слава, 
                                честь и поклонение, Отцу, и Сыну, и Святому Духу, 
                                ныне и присно, и во веки веков.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Первый антифон
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(Пс 102)</span>
                </p>

                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Благослови Господа, душа моя!
                                <br /> Благословен Ты, Господи.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Благослови Господа, душа моя,
                                <br /> и всё, что во мне, — имя святое Его;
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                благослови Господа, душа моя,
                                <br /> и не забывай всех даро́в Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Он прощает все беззакония твои,
                                <br /> исцеляет все неду`ги твои,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                избавляет от истле́ния жизнь твою,
                                <br /> милостью и щедротами венчает тебя,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                насыщает бла́гами зрелость твою;
                                <br /> как у орла, обновится юность твоя!
                            </span>
                        </p>
                        <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Милость творит Господь,
                                <br /> тесни`мых защищает права́;
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                открыл Он Моисею пути Свои,
                                <br /> сына́м Изра́илевым — деяния Свои:
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                щедр и ми`лостив Господь,
                                <br /> долготерпелив и благ весьма,
                            </span>
                        </p>
                        <p className="_-ПЕТИТ_ПетитСТ-б-отст">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                прогневается не до конца,
                                <br /> и враждует не вове́к.
                            </span>
                        </p>
                        <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Не по беззакониям нашим сотворил Он нам,
                                <br /> и не по грехам нашим воздал Он нам;
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> но как высоки`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                небеса над землёй,
                                <br /> сильна́ милость Его к боящимся Его;
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                как восток от запада далёк,
                                <br /> беззакония наши отдали`л Он от нас;
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                как ми`лует отец детей,
                                <br /> ми`лует Господь боящихся Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Ибо знает Он состав наш,
                                <br /> па́
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мятует, что мы — персть.</span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-6">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Человек — дни его подобны траве,
                                <br /> как цвет полево́й, отцветают они;
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                повеет над ним — и нет его,
                                <br /> и не узна́ет его место его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Но милость Господня от века и вове́к
                                <br /> к боя´щимся Его,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                и правда Его на сына́х сынов
                                <br /> тех, кто хранит Завет Его,
                                <br />
                                кто помнит заповеди Его
                                <br /> и претворяет их в дела.
                            </span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-6">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Господь воздвиг престол Свой на небесах,
                                <br /> и всё объе́млет царство Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Благословите Господа, все Вестники Его,
                                <br /> сильные, творящие слово Его,
                                <br /> вне́
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                мля звуку сло́ва Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Благословите Господа, все Воинства Его,
                                <br /> слу`ги Его, творящие волю Его!
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Благословите Господа, все дела Его,
                                <br /> на всяком месте владычества Его!
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
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
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Благослови, душе моя, Господа.
                                <br /> Благословен еси, Господи.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Благослови, душе моя, Господа,
                                <br /> и вся внутренняя моя Имя святое Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Благослови, душе моя, Господа,
                                <br /> и не забывай всех воздаяний Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Очищающаго вся беззакония твоя,
                                <br /> исцеляющаго вся недуги твоя.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Избавляющаго от истления живот твой,
                                <br /> венчающаго тя милостию и щедротами.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Исполняющаго во благих желание твое:
                                <br /> обновится, яко орля, юность твоя.
                            </span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Творяй милостыни Господь,
                                <br /> и судьбу всем обидимым.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Сказа пути Своя Моисеови,
                                <br /> сыновом Израилевым хотения Своя.
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                        </p>
                        <p className="basetIndent_6">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Щедр и милостив Господь,
                                <br /> долготерпелив и многомилостив.
                            </span>
                        </p>
                        <p className="petitIndent_6">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Не до конца прогневается,
                                <br /> ниже в век враждует.
                            </span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Не по беззаконием нашим сотворил есть нам,
                                <br /> ниже по грехом нашим воздал есть нам.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Яко по высоте</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                небесней от земли,
                                <br /> утвердил есть Господь милость Свою на боящихся Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Елико отстоят востоцы от запад,
                                <br /> удалил есть от нас беззакония наша.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Якоже щедрит отец сыны,
                                <br /> ущедри Господь боящихся Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Яко Той позна создание наше,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">помяну, яко персть есмы.</span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-6">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Человек, яко трава дние его,
                                <br /> яко цвет сельный, тако оцветет.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Яко дух пройде в нем, и не будет,
                                <br /> и не познает ктому места своего.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Милость же Господня от века и до века
                                <br /> на боящихся Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                И правда Его на сынех сынов,
                                <br /> хранящих завет Его,
                                <br /> и помнящих заповеди Его
                                <br /> творити я.
                            </span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-6">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Господь на небеси уготова Престол Свой,
                                <br /> и Царство Его всеми обладает.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Благословите Господа, ангели Его,
                                <br /> сильнии крепостию, творящии слово Его,
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                услышати глас словес Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Благословите Господа, вся силы Его,
                                <br /> слуги Его, творящии волю Его.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Благословите Господа, вся дела Его,
                                <br /> на всяком месте владычества Его.
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-4">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Благослови, душе моя, Господа,
                                <br /> и вся внутренняя моя Имя святое Его. <br />
                                Благословен еси, Господи.
                            </span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">малая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Тво­ею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Всесвяту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ю, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">чную, преблагослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нную, слав­ную нашу Вла­ды­чицу Богородицу и Вечноде­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ву Ма­рию со все­ми свя­тыми помяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х се­бя, и друг друга, и всю жизнь нашу Христу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­да­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">по­святи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p id="antifon2" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва перед пением
                        <br />
                        второго антифона
                    </span>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, спаси народ Твой и благо­слови на­следие Твоё, Церковь Твою в полноте сохрани,
                                освяти лю­бя­щих красоту
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                дома Твоего; Ты в ответ прославь их Твоей бо­же­ственной си­лой и не оставь нас, на­дею­щих­ся
                                на Тебя, –
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Твоя власть и Твои царствие, и сила, и слава, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, спаси люди Твоя и благослови достояние Твое, 
                                исполнение Церкве Твоея сохрани, освяти любящия благолепие дому Твоего. 
                                Ты тех воспрослави Божественною Твоею силою и не остави нас, 
                                уповающих на Тя.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Яко Твоя держава и Твое есть Царство и сила, 
                                и слава, Отца, и Сына, и Святаго Духа, ныне и присно, и во веки веков.</span>
                        </p>
                    </>
                )}                
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Второй антифон
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(Пс 145)</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-3"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Хвали Господа, душа моя!</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Восхвалю</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господа, доко</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ле живу;
                                <br /> буду петь пред Богом моим,
                                <br /> поку
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                да есмь.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-3"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Не надейтеся на вельмож,
                                <br /> на Адамова сына – в нём спасения нет:
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-3"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                выйдет дух его, он вернётся в землю свою,
                                <br /> в тот день погибнут все замыслы его.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Бла</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                го тому, кому в помощь Иакова Бог,
                                <br /> чья надежда – на Господа, на Бога своего,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                на Того, Чьё творение – небеса и земля,
                                <br /> и море, и всё, что в них,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Кто хранит верность вовек,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                для утесняемых вершит суд,
                                <br /> а
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                лчущим подаёт хлеб; <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господь выводит узников на свет,
                                <br /> Господь отверзает очи слепцам,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господь выпрямляет тех, кто согбе</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                н,
                                <br /> Господь праведным благоволи
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                т,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господь пришельцев хранит,
                                <br /> помогает сироте
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                и вдове,
                                <br /> но искриви
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т неправедных путь.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Царствует Господь вове</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                к,
                                <br /> Бог твой, о Сион, – в род и род.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне.</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Единородный Сын и Сло­во Бо­га,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Ты, бессмертный, ради нашего спасения добро­вольно во­плоти­
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вшийся</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> от святой Бого­ро­дицы и Вечно­де­</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вы Ма­рии,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> неизменно воче­ло­ве</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">чившийся</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и распя</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тый, Хри­сте Боже, Смер­тию смерть попра</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в­ший,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> один из Свя­той Тро­ицы,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                прославляемый вместе с От­цом и Свя­тым Ду­хом, – спаси нас!
                            </span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-3"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Хвали, душе моя, Господа!</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Восхвалю Господа в животе моем,
                                <br /> пою Богу моему, дондеже есмь.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-3"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Не надейтеся на князи,
                                <br /> на сыны человеческия, в нихже несть спасения.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-3"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Изыдет дух его, и возвратится в землю свою:
                                <br /> в той день погибнут вся помышления его.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажен, емуже Бог Иаковль помощник его,
                                <br /> упование его на Господа Бога своего.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Сотворшаго небо и землю,
                                <br /> море и вся, яже в них.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Хранящаго истину в век,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                творящаго суд обидимым,
                                <br /> дающаго пищу алчущим.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господь решит окованныя,
                                <br /> Господь умудряет слепцы.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господь возводит низверженныя,
                                <br /> Господь любит праведники.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господь хранит пришельцы,
                                <br /> сира и вдову приимет,
                                <br /> и путь грешных погубит.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Воцарится Господь во век,
                                <br /> Бог твой, Сионе, в род и род.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне.</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Единородный Сыне и Слове Божий, Безсмертен Сый</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и изволивый спасения нашего ради</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                воплотитися от Святыя Богородицы и Приснодевы Марии,
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> непреложно вочеловечивыйся,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                распныйся же, Христе Боже, смертию смерть поправый,
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Един Сый Святыя Троицы,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> спрославляемый Отцу и Святому Духу, спаси нас.</span>
                        </p>
                    </>
                )}

                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[И далее Малая ектения, см. с. 5.]</span>
                </p>
                <p id="antifon3" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва перед пением
                        <br />
                        третьего антифона
                    </span>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ты эти общие и согласные молитвы нам даро­ва</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л и даже двоим и троим, согласно собравшимся во имя Твоё, просимое подавать обещал, – Ты же и
                                ныне прошения слуг Твоих на пользу исполни: подай нам в нынешнем веке познание Твоей Истины, а в
                                будущем Жизнь вечную дару
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ибо Ты благой и человеколюбивый Бог и мы вос­сылаем славу Те­бе,{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Свя­тому Духу,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ныне и все­гда и во веки веков.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Иже общия сия и согласныя даровавый нам молитвы, 
                                иже и двема или трем согласующимся о имени Твоем прошения подати обещавый, 
                                Сам и ныне раб Твоих прошения к полезному исполни, 
                                подая нам и в настоящем веце познание Твоея истины, 
                                и в будущем живот вечный даруя.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            Яко благ и человеколюбец Бог еси, 
                            и Тебе славу возсылаем, Отцу, и Сыну, и Святому Духу, 
                            ныне и присно, и во веки веков.</span>
                        </p>
                    </>
                )}

                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Третий антифон</span>
                    <Tooltip>
                        «Блаженны» могут петься с тропарями из канонов Утрени по Типикону (богослужебному Уставу).
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(Мф 5:3-12)</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Во царствии Своём вспомни о нас, Господи, <br /> когда Ты при­дёшь царствовать!
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 12</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны нищие духом,
                                <br /> ибо их есть Царство Небесное.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны скорбящие,
                                <br /> ибо будут они уте
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">шены.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">10</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Блаженны кроткие,
                                <br /> ибо они примут в удел землю.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Блаженны а</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                лчущие и жаждущие правды,
                                <br /> ибо будут они насыщены.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 8 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны милосердные,
                                <br /> ибо будут они помилованы.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Блаженны те, чьи сердца</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чисты</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ,<br /> ибо увидят они Бога.{' '}
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 6 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны миротворцы,
                                <br /> ибо наречены
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> они будут сына</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ми Божьими. <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны гонимые за правду,
                                <br /> ибо их есть Царство Небесное.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 4 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны вы, когда станут вас <br /> бесчестить и гнать <br /> и лживо скажут про вас
                                всякое <br /> худое слово – из-за Меня.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Радуйтесь и веселитесь, <br /> ибо велика
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> награда ваша на Небесах!</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Во Царствии Твоем помяни нас, Господи, <br /> егда приидеши, во Царствии Твоем.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 12</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени нищии духом,
                                <br /> яко тех есть Царство Небесное.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени плачущии,
                                <br /> яко тии утешатся.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">10</span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Блажени кротции,
                                <br /> яко тии наследят землю.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени алчущии и жаждущии правды,
                                <br /> яко тии насытятся.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 8 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени милостивии,
                                <br /> яко тии помиловани будут.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени чистии сердцем,
                                <br /> яко тии Бога узрят.{' '}
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 6 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени миротворцы,
                                <br /> яко тии сынове Божии нарекутся.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени изгнани правды ради,
                                <br /> яко тех есть Царство Небесное.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 4 </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блажени есте, егда поносят вам,
                                <br /> бесчестить и гнать <br /> и изженут, и рекут всяк <br /> зол глагол на вы, лжуще
                                Мене ради.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Радуйтеся и веселитеся, <br /> яко мзда ваша многа на Небесех.
                            </span>
                        </p>
                    </>
                )}
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> И ныне.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-6">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="malyVhod" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(3) Малый вход с Евангелием</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед входом</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Владыка, Господи Боже наш, Ты установил на Небесах чины</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                и воинства ангелов и архангелов для служения Твоей Славе, – соделай же, чтобы с нашим входом
                                вошли святые ангелы, вместе с нами служа
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и прославляя Твою благость, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Тебе подобает вся слава, честь и поклонение, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Владыко Господи Боже наш, 
                                уставивый на небесех чины и воинства Ангел и Архангел в служение Твоея славы, 
                                сотвори со входом нашим входу святых Ангелов быти, сослужащих нам, 
                                и сославословящих Твою благость. </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Яко подобает Тебе всякая слава, 
                                честь и поклонение, Отцу, и Сыну, и Святому Духу, 
                                ныне и присно, и во веки веков.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, святой вход!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
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
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Все продвигаются вперёд.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Показывая народу Евангелие:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Ста­нем благоговейно!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Входная песнь
                        <br />
                        литургии оглашаемых
                    </span>
                </p>
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
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Приидите, поклонимся и припадем ко Христу. 
                                / Спаси ны, Сыне Божий, / Воскресый из мертвых, поющия Ти, / аллилуиа.</span>
                        </p>
                    </>
                )}                                
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тропари и кондаки праздника и храма.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p id="trisvatoe" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва перед пением <br />
                        Трисвятой песни
                    </span>
                    <Tooltip>Если Трисвятое не поётся, то даётся только возглас.</Tooltip>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Боже святой и во святыне пребывающий, Тебя Три­святой песнью серафимы воспевают и херувимы
                                славословят, Тебе все небесные силы поклоняются! Ты
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> из небытия</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в бытие</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                всё привёл, Ты сотворил человека по Своему образу и подобию и всеми Твоими да­ра
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми его наделил; Ты и прося</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                щему по­даёшь премудрость и разум, и согрешающего не презираешь, ибо установи
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л ему во спасение покаяние. Ты удостоил нас, убогих и недостойных слуг Твоих, и в этот час стать
                                пред лицом славы Твоего святого жертвенника и должное поклонение и славословие Тебе приносить, –
                                Ты
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> же, Владыка, прими</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и от уст нас, грешных, Трисвяту</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ю песнь и посети нас Своей благостью; прости нам все вольные и невольные согрешения, освяти
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                наши души и тела и дай нам праведно служить Тебе во все дни жизни на­шей, по хода
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ­тайству святой Богородицы и всех святых, во все века творивших угодное Тебе, –
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ибо Ты свят, Боже наш, и мы воссылаем славу Тебе, Отцу и Сыну и Святому Духу, ныне и всегда
                            </span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>  
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже Святый, иже во святых почиваяй, 
                                иже трисвятым гласом от Серафимов воспеваемый и от Херувимов славословимый, 
                                и от всякия Небесныя Силы покланяемый, 
                                иже от небытия во еже быти приведый всяческая, 
                                создавый человека по образу Твоему и по подобию, 
                                и всяким Твоим дарованием украсивый, даяй просящему премудрость и разум, 
                                и не презираяй согрешающаго, но полагаяй на спасение покаяние, 
                                сподобивый нас, смиренных и недостойных раб Твоих, 
                                и в час сей стати пред славою святаго Твоего жертвенника, 
                                и должное Тебе поклонение и славословие приносити. 
                                Сам, Владыко, приими и от уст нас, грешных, Трисвятую песнь, 
                                и посети ны благостию Твоею, прости нам всякое согрешение вольное же 
                                и невольное, освяти наша души и телеса, 
                                и даждь нам в преподобии служити Тебе вся дни живота нашего, 
                                молитвами святыя Богородицы, и всех святых, от века Тебе благоугодивших.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Яко свят еси, Боже наш, и Тебе славу возсылаем, Отцу, и Сыну, и Святому Духу, ныне и присно.
                            </span>
                        </p>
                    </>
                )}
              
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Тихо:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, пение Трисвято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">го!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        После благословения выходит дьякон перед свя­ты­ми вра­тами и, поводя орарём, даёт тон сто­ящему
                        народу, го­воря:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Трисвятое</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Вместо Трисвятого в Рождество Христово, Богоявление и Страстную (Великую) субботу
                                поётся:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Все вы, во Христа крестившиеся, во Христа облеклись. Аллилуия!
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В Неделю крестопоклонную: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Кресту Твоему поклоняемся, Владыка, и святое Воскресение Твоё славим.
                            </span>
                        </>
                    </Tooltip>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Свято</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й Боже, свято</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й Крепкий, свято</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й Бессмерт­ный, помилуй нас </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Свято</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й Бессмертный, помилуй нас. Свято</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й Боже, свято</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й Крепкий, свято</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й Бес­смерт­ный, помилуй нас.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Святый Боже, 
                                / Святый Крепкий, / Святый Безсмертный, помилуй нас. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Святый Безсмертный, помилуй нас. 
                                Святый Боже, / Святый Крепкий, / Святый Безсмертный, помилуй нас.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(4) Чтения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Повели, владыка!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Благословляя чтеца:]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен, кто во имя Господне грядёт!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Благослови, владыка, горний престол!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя горнее место:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословен Ты на славном престоле царствия Тво­его, Ты, восседающий на херувимах{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Дан 3:54-55)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вне</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">млем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч [и Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Прокимен, глас… </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Прокимны см. в приложе­ниях.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Из книги Деяний святых апостолов чтение </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> Из Соборного по­сла­ния Иакова</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> (или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> Петра</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> чтение; </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> Из Послания к римлянам </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> к коринфянам, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> к галатам</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">святого</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> апо­сто­ла Павла чтение</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны!</span>
                </p>
                <div id="firstReading">
                    <p id="apostol" className="_-ОСНОВНОЙ_Чтение-Писания">
                        <span className="_-ВЫДЕЛЕНИЯ_ЖИРН-КУРСИВ">Чтение Апостола</span>
                    </p>
                </div>
                <div
                    className={css`
                        margin: 0 5px;
                    `}
                >
                    {apostol}
                </div>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">читавшему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания">
                    <span className="_-ВЫДЕЛЕНИЯ_REGULAR">Проповедь</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва <br />
                        перед чтением Евангелия
                    </span>
                    <Tooltip>Изначально могла быть обращена к Богу Отцу (ср. с. 125).</Tooltip>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возжги</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в сердцах наших, человеколюби</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                вый Владыка, Твоего богопознания чистый свет и наши духовные очи открой для уразумения{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Твоей</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">евангельской проповеди. Вложи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в нас и страх пред Твоими благи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми за</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">поведями, дабы, одолев </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">все</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> устремления плотски</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                е, мы провели жизнь духовную, всегда мысля и совершая благоуго
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дное Тебе, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты просвещение душ и тел наших, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Хри­сте</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, и мы воссылаем славу Те­бе, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                                вме­сте со безначальным Твоим Отцом и все­святым и благим <br />и животворящим Твоим Ду­хом,
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во веки веков.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возсияй в сердцах наших человеколюбче 
                                Владыко, Твоего Богоразумия нетленный свет, 
                                и мысленныя наши отверзи очи, во евангельских Твоих проповеданий разумение: 
                                вложи в нас и страх блаженных Твоих заповедей, 
                                да плотския похоти вся поправше, духовное жительство пройдем, 
                                вся, яже ко благоугождению Твоему, и мудрствующе и деюще. </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">  Ты бо еси просвещение душ и телес наших, Христе Боже, и Тебе славу возсылаем, 
                                со безначальным Твоим Отцем, и пресвятым и благим и животворящим Твоим Духом, 
                                ныне и присно, и во веки веков.</span>
                        </p>
                    </>
                )}

                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благослови меня, владыка, – благовестителя святого апос­тола и евангелиста{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Бог, по хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тайству святого славного и все­хва</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ль­ного апо­сто­ла и евангелиста </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя), </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">да даст тебе, бла­го­веству­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ю­щему, слово со многой силою для совершения Бла­го­ве­стия Своего воз­любленного Сына, Господа
                        нашего Иису­са Христа!
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Принимая Евангелие от пресвитера:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вынося Евангелие из алтаря:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аллилуия, аллилуия, аллилуия,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">глас…</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Народ припевает </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аллилуия </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">трижды – здесь и после каждого стиха.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Стихи см. в прило­жениях.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Во время чтения и пения аллилуария – каждение Евангелия
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-4">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> как Слова Божьего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Стоя на амвоне лицом к народу или в центре храма лицом на восток:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Премудрость! Станем благоговейно! Услышим свя­тое Евангелие!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> От </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя) </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">святого Благовестия чтение.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Слава Тебе, Господи, слава Тебе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны! </span>
                </p>
                <p id="gospel" className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Чтение Евангелия</span>
                </p>
                <div
                    className={css`
                        margin: 0 5px;
                    `}
                >
                    {gospel}
                </div>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир тебе, благовеству</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющему!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Слава Тебе, Господи, слава Тебе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_REGULAR">Проповедь</span>
                </p>
                <p id="sugubaja" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Сугубая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Возгласим мы все от всей души и от всего помышления нашего воззовём!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господь Вседержитель, Бог отцов наших, молим Тебя, услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Помилуй нас, Боже, по великой милости Твоей, молим Тебя, услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы молимся о великом господине и отце на­шем святейшем па­три­архе{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        и о господине нашем преосвященнейшем митрополите{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> ар­хи­епи­скопе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">епископе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (имя)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и обо всех во Хри­сте </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">предстоящих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> бра­тьях наших.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о нашей богохранимой стране </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и обо всём народе и властях её, дабы проводить нам спокойную и тихую жизнь во всём
                        благо­честиво и до­стойно.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о наших братьях священниках, священ­но­и</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ноках, и обо всём во Христе братстве нашем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы молимся о блаженных и всегда помина­емых свя­тей­ших патриархах православных, и
                        со­зда­те­лях этого святого дома{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[если в обители:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> этой свя­той обители</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и о прежде почивших отцах и брать­ях </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и сё­страх наших, и о чадах </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабах</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Божьих </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и обо всех</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, здесь и повсюду ле­жащих, пра­вослав­ных </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">христианах</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы молимся о милости, жизни, мире, здра­вии, спа­се­нии, посещении, прощении и отпуще
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нии гре­хов чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Божьих </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и всех бра­тьев </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и сестёр</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> свя­того дома сего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святой обители сей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-5">.</span>
                    <Tooltip>
                        Далее могут быть ещё добавлены особые прошения, в т. ч. по специальной просьбе верных, о
                        болящих, по случаю различных бедствий, скорбей и нужд и т. д.
                    </Tooltip>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Ещё мы молимся о принося</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щих поже</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ртвования и де­ла­ющих доброе для этого святого и вседостойного хра­ма, о в нём трудя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щихся, пою­щих и пред­сто­я­щих лю­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дях, ожидающих от Тебя великой и неисто­щи­мой милости.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва при усердном <br />
                        (сугубом) молении
                    </span>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господи Боже наш, прими это усердное моление от служителей Твоих, и помилуй нас, по мно­жеству
                                Твоей милости, и яви
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Твоё сострадание к нам и ко всему народу Твоему, ожидающему от Тебя неистощи
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мой милости, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты ми</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">лостивый и человеколюби</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вый Бог и мы воссылаем славу Тебе, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, прилежное сие моление 
                                приими от Твоих раб, и помилуй нас по множеству милости Твоея, 
                                и щедроты Твоя низпосли на ны и на вся люди Твоя, 
                                чающыя от Тебе богатыя милости.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Яко милостив и человеколюбец Бог еси, 
                                и Тебе славу возсылаем, Отцу, и Сыну, и Святому Духу, 
                                ныне и присно, и во веки веков.  </span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="oglashaemie" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(5) Отпуст оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Оглашаемые, помолитесь Господу!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Оглашаемые</span>{' '}
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ектения об оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Верные, помолимся об оглашаемых, дабы Го­сподь помиловал их,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> огласил их словом Истины,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> открыл им Евангелие правды,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> соединил их со Своей святой, ка­фо­ли­ческой </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вселенской, соборной</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и апостольской Цер­ко­вью.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Спаси, помилуй, поддержи и сохрани их, Боже, Тво­ею благодатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Оглашаемые, главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ваши пред Господом пре­кло­ни</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Преклоняя головы:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Оглашаемые</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пред Тобой, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва об оглашаемых</span>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, 
                                живущий на Небесах и взи­раю­щий на всё создание Своё, воз­зри</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и на рабов Твоих оглашаемых, склони</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вших пред Тобой свои гла­вы</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">имена]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и дай им лёгкое бремя </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>Христово<span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , соделай их до­стойными членами Твоей святой Церкви и удостой их купели возрождения, прощения
                                грехов и одежды нетления, для познания Тебя, нашего истинного Бога, –
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дабы и они славили с нами вседостойное 
                                и пре­кра­с­ное имя Твоё,</span>
                                <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                                <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                                <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ны­не и всегда и во веки веков.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, иже на небесех живый и 
                                призираяй на вся дела Твоя, призри на рабы Твоя оглашенныя, 
                                приклоньшыя своя выя пред Тобою и даждь им легкий ярем, 
                                сотвори их уды честны святыя Твоея Церкве и сподоби их бани пакибытия, 
                                оставления грехов и одежди нетления, 
                                в познание Тебе, истиннаго Бога нашего.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да и тии с нами славят пречестное и 
                                великолепое имя Твое, Отца, и Сына, и Святаго Духа, ныне и присно, 
                                и во веки веков.</span>
                        </p>
                    </>
                )}                    

                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Оглашаемые, изы­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                До ХVI–ХVII века с середины Великого поста далее читались Ектения и Молитва о
                                просвещаемых, сохранившиеся в современной Литургии преждеосвящённых даров (
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-4">см. ниже, с. 95–96</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пусть не останется никого из оглашаемых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и просве­щае­мых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Или: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Пусть никто из оглашаемых, никто из тех, чья вера не­твер­да, никто из кающихся, никто
                                из нечистых{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(т. е. обуреваемых) </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">не при­бли­жается к святым та</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                инствам. Кто не причащается, да покинет собра­ние!
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (св. Григорий Двое­слов)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </>
                    </Tooltip>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        [Все непричащающиеся с благоговением покидают цер­ковь.]
                    </span>
                </p>
                <p id="vernie" className="_-ОСНОВНОЙ_Имя-Службы">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor002" />
                        II.
                        <br />
                        Литургия верных
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(1) Приуготовление</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Все верные, снова и снова в мире Господу помо­лим­ся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва первая</span>
                    <Tooltip> Древнее надписание: «После распростертия илитона» (возможно, с ан­ти­минсом).</Tooltip>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, Ты яви</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л нам это великое та</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ин­ство спасения, Ты удостоил нас, убогих и недостойных чад Своих, стать служителями Твоего
                                святого жертвенника, – Ты же и укрепи нас силой Твоего Святого Духа для этого служения, дабы,
                                не­осужде
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                нно став пред лицом Твоей святой Славы, мы приносили Тебе жертву хвалы, ведь совершаешь Ты всё
                                во всех. И да будет, Господи, наша жертва за грехи наши и совершённые по неведению Твоим народом
                                приятной и благоугодной пред лицом Твоим. –
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Громко:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ибо Тебе подобает вся слава, честь и поклонение, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во ве­ки веков.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ты, Господи, показал еси нам великое 
                                сие спасения таинство. Ты сподобил еси нас, 
                                смиренных и недостойных раб Твоих, быти служителем святаго Твоего жертвенника. 
                                Ты удовли нас, силою святаго Твоего Духа, в службу сию, да неосужденно 
                                ставше пред святою славою Твоею, принесем Ти жертву хваления. 
                                Ты бо еси действуяй вся во всех. Даждь, Господи, и о наших гресех, 
                                и о людских неведениих, приятней быти жертве нашей, 
                                и благоприятней пред Тобою.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Громко:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Яко подобает Тебе всякая слава, 
                                честь и поклонение, Отцу, и Сыну, и Святому Духу, ныне и присно, 
                                и во веки веков.</span>
                        </p>
                    </>
                )}                    
                                    
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Великая ектения
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(сокращённая)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О мире свыше и спасении наших душ Господу помо­лимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О мире всего мира, об укреплении святых Божьих цер­квей и единении всех Господу помолимся.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Об этом святом доме и обо всех, с верою, благоговением и страхом Божьим входящих в него, Господу
                        по­мо­лимся.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об избавле</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нии нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ния Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва вторая</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>

                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, Ты посетил на­шу малость милостью и состраданием и поставил нас, убогих, и грешных, и
                                недо­стойных чад Своих, пред лицом Твоей святой Славы для слу­жения святому жер­твеннику Твоему,
                                – Ты же и укрепи нас силой Твоего Святого Духа для этого служения и дару</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                й нам слово, чтобы открыть уста наши и при­зывать благодать Твоего Святого Духа на при­носи
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мые нами дары</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Громко:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дабы мы, под Твоей властью всегда хра­ни­мые, 
                                воссылали славу Тебе,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ны­не и всегда и во веки веков.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, посетивый в милости и щедротах 
                                смирение наше, поставивый нас смиренных и грешных и недостойных раб Твоих 
                                пред святою славою Твоею, служити святому жертвеннику Твоему. 
                                Ты укрепи нас силою Святаго Твоего Духа в службу сию, 
                                и даждь нам слово во отверзение уст наших, 
                                во еже призывати благодать Святаго Твоего Духа 
                                на хотящия предложитися Дары.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Громко:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Яко да под державою Твоею всегда храними, 
                                Тебе славу возсылаем, Отцу, и Сыну, и Святому Духу, ныне и присно, 
                                и во веки веков.</span>
                        </p>
                    </>
                )}

                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Дьякон (или предстоятель) совершает малое каждение с чте­нием Пс 50
                    </span>
                    <Tooltip>См. кн. 2, с. 180.</Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. При этом предстоятель молится:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва предстоятеля о себе </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Никто из свя</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">занных плотски</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми по</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                хотями и на­слаж­де­ниями не достоин приступать и прибли­жать­ся к Тебе или слу­жить Тебе, Царю
                                Славы, ибо слу­жение Тебе – велико
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и страшно для са­ми</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х небес­ных сил; и однако Ты, по Своему несказа</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                н­но­му и безмер­ному человеколюбию, не­пре­ложно и неизменно став Человеком и
                                Пер­во­свя­щенником нашим, при­ношение этого общего слу­жения и бескровной жертвы пере­да
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л нам как Владыка всего; ибо один Ты, Господи Бо­же наш, влады
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                чествуешь надо всем, что на небе и на земле, Ты – на престоле хе­ру­вимском носи­мый,
                                се­ра­фимов Господь и Царь Изра
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">иля, один Святой и во свя­тыне пребывающий.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Посему</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> прошу Тебя, одного благо</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">го и внимающего моль­ба</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м: воззри</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и на меня, грешного и негодного служителя Твоего</span>
                            <Tooltip>
                                <>
                                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В церковнославянском тексте далее вставка: </span>
                                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и очисти мою душу и сердце от сове­сти нечистой.</span>
                                </>
                            </Tooltip>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , и силой Твоего Свя­того Духа укрепи меня, облечённого благодатью священства, для предстояния
                                перед Твоим свя­тым престолом и принесения в жертву Твоего свя­того и непорочного тела и
                                драгоценной кро
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ви.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Преклони</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в свою главу</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , к Тебе приступаю и прошу Тебя: не отврати лица Твоего от меня и не извергни меня из числа сыно
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в Твоих, но бла­говоли</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , чтобы и через ме­ня, греш­ного и недо­стой­ного служителя Твоего, были при­несены
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Те­бе эти дары</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты Сам принося</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щий и приноси</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                мый, при­ни­ма­ющий и раздаваемый, Христе Боже наш, и мы воссы­ла­ем славу Те­бе, вместе со
                                безначальным Твоим Отцом и все­святым и благим и живо­творящим Твоим Ду­хом, ныне и всегда и во
                                ве­ки веков.</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                   <>
                       <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Никтоже достоин от связавшихся плотскими 
                                похотьми и сластьми приходити, или приближитися, 
                                или служити Тебе, Царю Славы: еже бо служити Тебе, 
                                велико и страшно и самем Небесным Силам. 
                                Но обаче неизреченнаго ради и безмернаго Твоего человеколюбия, 
                                непреложно и неизменно был еси Человек, и Архиерей нам был еси: 
                                и служебныя сея и безкровныя жертвы священнодействие предал еси нам, 
                                яко Владыка всех. Ты бо един, Господи Боже наш, 
                                владычествуеши небесными и земными, иже на престоле Херувимсте носимый, 
                                иже Серафимов Господь, и Царь Израилев, иже Един свят, и во святых почиваяй.
                                </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Тя убо молю, Единаго благаго и благопослушливаго: 
                                призри на мя, грешнаго и непотребнаго раба Твоего, 
                                и очисти мою душу и сердце от совести лукавыя, и удовли мя, 
                                силою святаго Твоего Духа, облечена благодатию священства, 
                                предстати святей Твоей сей трапезе, и священнодействовати Святое 
                                и Пречистое Твое Тело и Честную Кровь.</span>
                        </p>        
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">К Тебе бо прихожду приклонь мою выю, и молю Ти ся, 
                                да не отвратиши лица Твоего от мене, ниже отринеши мене от отрок Твоих, 
                                но сподоби принесенным Тебе быти, мною грешным и недостойным рабом Твоим, 
                                даром сим.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ты бо еси приносяй и приносимый, 
                                и приемляй и раздаваемый, Христе Боже наш, 
                                и Тебе славу возсылаем, со безначальным Твоим Отцем, 
                                и Пресвятым, и Благим, и Животворящим Твоим Духом, 
                                ныне и присно, и во веки веков.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p id="vhod" className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(2) Вход</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Херувимская песнь
                        <br />
                        (входная песнь Литургии верных)
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> 1-я часть Херувимской песни:</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Херувимов в таинстве изображая…</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В то же время:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Херувимов в таинстве изображая <br /> и живо­творя­щей Троице <br /> Трисвятую песнь
                                воспевая, <br />
                                вся­кое ныне жи­тейское <br /> отло
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">жим попечение,</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дабы приня</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ть нам Царя всего сущего, <br /> стражей ангельской
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> незримо сопровожда</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ­емого.
                                <br />
                                Аллилуия, аллилуия, аллилуия.
                            </span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Иже Херувимы тайно образующе…</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В то же время:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Иже Херувимы тайно образующе <br /> и животворящей Троице <br /> Трисвятую песнь
                                припевающе, <br />
                                всякое ныне житейское <br /> отложим попечение.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Яко да Царя всех подымем, <br /> ангельскими невидимо дориносима чинми.
                                <br />
                                Аллилуия, аллилуия, аллилуия.
                            </span>
                        </p>
                    </>
                )}

                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Трижды.) </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">В Великий четверг:</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">пезы та</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        инственной Твоей, о Сын Божий,
                        <br />
                        ме­ня прича­стни­ком ныне прими
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ,<br />
                        ибо я врагам Твоим{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аллилуия, аллилуия, аллилуия.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В Великую субботу:</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Да молчит всякая плоть человеческая,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и да стоит со страхом и трепетом,
                        <br />и ничего земного в себе да не помышляет,
                        <br />
                        ибо Царь ца
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">рствующих и Господь госпо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        дствующих
                        <br />
                        приходит, дабы быть за
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        кланным <br />и отдать Себя в пищу верным.
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И шествуют пред Ним чины</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
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
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Простите меня, братья </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и сёстры</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, греш­ного!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Прости и ты нас, досточти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мый отче!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> У жертвенника – после омовения рук:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, будь милостив ко мне, грешному!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо – после проскомидии и покрытия даров:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подыми, владыка!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Дьякону, принимающему дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Возденьте руки ваши ко св­ятыне, <br /> и бла­гословите Го­с­пода!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 133:2.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Далее совершается Великий вход с приготов­лен­ными к прино­ше­нию хле­бом и вином.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-14">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Проскомидийные
                        <br />
                        поминовения
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Великого господина и отца нашего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, свя­тей­шего патри­ар­ха Мо­сковского и всея Руси </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и господина нашего преосвящен­ней­ше­го </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">, ми­тро­по­лита </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> архиепископа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> епи­скопа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (титул)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог во цар­ствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во ве­ки ве­ков;</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вас и всех </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или как у греков:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и всех вас</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> право­слав­ных </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> благочестивых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> христи­ан да вос­по</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во ве­ки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д и Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог твоё пресвитерство во цар­ствии Своём!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К дьякону – тихо:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог твоё священнодья</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">конство во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь. </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> 2-я часть Херувим­ской песни: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дабы приня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ть нам Царя всего сущего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-6">… </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(См. с. 22.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо – ставя св. дары на пре­стол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Достопочтенный Иосиф,
                        <br /> сняв с креста непорочное те­ло Твоё, <br />
                        плащани
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        цей чистой с ароматами обвил <br /> и, погребая, в гробнице новой положи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        В гробнице – телом <br /> и в аду – душой как Бог, <br />в раю – с разбойником <br /> и на
                        престоле – со Отцом и Ду­хом <br />
                        Ты пребывал, Христе, <br /> всё наполняя, не­объя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тный.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О, сколь живоно</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        сным и воистину
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">прекраснее ра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        я <br /> и све­т­лее любого царского чертога <br />
                        явился, Христе, гроб Твой – <br /> источник нашего воскресения!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Покрывая св. дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Достопочтенный Иосиф…</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Кадя св. дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Одари</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ми­ло­с­тию Твоею Сион,
                        <br /> стены Иерусалима отстрой! <br />
                        Тогда будут жертвы угодны Тебе,
                        <br /> всесожже
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ний и возношений обряд; <br />
                        тогда возло
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        жат тельцов <br /> на алтарь Твой{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 50:20-21)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">К дьякону:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни меня, брат и сослужитель!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К предстоятелю:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог твоё пресви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тер­ство во царствии Своём!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Помолись обо мне, брат святой!</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Дух Святой да сойдёт на тебя, <br /> и Сила Вышнего да осени
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т тебя!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Лк 1:35.)</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тот же Дух да содействует нам во все дни жизни нашей!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни меня, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог тебя во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Просительная ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Восполним нашу молитву Господу!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О приносимых святых дара</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Об этом святом доме и обо всех, с верою, благо­го­ве­нием и стра­хом Божьим входящих в него,
                        Господу по­мо­лимся.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об избавлении нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­дения Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Весь день провести свято, мирно и без­греш­но у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подай, Господи </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ангела мира – верного наставника, хранителя душ и тел на­ших – у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Прощения и отпущения наших грехов и согрешений у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Доброго и полезного нашим ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">шам и мира миру у Господа испросим.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Остальное время нашей жизни прожить в мире и покаянии у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Безболезненной, непо­стыд­ной, мирной христианской кончины нашей жизни и доброго ответа пред
                        Христом на Страш­ном Суде испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Всесвяту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ю, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">чную, преблагослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нную, слав­ную нашу Вла­дычи­цу Богородицу и Вечноде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ву Марию со всеми свя­тыми помяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х се­бя, и друг друга, и всю жизнь нашу Христу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дадим </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p id="prinoshenie" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед возношением</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> По поставлении св. даров на престол:</span>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, Ты созда</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л нас и привёл в эту жизнь, Ты показал нам пути ко спасению и да­рова
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л откровение небесных таинств! Ты поставил нас на это служение силой Твоего Святого Духа – так
                                удостой нас, Господи, стать служителями Нового Завета Твоего и совершителями Твоих святых
                                таинств. По множеству Твоей милости прими нас, приближающихся к Твоему святому жертвеннику, дабы
                                мы были достойны приносить Тебе эту духовную и бескровную жертву за грехи наши и совершённые по
                                неведению Твоим народом. Приня
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в же её на Свой святой, и пренебесный, и умопостига</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">емый жертвенник, как благоуха</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ние приятное, в ответ ниспошли нам благодать Твоего Святого Духа.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, обрати Свой взор на нас, и воззри</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> на это наше служение, и прими его, как Ты при</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нял да­ры</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Авеля, жертвы Ноя, всесож­жения Авраама, 
                                приношения Моисе</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я и Ааро</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">на и мирные жерт­вы Самуи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ла. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Как Ты при</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                нял от Твоих святых апостолов это истинное служение, так, по благости Твоей, Господи, прими и из
                                рук нас, грешных, эти предлежащие
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дары</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , дабы и мы, удо­стоившись безупречно служить Твоему святому жерт­вен­ни­ку, обрели награду
                                верных и разумных домо­прави
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">телей в Страшный День Твоего справедливого воздаяния, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                по состраданию единородного Сына Твоего, с Кото­рым Ты благословен, вместе со всесвяты
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и благи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и живо­творя</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щим Твоим Духом, ныне и всегда и во веки веков.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, создавый нас и введый 
                                в жизнь сию, показавый нам пути во спасение, 
                                даровавый нам Небесных Таин откровение. 
                                Ты бо еси положивый нас в службу сию, силою Духа Твоего Святаго. 
                                Благоволи убо, Господи, быти нам служителем новаго Твоего Завета, 
                                слугам святых Твоих Таинств. Приими нас, 
                                приближающихся святому Твоему жертвеннику, по множеству милости Твоея, 
                                да будем достойни приносити Тебе словесную сию и безкровную жертву о наших 
                                согрешениих и о людских невежествиих: юже прием во святый и пренебесный, 
                                и мысленный Твой жертвенник, в воню благоухания, 
                                возниспосли нам благодать Святаго Твоего Духа. </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Призри на ны, Боже, и виждь на службу сию нашу, 
                                и приими ю, якоже приял еси Авелевы дары, Ноевы жертвы, 
                                Авраамова всеплодия, Моисеова и Ааронова священства, Самуилова мирная. 
                                Якоже приял еси от святых Твоих Апостол истинную сию службу, 
                                сице и от рук нас, грешных, приими Дары сия в благости Твоей, 
                                Господи, яко да сподобльшеся служити без порока святому Твоему жертвеннику, 
                                обрящем мзду верных и мудрых строителей в день 
                                страшный воздаяния Твоего праведнаго</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Щедротами Единороднаго Сына Твоего, 
                                с Нимже благословен еси, со Пресвятым и Благим и Животворящим Твоим Духом, 
                                ныне и присно, и во веки веков.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p id="tselovanie" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(3) Целование мира и исповедание веры</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед целованием</span> мира
                    <Tooltip> На Руси читалась до сер. ХVII в. Изначально могла быть обращена к Богу-Отцу.</Tooltip>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Иисусе Христе,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Боже наш, Созидатель любви и благ Податель, дай и нам, чадам Твоим, любить друг друга, как
                        возлюбил нас Ты, дабы, соединённые любовью единой, мы к Тебе, Богу, приступили, и вознесли Тебе
                        хвалу, и причастились Твоим святым таинствам, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты Любовь наша и мы воссылаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">вместе со безначальным Твоим Отцом и всесвяты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-петит">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и животворя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-петит">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">щим Твоим Духом,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возлю</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бим друг друга! </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Или: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Будем приветст­во­вать друг друга целованием святым! – </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Рим 16:16.</span>
                            <Tooltip>
                                <>
                                    <p className="petitBigIndent">
                                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Далее в тексте Служебника вставки:</span>
                                    </p>
                                    <p className="petitBigIndent">
                                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> …дабы в единомыслии ис­по­ведать:</span>
                                    </p>
                                    <p className="petitBigIndent">
                                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                            {' '}
                                            Отца и Сына и Святого Духа – Троицу единосущ­ную и нераздельную.
                                        </span>
                                    </p>
                                </>
                            </Tooltip>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П [и Н] </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Возлюблю Тебя, Господи, крепость моя! <br /> Господь – твердыня моя{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и прибежище моё</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 17:2-3)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возлюбим друг друга, 
                                да единомыслием исповемы.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П [и Н] </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Возлюблю Тя, Господи, крепосте моя, Господь утверждение мое и прибежище мое.
                            </span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_КРАСН-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Триж­ды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Сослужащим [и затем народу], христосуясь:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Христос посреди нас!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Сослужащие [и затем народ] </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">И есть, и будет</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Согласно древней практике перед закрытием дверей все верные дают друг другу целование
                                мира и любви со сло­вами:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос посреди нас!</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> – и отвечая: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">И есть, и будет!</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [или: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес! </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">– </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Воистину воскрес!</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">].</span>
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> После преподания всем любви и мира:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Двери, двери!</span>
                    <Tooltip>
                        <>
                            «Дьяконы пусть стоят при дверях… чтобы во время возношения никто не выходил и чтобы не
                            отворялась дверь, хотя бы пришёл и верующий» (Апостольские постанов­ления. 8. 11).
                        </>
                    </Tooltip>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В Премудрости будем внимать!</span>
                </p>
                <p id="simvol" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Символ веры</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Опахивая св. дары возду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-красн">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">хом: </span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Верую в одного Бога – Отца</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-4">,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Вседержителя, Твор­ца неба и земли, всего видимого и невидимого.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                И в одного Господа Иисуса Христа, Сына Божь­его&nbsp;– еди­но­родного, от Отца
                                рождённого прежде всех вре­мён{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> миров</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , Свет от Света, Бога истинного от Бо­га ис­тин­но­го, рождённого,{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">но</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                не сотворённого, едино­сущ­ного От­цу, – чрез Которого всё стало;
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                ради нас, людей, и для нашего спасения сшед­шего с Не­бес, и воплоти
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                вшегося от Духа Свя­того и Де­вы Ма­рии, и ставшего Человеком;
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и распя</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                того за нас при Пилате Понтийском, и стра­дав­шего, и погребённого;
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и воскресшего </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> восставшего</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в третий день, по Пи­са­нию;</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и восшедшего </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вознёсшегося</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> на Небеса, и воссевшего по правую руку от Отца;</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и снова гряду</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                щего во Славе, дабы судить живых и мёрт­вых, и Царству Его не будет конца.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                И в Духа Святого – Господа, животворящего, от От­ца ис­ходящего, со Отцом и Сыном вместе
                                почитаемого и прославляемого, говорившего через про­роков.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В одну святую, кафоли</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ческую </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вселенскую, со­бор­ную</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и апостольскую Церковь.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Признаю</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> одно крещение, ради прощения грехов.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ожидаю воскресения мёртвых </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и Жизни будущего века </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                                (т.&nbsp;е. вечной Жизни и нового состояния всего мира)
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Н]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Верую во единаго Бога Отца Вседержителя,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Творца небу и земли, видимым же всем и невидимым.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                И во единаго Господа Иисуса Христа, Сына Божия, Единороднаго, Иже от Отца рожденнаго
                                прежде всех век.{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Света от Света, Бога истинна от Бога истинна, рожденна,{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> несотворенна, единосущна Отцу, Имже вся быша.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Нас ради человек и нашего ради спасения сшедшаго с небес и воплотившагося от Духа Свята
                                и Марии Девы и вочеловечшася.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Распятаго же за ны при Понтийстем Пилате, и страдавша, и погребенна.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И воскресшаго в третий день по Писанием.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И возшедшаго на небеса, и седяща одесную Отца.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                И паки грядущаго со славою судити живым и мертвым, Егоже Царствию не будет конца.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                И в Духа Святаго, Господа, Животворящаго, Иже от Отца исходящаго, Иже со Отцем и Сыном
                                спокланяема и сславима, глаголавшаго пророки.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Во едину Святую, Соборную и Апостольскую Церковь.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Исповедую едино крещение во оставление грехов.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Чаю воскресения мертвых, и жизни будущаго века.{' '}
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Н]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Звездочки">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="anafora" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(4) Св. возношение (ана</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">фора)</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Раздел (4) – Евхаристический кано</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                н. Он со­стоит из вступления и четы­рёх основных частей: префа
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">цио (вводная часть), ана</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">мнесис (воспо­ми­нание), эпи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">клесис (при­зы­вание) и ин­тер­це</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ссио (хода</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">­тай­ство).</span>
                        </>
                    </Tooltip>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Станем строго, станем благоговейно! 
                                Будем со вни­манием святое возношение в мире при­но­сить:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> жертву хвалы, милость и мир.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К народу:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благодать Господа нашего Иисуса Хри­ста, 
                                и любовь Бога и Отца, и общение Святого Ду­ха да будет
                                со всеми вами!</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И со духом твоим.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Воздев руки:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вознесём сердца!</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возно</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">сим ко Господу.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возблагодари</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м Господа!</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Достойно это, и праведно, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и справедливо</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                            <Tooltip>
                                <>
                                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Далее в тексте Служебника вставка: </span>
                                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                        покло­няться Отцу и Сыну и Святому Духу, Троице еди­носущной и нераз­дельной.
                                    </span>
                                </>
                            </Tooltip>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Станем добре, станем со страхом, вонмем, 
                                святое возношение в мире приносити.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Милость мира, жертву хваления.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К народу:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благодать Господа нашего Иисуса Христа, 
                                и любы Бога и Отца, и причастие Святаго Духа, буди со всеми вами.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И со духом твоим.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Воздев руки:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Горе имеим сердца.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Имамы ко Господу.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благодарим Господа.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Достойно и праведно есть покланятися Отцу 
                                и Сыну, и Святому Духу, Троице единосущней и нераздельней.</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                    </>
                )}                    
                <p id="prefacio" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Вводная часть (префа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">цио)</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Сущий, Владыка, Господь, Бог-Отец, Вседержитель, Которому подобает поклонение! Поистине достойно
                                это, и праведно,{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и справедливо,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и сообра</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">зно великолепию святости Твоей – восхвалять Те­бя</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , воспевать Тебя, благословлять Тебя, покло­няться Тебе, благодарить Тебя и прославлять Тебя,
                                одного воистину существующего Бо­га, и с сокрушённым сердцем и сми­ре
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нным духом приносить Те­бе</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> это наше духовное служение, ибо Ты</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> нам дарова</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л познание Твоей Истины.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Но способен ли кто изре</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">чь могущество Твоё, возвестить все хвалы Тебе или пове</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                дать все чудеса Твои, которые Ты совершаешь во всякое время? – о Ты
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                , Владыка всего, Господь неба и земли и всего видимого и невидимого творения, восседающий на
                                престоле Славы и прозрева
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющий бездны, безначальный, невидимый, непостижи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                мый, необъятный, неизменный, Отец Господа нашего Иисуса Христа, великого Бога и Спасителя,
                                Надежды нашей.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Он же есть образ Твоей благости, 
                                верный отпечаток, в Себе являющий Тебя, Отца; Он есть живое
                                Сло­во, истинный Бог, превечная Премудрость, Жизнь, Освящение, 
                                Сила, Свет истинный.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> От Него и Дух Святой явился, Дух Истины, 
                                как дар усыновле</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ния, залог будущего наследия, на­ча</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ток вечных благ, животворящая сила, источник освящения.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> От этого Духа обретая силу, 
                                Тебе поклоняются <br />и воссылают неоскудева</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ющее славословие все духовные и разумные создания, ибо они все – служители Твои: Тебя восхваляют
                                ангелы, архангелы, престолы, господства, начала, власти, силы и многоокие херувимы, вокруг Тебя
                                предстоят серафимы – шесть крыл у одних и шесть крыл у других, – и двумя они покрывают лица
                                свои, а двумя – ноги, и двумя летают, в не­пре­станном славо­словии взывая друг ко другу
                                неумолка
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющими устами,</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Сый Владыко, 
                                Господи Боже Отче Вседержителю покланяемый! 
                                Достойно яко воистинну, и праведно, и лепо великолепию святыни Твоея, 
                                Тебе хвалити, Тебе пети, Тебе благословити, Тебе кланятися, Тебе благодарити, 
                                Тебе славити единаго воистинну сущаго Бога, 
                                и Тебе приносити сердцем сокрушенным и духом смирения словесную сию службу нашу, 
                                яко Ты еси даровавый нам познание Твоея истины.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И кто доволен возглаголати силы Твоя, 
                                слышаны сотворити вся хвалы Твоя, или поведати вся чудеса Твоя во всяко время. 
                                Владыко всех, Господи небесе и земли, и всея твари, видимыя же и невидимыя, 
                                седяй на престоле славы и призираяй бездны, безначальне, невидиме, непостижиме, 
                                неописанне, неизменне, Отче Господа нашего Иисуса Христа, 
                                великаго Бога и Спасителя, упования нашего, 
                                иже есть образ Твоея благости:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> печать равнообразная, в себе показуя Тя, 
                                Отца, Слово живое, Бог истинный, превечная Премудрость, живот, 
                                освящение, сила, свет истинный, </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">имже Дух Святый явися; Дух истины, 
                                сыноположения дарование, обручение будущаго наследия, начаток вечных благ, 
                                животворящая сила, источник освящения, от негоже вся тварь словесная же 
                                и умная укрепляема Тебе служит и Тебе присносущное возсылает славословие, 
                                яко всяческая работна Тебе. </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе бо хвалят Ангели, Архангели, 
                                Престоли, Господьствия, Начала, Власти, Силы и многоочитии Херувими. 
                                Тебе предстоят окрест Серафими, шесть крил единому, и шесть крил единому; 
                                и двема убо покрывают лица своя, двема же ноги, и двема летающе, 
                                взывают един ко другому, непрестанными усты, 
                                немолчными славословеньми.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д [или П] Соделывает звездицей образ Креста.</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> победную песнь воспевая, восклицая, возглашая и говоря </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(звездица отлагается)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> свят, свят, свят Господь Савао</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ф </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. небесных воинств)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">; полны</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> небо и зе­мля Славы Твоей! Оса</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">н­на </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. спасение)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в выш­них! Благословен Гряду</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­щий во имя Господне! Оса</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">н­на в вышних! </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Народ вторит.)</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> С этими блаженными силами, 
                                человеколюбивый Владыка, и мы, грешные, восклицаем и говорим: Ты
                                поистине свят и всесвят, и нет меры великолепию святости Твоей; 
                                и праведен Ты во всех делах
                                Своих, ибо Ты всё навёл на нас по справедливости и истинному суду!
                            </span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Победную песнь поюще, вопиюще, взывающе и глаголюще. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(звездица отлагается)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">:</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> свят, свят, свят Господь Савао</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ф </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. небесных воинств)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">; исполнь небо и земля славы Твоея; 
                                осанна в вышних, благословен Грядый во имя Господне, осанна в вышних. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Народ вторит.)</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> С сими блаженными силами, 
                                Владыко человеколюбче, и мы, грешнии, вопием и глаголем: 
                                свят еси, яко воистинну, и пресвят, и несть меры великолепию святыни Твоея, 
                                и преподобен во всех делех Твоих, яко правдою 
                                  и судом истинным вся навел еси на ны:
                            </span>
                        </p>
                    </>
                )}
                <p id="anamnesis" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Воспоминание (ана</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">мнесис)</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ты созда</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л человека, взяв прах из земли, и образом Твоим, Боже, его почтил, и посели
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л его в раю сладостном, пообещав ему бессмертную Жизнь и наслаждение вечными бла
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">гами через соблюдение за</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">поведей Твоих. Но ослу</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">шавшего­ся Тебя, истинного Бога, созда</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                вшего его, и об­ма­ном змия прельщённого, и умерщвлённого собствен­ными согреше­ниями, Ты изгнал
                                его по справедливому су­ду Твоему, Боже, из ра
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                я в мир сей и воз­вратил в землю, из которой он был взят, уготовля
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я ему спасение через возрождение в Само</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м Твоём Христе.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ты не отвратился окончательно от Своего создания, которое сотворил, о Благо
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                й, и не забыл дело рук Своих, но по Своему милосердию мно­гообра
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">зно посещал его: Ты посылал пророков, творил зна</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мения через Своих святых, в каждом роде благоугожда</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                вших Тебе, Ты говорил нам устами Своих слуг пророков, предвозвещая нам грядущее спасение, Ты
                                Закон дал в помощь и ангелов поставил хранителями. А когда настала полнота времён, Ты говорил
                                нам в Само
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                м Своём Сыне, чрез Которого Ты и ход веков сотворил. Он же, будучи излуче­нием Твоей Славы и
                                отпечатком Сущности{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Ипостаси</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоей, всё держа могущественным словом Своим, не почитал хищением быть равным Тебе, Богу и Отцу;
                                но, будучи Богом превечным, Он явился на земле и жил с людьми и, от святой Девы воплотившись,
                                ума
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­лил Само­го</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">` </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Себя, при­ня</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в человеческий облик и соделавшись подобным уничиже</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                нному телу на­шему, дабы и нас соделать подобными Своему славному образу.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Поскольку через человека грех вошёл в мир и через грех </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">пришла</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> смерть, Твой единородный Сын, сущий в недрах Твоих, Бога и Отца, родился от женщины – святой
                                Богородицы и Вечноде
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вы Марии, – родился под Законом, чтобы в Своей пло</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ти осудить грех, дабы умирающие в Адаме оживотво­ри</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">лись в Само</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м Твоём Христе. А прожи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                в в мире сем, дав спаси­тельные повеления и избавив нас от и
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                доль­ского заблуждения, Он при­вёл нас к познанию Тебя, истинного Бога и От­ца, приобретя
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Себе нас как народ и</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                збранный, царственное священство, род святой. И очистив нас во­дою и освятив Духом Святым, Он
                                вместо нас Себя отда
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л смерти, которой принадлежали мы, про</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                данные под власть Греха. И сойдя чрез крест во ад, чтобы Собой наполнить всё, Он расторг утробу
                                смерти. И воскре
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">с­нув в третий день и проложи</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в путь всякой пло</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ­ти к воскре­сению из мёртвых&nbsp;– ибо невозможно было тлению удержать Начальника
                                Жизни,&nbsp;– Он соделался на­ча
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т­ком усопших, пе</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                рвенцем из мёртвых, дабы иметь Ему между всеми во всём первенство. И взойдя на Небеса, Он{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                воссел по правую сторону Твоего величия в вышних; Он и придёт воздать каждому по делам его.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Он же в воспоминание Своего спасительного страдания оставил нам то, что мы ныне, по заповеди
                                Его, возлагаем пред Тобою. Ибо намере­ва
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                ясь вый­ти на&nbsp;Свою добровольную, и славную, и жи­во­творя
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                щую смерть, Он в ту ночь, в которую отдавал Себя за Жизнь мира, взяв хлеб в Свои святые и
                                непорочные руки и показав его Тебе, Богу и Отцу, возблагода­рив и благословив, освятив, преломи
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л и</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> пода</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л его Своим святым ученикам и апостолам, сказав: «Прими</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те, вкуси</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                те, это тело Моё, за вас преломляемое ради прощения грехов».
                            </span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> создав бо человека, персть взем от земли, 
                                и образом Твоим, Боже, почет, положил еси в раи сладости, 
                                безсмертие жизни и наслаждение вечных благ, 
                                в соблюдении заповедей Твоих обещав ему, но преслушавша Тебе, 
                                истиннаго Бога, создавшаго его, и прелестию змиевою привлекшася, 
                                умерщвлена же своими прегрешеньми, изгнал еси его праведным Твоим судом, 
                                Боже, от рая в мiр сей, и отвратил еси в землю, от неяже взят бысть, 
                                устрояя ему еже от пакибытия спасение, в Самем Христе Твоем.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Не бо отвратился еси создания Твоего в конец, 
                                еже сотворил еси, Блаже, ниже забыл еси дела рук Твоих, 
                                но посетил еси многообразне, ради милосердия милости Твоея. 
                                Пророки послал еси, сотворил еси силы святыми Твоими, 
                                в коемждо роде благоугодившими Тебе. Глаголал еси нам усты раб Твоих пророков, 
                                предвозвещая нам хотящее быти спасение. Закон дал еси в помощь, 
                                Ангелы поставил еси хранители. Егда же прииде исполнение времен, 
                                глаголал еси нам самем Сыном Твоим, Имже и веки сотворил еси, 
                                Иже сый сияние славы Твоея и начертание ипостаси Твоея, 
                                нося же вся глаголом силы Своея, не хищение непщева еже быти равен Тебе, 
                                Богу и Отцу, но Бог сый превечный, на земли явися и человеком споживе. 
                                И от Девы Святыя воплощся, истощи Себе, зрак раба прием, 
                                сообразен быв телу смирения нашего, да нас сообразны сотворит образу славы Своея. 
                                </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Понеже бо человеком грех вниде в мiр и 
                                грехом смерть, благоволи Единородный Твой Сын, сый в недрех Тебе, 
                                Бога и Отца, быв от жены, Святыя Богородицы и Приснодевы Марии, 
                                быв под законом, осудити грех во плоти Своей, да во Адаме умирающе, 
                                оживотворятся в самем Христе Твоем. И пожив в мiре сем, 
                                дав повеления спасительная, отставив нас прелести идольския, 
                                приведе в познание Тебе, истиннаго Бога и Отца, стяжав нас Себе, 
                                люди избранны, царское священие, язык свят. 
                                И очистив водою, и освятив Духом Святым, даде Себе измену смерти, 
                                в нейже держими бехом, продани под грехом, и сошед крестом во ад, 
                                да исполнит Собою вся, разреши болезни смертныя. 
                                И воскрес в третий день, и путь сотворив всякой плоти к воскресению 
                                из мертвых, зане не бяше мощно держиму быти тлением начальнику жизни, 
                                бысть начаток умерших, перворожден из мертвых, да будет Сам вся, 
                                во всех первенствуяй. И возшед на небеса, седе одесную величествия 
                                Твоего на высоких, иже и приидет воздати комуждо по делом его.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Остави же нам воспоминания спасительнаго 
                                Своего страдания сия, яже предложихом по Его заповедем. 
                                Хотя бо изыти на вольную и приснопамятную, и животворящую Свою смерть, 
                                в нощь, в нюже предаяше Себе за живот мiра, прием хлеб на святыя Своя 
                                и пречистыя руки, показав Тебе, Богу и Отцу, благодарив, благословив, 
                                освятив, преломив,</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> даде святым Своим учеником и Апостолом, рек: 
                                приимите, ядите, сие есть Тело Мое, еже за вы ломимое, 
                                во оставление грехов.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Так же взяв и чашу с пло</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дом вино­градной лозы</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и смешав вино с водой, возблагодарив и благословив, освятив,
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> пода</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                л её Своим святым ученикам и апостолам, сказав: «Пейте из неё все, это кровь Моя, кровь Нового
                                Завета, за вас и за многих изливаемая ради прощения грехов.
                            </span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подобне и чашу от плода лознаго прием, растворив, 
                                благодарив, благословив, освятив,</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> даде святым Своим учеником и Апостолом, рек: 
                                пийте от нея вси, сия есть Кровь Моя Новаго завета, 
                                яже за вы и за многи изливаемая во оставление грехов.</span>
                        </p>
                    </>
                )}                                            
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                {lang === 'default' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Сие творите в воспоминание обо Мне. Ибо всякий раз, когда вы еди
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                те этот хлеб и пьёте чашу сию, Мою Смерть возве­щаете, Моё Воскресение испове
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дуете».</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вот, Владыка, и мы, воспомина</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я Его спасительные страдания, животворя</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                щий крест, тридневное погребение, из мёртвых воскресение, на Небеса восхождение, по правую руку
                                от Тебя, Бога и Отца, восседание и Его славное и страшное Второе Пришествие,
                            </span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>                
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Сие творите в Мое воспоминание: 
                                елижды бо аще ясте Хлеб сей и Чашу сию пиете, Мою смерть возвещаете, 
                                Мое воскресение исповедаете.</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Поминающе убо, Владыко, и мы спасительная 
                                Его страдания, животворящий Крест, тридневное погребение, 
                                еже из мертвых воскресение, еже на небеса возшествие, 
                                еже одесную Тебе, Бога и Отца, седение, и славное, 
                                и страшное Его второе пришествие.</span>
                        </p>
                    </>
                )}                      
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д [или П] Возносит хлеб и вино.</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоё из Твоего Тебе принося всегда и везде
                            </span>
                            <Tooltip>
                                <>
                                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                        См. у М. Арранца и др. С греч., возможно ещё: 
                                    </span>
                                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                        «согласно всему (этому) (по всем этим причинам) и для всего (этого)» 
                                        (Е. Ло­вягин и др.).
                                    </span>
                                </>
                            </Tooltip>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                        </p>
                    </>
                )}
                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоя от Твоих Тебе приносяще о всех и за вся.
                            </span>
                        </p>
                    </>
                )}

                {lang === 'default' && (
                    <>               
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебя воспеваем, Тебя благословляем, 
                                Тебя бла­го­да­рим, Господи, и Тебе молимся, Боже наш!
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (На­род вто­рит.)</span>
                            <Tooltip>
                                <>
                                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                        В церковнославянском тексте Служебника далее следует вставка: тропарь Третьего часа, со
                                        стихами (см. Приложения в кн. 1 серии «Православное богослужение», а также Третий час в
                                        кн. 7).
                                    </span>
                                </>
                            </Tooltip>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>              
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Тебе поем, Тебе благословим, 
                                Тебе благодарим, Господи, и молим Ти ся, Боже наш.Тебя воспеваем, 
                                Тебя благословляем, Тебя бла­го­да­рим, Господи, и Тебе молимся, Боже наш!
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (На­род вто­рит.)</span>
                            <Tooltip>
                                <>
                                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                        В церковнославянском тексте Служебника далее следует вставка: тропарь Третьего часа, со
                                        стихами (см. Приложения в кн. 1 серии «Православное богослужение», а также Третий час в
                                        кн. 7).
                                    </span>
                                </>
                            </Tooltip>
                        </p>
                    </>
                )}

                <p id="epiclisis" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-17">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Призывание (эпи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">клесис)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Посему</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , Владыка всесвятой, и мы, Твои грешные и недостойные служи­тели, удостоенные служить Твоему
                        святому жертвеннику не по пра­вед­ности нашей, ибо ничего доброго не совершили на земле, но по
                        Твоей милос­ти и состраданию Твоему, которые Ты обильно излил на нас, с дерз­но­вением
                        приближаемся к Твоему святому жертвен­ни­ку и, возложи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в пред Тобой ото</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бра­зы </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (т.&nbsp; е. реальное подобие, заместительные образы)
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        святого Тела и Крови Твоего Христа, Тебе мо­лимся и просим Тебя, о Святой святых, чтобы по
                        благо­воле
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нию Твоей благости пришёл Твой Дух Святой на нас и на эти предлежащие дары
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и благословил их, и освятил, и явил:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, святой хлеб!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> этот хлеб – сами</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м святым телом Господа, и Бога, и Спа­сителя нашего Иисуса Христа,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д [и Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, святую чашу!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> а чашу сию – само</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й святою кровью Господа, и Бога, и Спасителя нашего Иисуса Христа,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д [и Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Благословляя:]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> проли</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">той за Жизнь мира </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и спасение</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д [и Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, их вместе!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя: </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Преложи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(т. е. перемени</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-красн">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">в)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоим Духом Святым.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    <Tooltip>Неудачная вставка из Литургии св. Иоанна Златоуста.</Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д [и Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь, аминь, аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни меня, святой владыка, грешного!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог тебя во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Отходя на прежнее место:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p id="hodataistvo" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ход</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">а</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">тайство (интерц</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">е</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ссио)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Нас же всех, от одного хлеба и одной чаши причащающихся, соедини друг со другом для обще­ния
                        одного Святого Духа, и соделай так, чтобы никто из нас не причащался святому те­лу и кро
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ви Твоего Христа в су­д или во осуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ние, но чтобы мы снискали Твою милость и благоволение – вместе со всеми святыми, во все века
                        тво­рившими угодное Те­бе:{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> с пра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        отцами, отцами, пат­риар­хами, пророками, апостолами, про­по­ведниками, благове
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">стниками, мучени­ками, исповедниками, учи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­телями, и со ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">хами всех праведников, в вере достиг­ших совершенства </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">почивших</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и особенно со всесвято</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й, непоро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">чной, пре­благослове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нной, славной нашей Владычицей Богородицей и Вечноде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вой Марией;</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Во время каждения св. даров:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О тебе радуется, Благодатная, всё творение,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ангельский собор и человечес­кий род!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О храм освящённый и духовный рай,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дев хвала,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> от тебя Бог воплотился</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и – превечный Бог наш – Младенцем стал.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Он утробу твою престолом сотворил</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и чрево твоё про­страннее небес соделал.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О тебе радуется, Благодатная, всё творение – слава тебе!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и со святым Иоанном, пророком, Предтечей и Крестителем, со святыми славными и всехвальными
                        апостолами,
                    </span>{' '}
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">со святыми </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , которых па­мять ныне совершаем, и со всеми святыми Твоими, по молит­вам которых воззри на нас,
                        Боже.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И ещё воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни всех прежде усопших с надеждой на воскресение для Жизни вечной{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоих </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена усопших)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и упокой их там, где сияет свет лица Твоего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Ещё мы мо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">лим Тебя</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> о спасении, посещении и отпущении грехов чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоих </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена живых)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы мо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">лим Тебя: воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни, Господи, Твою святую, кафолическую </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вселенскую, соборную</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и апостольскую Церковь, существующую от края до края земли, и умиротвори
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> её, ту, что при­обрёл Ты </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        драгоценной Кровью Твоего Христа, и этот святой дом утверди до скончания века.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни, Господи, принёсших Тебе эти дары, и тех, за кого и через кого, и то, ради чего они
                        при­несли их.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни, Господи, принося</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щих поже</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ртвования и делаю­щих доброе для Твоих святых церквей и заботящихся о бедных. Воздай им Твоими
                        неистощимыми небесными дара
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми, дару</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й им вместо земного – небесное, вместо вре</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">менного – вечное, вместо тленного – нетленное.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни, Господи, находящихся в пусты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нях и гора</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х, в пещерах и ущельях земли.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни, Господи, пребывающих в девстве, и благо­честии, и подви
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">жничестве, и в чистой жизни.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни, Господи, всякое начальство и власть, и наших братьев, находящихся в правительстве, и всё
                        воинство: добрых в доброте
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> сохрани, злых добрыми соделай, по благости Твоей.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни, Господи, предстоящих людей и по ува­житель­ным причинам отсутствующих и помилуй их и нас,
                        по множеству Твоей милости. Закрома
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> их наполни всяким добро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м, супругов в мире и единомыс­лии сохрани, младен­цев воспитай, юность наставь, старость
                        поддержи, мало­ду
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        шных утешь, расточённых собери, заблудших обрати и соедини с Твоей святой, кафолической{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вселенской, соборной</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и апостольской Цер­ковью. Обуреваемых ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        хами нечистыми – освободи, плавающих со­про­води, путешествующим сопутствуй, за вдов заступись,
                        сиро
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т защити, пленных избавь, боль­ных исцели.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни, Боже, тех, кто </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">пребывает</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> под судом и на рудни­ка</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х, в ссылках и на горьких работах, и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во всяком угнетении, принужде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нии и в беде, как и всех нужда­ющихся в Твоём великом благо­се
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">рдии: и лю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        бящих нас, и ненавидя­щих, и поручивших нам, недостойным, молиться за них.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И весь Твой народ воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни, Господи Боже наш, и на всех излей Твою неистощимую милость, всем подавая просимое для
                        спасения.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И тех, кого мы не воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнили по неве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дению, или забвению, или из-за множества имён, Сам воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни их, Боже, знающий каждого возраст и имя, знающий каждого от чрева матери его, ведь Ты,
                        Господи, – помощь для беспо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мощных, надежда для отча</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">явшихся, спаситель для те</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">р­пя­щих крушение, для плавающих при</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">стань, для боля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        щих врач. Ты Сам будь для всех всем, ведь Ты знаешь каждого человека – и прошения его, каждый
                        дом – и ну
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">жды его.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Избавь, Господи, и этот град </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> это село </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> эту святую обитель</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, как и все города</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и страны, от голода, эпидемии, землетрясения, наводнения, пожара, меча, нападения иноземцев и
                        междо­усоб­ных войн.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И среди первых воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни, Господи, великого гос­подина и отца на­шего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, святейшего па­триарха Москов­ско­го и всея Ру­си, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и господина на­шего преосвященнейшего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">, мит­ропо­ли­та </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> ар­хи­епи­скопа, епископа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">) (титул)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и да­ру</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й ему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/им</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> слу­жить Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-им</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святой</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-ым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">цер­кви</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-а</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в ми­ре, в чести, невредимым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, здра­вым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, дол­го­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">н­ству­ю­щим</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, пра­виль­но пре­подаю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щим</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> сло­во Твоей Ис­тины;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и всех </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">присутствующих здесь</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> братьев и се­стёр! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(На­род вторит:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и всех братьев и сестёр.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни, Господи, и всех епископов православных, правильно преподаю
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щих слово Твоей Истины.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни, Господи, по Сво­ему многому состраданию, и моё недостоинство, и прости мне все вольные и
                        невольные согрешения, и по моим грехам не воспрепятствуй благодати Твоего Святого Духа сойти на
                        лежащие пред Тобой дары
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мни, Господи, и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">всех</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> пресви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">теров, во Хри­сте дья</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">конов, и весь иной священ­нослу­жа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­щий чин, и не посрами</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> никого из нас, сто­я</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щих вокруг Твоего святого жертвенника.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Посети нас в благости Твоей, Господи, явись нам в Своём неистощимом сострадании: благоприятную и
                        полезную погоду нам дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й, подай тихие дожди земле для плодородия; благослови увенча
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние времён года благос­тью Твоей; положи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> конец разделению церквей, угаси</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вражду язычников </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">народов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, восстания е</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ресей скоро расстрой, силой Твоего Святого Духа;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> всех нас прими в Твоё Царство, соделав сына</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми света и сына</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми дня; </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твой Мир и Твою Любовь дару</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й нам, Господи Боже наш, ибо Ты уже всё свершил ради нас.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И дай нам едиными уста</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ми и единым сердцем про­слав­лять и воспевать вседостойное и прекра­с­ное имя Твоё,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-19">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(5) Приготовление ко причащению</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        И да будут милости великого Бога и Спаси­теля нашего Иисуса Христа со всеми вами!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И со духом твоим.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Просительная Ектения
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед Молитвой Господней)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Всех святых воспомяну</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в, снова и снова в мире Го­спо­ду помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О принесённых и освящённых святых дара</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х Го­споду помолимся,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дабы человеколюбивый Бог наш, приня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в их на Свой свя­той и пре­небесный и умопостига</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">емый жер­твен­ник, словно бла­го­уха</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние духовное, в ответ нис­по­сла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        л нам бо­же­ственную благодать и дар Святого Ду­ха. – Помо­лим­ся!
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Об избавле</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нии нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ния Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Весь день провести свято, мирно и без­греш­но у Го­спо­да испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подай, Господи </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ангела мира – верного наставника, хранителя душ и тел наших – у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Прощения и отпущения наших грехов и согрешений у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Доброго и полезного нашим ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">шам и мира миру у Господа испро­сим.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Остальное время нашей жизни прожить в мире и покаянии у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Безболезненной, не­по­стыд­ной, мирной христианской кончины нашей жизни и доброго ответа пред
                        Христом на Страш­ном Суде испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Единства веры и общения Святого Духа испросив, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х се­бя, и друг друга, и всю жизнь нашу Христу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дадим </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p id="ourfather" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед причащением</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Боже наш, Бог спасающий, научи нас достойно благодарить Тебя за Твои благодея
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ния, которые Ты для нас совершил и совершаешь. Ты, Боже наш, при
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нял эти дары</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, – очисти же нас от всякой скверны пло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ти и духа и научи в страхе Твоём достигать со­верше</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нной святости, дабы, принимая с чистым свидетельством нашей совести часть от святынь Твоих, мы
                        соединились со святым телом и кровью Твоего Христа, и, приня
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        в их достойно, Христа имели живущим в сердцах наших и стали храмом Твоего Святого Духа.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Боже наш, соделай же, чтобы никто из нас не был виновным пред этими Твоими страшными и небесными
                        таинства­ми или не
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мощным душой и телом от недостойного им прича­щения, но дай нам до нашего последнего вздоха
                        достойно принимать часть от святынь Твоих для достижения Жиз­ни вечной и благоприя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тного ответа на Стра­шном Суде пред Твоим Христом, дабы и мы, со всеми святыми, во все века
                        творившими угодное Тебе, стали причаст
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">никами Твоих вечных благ, которые Ты угото</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вал лю</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бящим Тебя, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И удостой нас, Владыка, со дерзновением не­осуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нно сметь именовать Тебя, Небесного Бо­га, Отцом и говорить{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> воспевать</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">: </span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П и Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Отец наш Небесный!
                                <br />
                                да святи
                            </span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
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
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                наши,
                                <br />
                                как и мы простили должникам нашим,
                                <br />и не введи нас во искушение,
                                <br />
                                но избавь нас от лукавого <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. от зла или от злого – дьявола)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Твои царствие, и сила, и слава, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2">
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                <br />
                                ныне и всегда и во веки веков{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Мф 6:9-13)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                    </>
                )}

                {lang === 'ЦСЯ' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-11">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П и Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Отче наш,
                                <br />
                                Иже еси на небесех, да святится имя Твое,
                                <br />
                                да приидет Царствие Твое,
                                <br />
                                да будет воля Твоя,
                                <br />
                                яко на небеси и на земли.
                                <br />
                                Хлеб наш насущный даждь нам днесь;
                                <br />
                                и остави нам долги наша,
                                <br />
                                как и мы простили должникам нашим,
                                <br />
                                и не введи нас во искушение,
                                <br />
                                но избавь нас от лукавого <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. от зла или от злого – дьявола)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, –</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Твои царствие, и сила, и слава, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2">
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                <br />
                                ныне и всегда и во веки веков{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Мф 6:9-13)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">` </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">наши пред Господом прекло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ним!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пред Тобой, Господи.</span>
                </p>
                <p id="glavopriklon" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва главопреклонная</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О Владыка Господь, Отец сострадания и Бог всякого утеше</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ния, склони</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вших пред Тобой свои главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> благослови, освяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, сохрани, укрепи, утвер­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , от всякого злого дела отврати и со всяким добрым делом сочетай, и удостой их не­осуж­де
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нно причаститься этим </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Твоим непорочным и жи­во­творящим таинствам для прощения грехов и общения Святого Духа, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        по милости, и состраданию, и человеколюбию еди­нород­ного Сына Твоего, с Которым Ты благословен,
                        вместе со всесвя­ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и живо­тво­ря</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щим Твоим Ду­хом, ны­не и все­гда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед возношением св. хлеба)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вне</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мли, Господи Иисусе Христе, Боже наш, из свя­той обители Своей
                    </span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В тексте Служебника далее вставка: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и со славного пре­стола царствия Твоего.</span>
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и при­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, дабы освя­ти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ть нас, – Ты, со Отцом на Не­бе­сах восседающий и с нами невидимо здесь при­су­т­ствую­щий, – и
                        бла­го­воли
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоей сильной рукою пре­пода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ть нам часть от Твоего непорочного тела и драгоценной крови, и через нас – всему народу{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[П и Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, будь милостив ко мне, грешному! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Трижды.)]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вознося св. хлеб:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Святыня – святы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Один Святой, один Господь – Иисус Христос, во сла­ву Бога-Отца, аминь.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Раздроби, владыка, святой хлеб!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Раздробляется и раздаётся Агнец Божий, <br /> раз­дро­б­ля­емый и не разделяемый, <br />
                        всегда вкушаемый и ни­когда не оскудева
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ющий, <br /> но причаща
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющихся освя­ща</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющий.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дополни, владыка, святой поти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">р!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Влагая частицу ИС в св. потир </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (т. е. как бы воссо­единяя с Духом Жизни Тело и Кровь Хри­стовы)
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Полнота </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">об­щения</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Духа Святого.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь. Благослови, владыка, теплоту!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословенна </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">живая</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        теплота святынь Тво­их, ныне и все­гда и во веки веков, аминь.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вливая в св. потир теплоту:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Теплота веры, наполненная Духом Святым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. Духом Жизни)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Дробится частица ХС для причащения в алтаре</span>
                    <Tooltip>
                        <>
                            <p className="footnoteRed">
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                    {' '}
                                    Далее по обычаю предстоятель просит у всех прощения и тихо молится:
                                </span>
                            </p>
                            <p className="footnoteBlack">
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П </span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    Отпусти, оставь, прости, Боже, вольные и невольные согре­ше­ния наши, соделанные
                                    словом и делом, в ве
                                </span>
                                <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дении и неве</span>
                                <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дении, днём и в ночи</span>
                                <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    , во уме и помышлении, – всё нам прости, по Своей благости и человеколюбию!
                                </span>
                            </p>
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-20">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="prichashenie" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(6) Св. причащение</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед св. дарами</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Молимся всею церковью!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П [и Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Верую, Господи, и ис­по­ве­дую, что Ты – по­истине Христос, Сын Бога жи­во­го, пришедший в мир
                        гр
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ешников спасти, первый из ко­то­рых – я. Ещё верую, что вот это – непорочное те­ло Твоё, а вот
                        это – драгоценная кровь Твоя.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст-абз">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Молю же Тебя: помилуй меня и прости мне вольные и невольные со­греше­ния мои, соде­ланные словом
                        или делом, в ве
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дении или неве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­дении, и удостой меня не­осуж­де</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        н­но причас­титься Твоим непорочным таин­ствам для про­щения гре­хов и Жизни вечной, аминь.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">пезы та</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        инственной Твоей, о Сын Божий, ме­ня при­­част­ни­ком и ныне прими
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, ибо я врагам</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоим </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        тайны не выдам и не дам Тебе того же целования, что Иу­да, но, словно разбойник, ис­пове
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        дую Те­бя: вспо­м­ни обо м­не, Го­споди, во цар­ствии ­Своём!{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Прича­щение Твоим святым таинствам, Го­спо­ди, да будет мне не в суд или во осужде
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние, но для ис­целения ду­ши и тела!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-21">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Причащение в алтаре</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н Причастный стих</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> То есть прича</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">стен (кино</span>
                            <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                ник) дня или святого – см. в приложениях. Поётся во время прича­ще­ния в алтаре (а
                                иногда и в храме).
                            </span>
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дьякон, приступи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        Вот, я приступаю к бессмертному Царю и Богу нашему.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Преподай мне, владыка, драгоценное и святое тело Го­спо­да и Бога и Спасителя нашего Иисуса
                        Христа!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Священнодьякону </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        преподаётся драгоценное, и свя­тое, и непорочное тело Господа и Бога и Спаси­теля нашего Иисуса
                        Христа для про­ще­ния грехов его и Жизни вечной.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Причащаясь сам:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        Вот, я приступаю к бессмертному Царю и Богу нашему.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Драгоценное и всесвятое тело Го­спо­да и Бога и Спа­сителя нашего Иисуса Христа пре­по­даётся
                        мне, пре­свитеру{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">для прощения грехов мо­их и Жизни вечной. </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Драгоценная и святая кровь Господа и Бога и Спаси­теля нашего Иисуса Христа преподаётся мне,
                        пре­сви­теру{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">для прощения грехов мо­их и Жизни вечной.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Целуя чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вот, это коснулось уст моих, и удали</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т беззакония мои, и от моих грехов меня очи­стит </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Ис 6:7)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дьякон, приступи!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Вот, я приступаю к бессмертному Царю и Богу нашему. Преподай мне, владыка, драгоценную и свя­тую
                        кровь Господа и Бога и Спасителя нашего Иису­са Христа!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Служителю Божьему дьякону </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        преподаётся драгоценная и святая кро­вь Го­спода и Бога и Спаси­теля нашего Иисуса Хри­ста для
                        про­ще­ния гре­хов его и Жизни вечной.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Дьякону после причащения:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вот, это коснулось уст тво­их, и удали</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т беззакония твои, и от твоих грехов те­бя очистит.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Дробится св. агнец (частицы НИ и КА) и гото­вится св. чаша для народа.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Причащение народа в храме</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В царских вратах народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Со страхом Божьим, и верою, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и любовью</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> при­сту­пи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Медленно:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословен Грядущий во имя Господне; <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Бог – Го­сподь, и воссиял Он нам! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 117:26-27)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Причащая:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Чаду </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабу</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Божьему </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        преподаётся дра­гоцен­ное и свя­то­е тело и кровь Господа и Бо­га и Спа­сителя нашего Иисуса
                        Христа для про­щения грехов его и Жизни вечной.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> При этом медленно поётся причастный стих:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тело Христово прими</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те, от источника бессмер­тия вку­си­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">После причащения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Увидев Воскресение Христа, покло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нимся свя­то­му Го­споду Иисусу, одному безгрешному! Кре­сту Твоему поклоняемся, Христе, и
                        святое Вос­кре­сение Твоё по­ём и славим; Ты – Бог наш, кро­ме Тебя иного не зна­ем и имя Твоё
                        призы­ва­ем. При­ди
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те, все вер­ные, по­кло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нимся святому Христову Воскресе­нию, ибо при­шла через Крест радость все­му миру! Всегда
                        благо­слов­ляя Госпо­да, воспеваем Вос­кре­сение Его: Он, ради нас распятие претерпев, Смер­тию
                        смерть победил!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Светись же, светись, новый Иерусалим, ибо Сла­ва Го­сподня над тобою взошла; ныне тор­жествуй и
                        весе­лись, Сион; а ты, чистая Богоро­дица, радуйся Воскре­сению Рождённого тобой.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О Христос – Пасха великая и святейшая, Пре­муд­рость, Божье Слово и Сила! Дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й нам полнее </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> совершеннее</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> к Тебе приобщаться в невечер­ний день Царства Твоего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Отирая оставшиеся частицы с дискоса в чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Своей непорочной Кро­вью отмой от грехов, Го­с­поди, всех воспомина
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в­ших­ся здесь, по хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тай­ству святых Твоих!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-22">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(7) Благодарение после причащения</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя народ, в заключение: </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Спаси, Бо­же, народ Твой <br /> и благослови наследие Твоё!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 27:9.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мы узре</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ли Свет истинный, <br /> при
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        няли Духа Небесно­го, <br />
                        обрели мы веру истинную, <br /> поклоняясь неразде­ль­ной Троице, <br /> ибо Она спасла нас.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Кадя св. чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Превыше небес, Боже, восстань, <br /> распростри
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> над зе­м­лёй Славу Твою </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 56:6)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> –</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Относя св. чашу на жертвенник:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Благословен Бог наш –</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да наполнятся уста наши</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> хвалою Тебе, Госпо­ди,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дабы нам воспевать славу Твою,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты удостоил нас сопричастия</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Твоим святым, бо­же­ст­венным, бес­смер­т­ным и животворящим та­инст­вам.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Сохрани нас в Твоём освящении</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> раз­мыш­ля­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющими весь день о прав­де Твоей.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аллилуия, аллилуия, аллилуия.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Станем благогове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        йно! Причастившись божест­вен­ным, святым, непорочным, бессмертным, не­бесным и жи­во­тво­рящим,
                        страшным Христовым таинствам, до­стойно воз­благодари
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м Господа!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Весь день провести свято, мирно и без­греш­но ис­про­си</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х себя, и друг друга, и всю жизнь нашу Хри­сту </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дади</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва благодарственная
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(после причащения всех)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Благодарим Тебя, Господи Боже наш, за причащение Твоим святым, непорочным, бессмертным и
                        небесным таинствам, которые Ты нам дарова
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л для бла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        га, и освящения, и исцеления душ и тел наших, – Ты же, Владыка всего, дай нам, чтобы приобщение
                        свя­тому телу и крови Твоего Христа вело к вере непостыдной и любви непритворной, к приумноже
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нию премудрости и исцелению души и тела, к отогнанию всякого противника и соблюдению Твоих за
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        поведей, ко благоприятному ответу на Страшном Суде пред Твоим Христом, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Совершая Евангелием образ Креста над анти­­-мин­сом:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты освящение наше и мы воссы­лаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">От­цу и Сыну и Святому Духу,]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Древний отпуст:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пойдём в мире!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> С именем Господним.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> При выходе из храма:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва заамвонная</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">благословля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющих Тебя благословля</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ющий и полагающихся на Тебя освящающий! Спаси народ Твой и благослови наследие Твоё, Цер­ковь
                        Твою в полноте со­хра­ни, освяти любя­щих красоту
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        дома Твоего; Ты в ответ прославь их Твоей божественной силой и не ос­тавь нас, на­деющихся на
                        Тебя; д
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">а</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">р</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">у</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й мир миру Твоему, церква</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м Твоим, свя­щен­ству, нашим правителям, и все­му народу Твоему, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо всякое даяние доброе и всякий дар совер­шенный нисходит свыше – от Тебя, Отца све­тов{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> светил</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и мы вос­сы­ла­ем славу, и благодарение, и поклонение Тебе,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сы­ну и Свя­тому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-23">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(8) Заключительные молитвы</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва «в сосудохранилище» <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">
                        (перед снятием священных одежд и на потребление <br />
                        св. даров или перед агапической трапезой)
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Исполнились и совершились, насколько в наших силах, Христе Боже наш, таин­ства Твоего замысла{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> промысла</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        : мы воспоминали Смерть Твою, видели образ Твоего Вос­кресения, преисполнились{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Твоей бесконечной Жизни, вкусили Твоего неистощимого наслаждения, которого и в будущем веке нам
                        всем удостоиться благоволи, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        по милости безначального Отца Твоего и святого и благого и животворящего Твоего Духа, ныне и
                        всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Да будет имя Господне благословенно – отныне и до века!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Трижды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-24">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Далее бывает раздача хлеба – антидора и про­сфор.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-24">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н Пс 33</span>
                    <Tooltip>См. кн. 2, с. 86.</Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        (может петься и в начале трапезы любви, т.&nbsp;е. агапы).
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-24">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Бла­го­словляя народ на уход, возможно после об­щей трапезы:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословение Го­сподне на вас, по Его милости и человеколюбию, ны­не и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Слава Тебе, Христе Боже, Надежда наша, слава Те­бе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. Бла­го­слови! </span>
                </p>
                <p id="otpust" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Отпуст</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">По обычаю – с крестом в руках:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Христос, истинный Бог наш, по хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тайству всенепорочной Своей Ма­тери, свя­тых слав­ных и все­хваль­ных апосто­лов, во святых
                        от­ца нашего Василия, архи­епи­скопа Кеса
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">рии Каппадоки</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й­ской, святых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(храма и дня)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и всех свя­тых, да помилует и спасёт нас, по Сво­ей бла­гости и человеколюбию!
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [В воскресенье:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воскресший из мёртвых Христос, истинный Бог наш…</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Праздничные отпусты – см. в приложениях.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Многолетие </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(при закрытии завесы)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Великого го­спо­дина и отца нашего…</span>
                    <Tooltip>См. кн. 2, с. 88.</Tooltip>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[И ещё:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи, твердыня на Тебя надеющихся, утверди Церковь, которую Ты приобрёл Своею бесценной
                        Кровию!
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Священник в алтаре читает благодарственные молитвы</span>
                    <Tooltip> Там же, с. 207–211.</Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">После </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Отец наш Небесный:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        отпустительный Тропарь <br />
                        св. василия великого,{' '}
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">глас 1</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Разнёсся голос твой по всей земле, приня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        вшей слово твоё, которым ты о Боге достойно учил, природу сущего прояснил и нравы людей
                        ис­пра­вил. О&nbsp;царственное священство, отче преподобный, моли Христа Бога о спасении душ
                        наших!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава. </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Кондак его же, </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">глас 4</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ты стал непоколеби</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мым основанием церкви, всех людей неотъе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        млемым достоинством наделив и утвердив его учением своим, о праведный Василий, таинства Небес
                        открывший.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> И ныне.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Богородичен, </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">глас 6</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>О Заступница
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> христиан безукори</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">зненная, Хо­да</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ­та­ица пред Творцом неизменная, не отвергни молитвенных гла
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        сов грешников, но поспе­ши, Бла­гая, на помощь нам, с верою взывающим к те­бе: не замедли с
                        засту
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">пничеством и будь усе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        рдна в молитве, Бого­ро­дица, все­гда защищающая чтущих тебя!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Или ещё тропарь дня.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господи, помилуй</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (трижды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Че</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ CharOverride-5">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ствуемую превыше херувимов…</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <Tooltip>См. кн. 2, с. 211.</Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне. Отпуст </span>
                    <Tooltip>См. выше, с. 52.</Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
            </div>
        </div>
    );
};

export default Vasiliy;
