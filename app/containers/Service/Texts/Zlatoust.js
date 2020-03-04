import React from 'react';
import './Vasiliy';
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

const Zlatoust = ({ lang, textRef }) => {
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
                <p className="_-ОСНОВНОЙ_Имя-Службы ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">
                        I. <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor001" />
                        Литургия оглашаемых
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Приуготовление</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Открыв завесу и кадя престол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        В гробнице — телом <br /> и в аду — душой как Бог, <br />в раю — с раз­бой­ником <br /> и на
                        престоле — со Отцом и Духом <br />
                        Ты пребывал, Христе, <br /> всё напол­няя, необъя´тный.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Полное каждение с чтением Пс </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">50</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (см. </span>с.&nbsp;<a>96</a>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">О Царь Небесный</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О Царь Небесный, Хода́тай </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Уте́шитель</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Дух Истины, о Ты, везде пребывающий и всё наполняющий, Со­кро­вищ­ница благ и жизни Податель,
                        при­ди` и вселись в
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нас, и очи­сти нас от вся­кой скверны, и спа­си, Бла­го́й, ду­ши наши.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Слава в вышних Богу, <br /> и на земле мир избранникам Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Дважды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи! отве́рзни уста мои, <br /> и речь моя возвести`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т хва­лу Тебе.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Время Господу действовать. Владыка, благослови!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен Бог наш </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Помолись обо мне, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да направит Господь стопы` твои.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо́мни меня, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит тебя Господь Бог во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ПЕТИТ_Петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословенно Царство Отца и Сына и Святого Ду­ха ныне и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О мире всего мира, об укреплении святых Бо­жьих цер­кве́й и единении всех{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">их</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">] </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господу помо­лим­ся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Об этом святом доме и обо всех, с верою, бла­го­го­-
                        <br />
                        ­в
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">е́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ни­ем и стра­хом Божьим вход</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я´</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щих в него, Го­с­поду по­мо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">великом господине и отце нашем святейшем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> патриархе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и о </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">господине нашем пре­освя­ще́н­нейшем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> митрополите</span>
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О нашей богохранимой стране </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Русской</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и обо всём на­ро­де и властя´х её Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об этом граде </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> об этом селе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя), или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">об этой святой обите­ли</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и обо всех городах и стра­нах и верою жи­ву­щих в них Господу помолимся.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О благоприятной погоде, об изобилии плодо́в зем­ли и мирных вре­мена́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О плавающих, путеше́ствующих, болящих, стра­ж­ду­щих, пленённых,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">за правду го­ни`мых и заключённых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и спа­се­нии их Го­споду помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об избавле́нии нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­де́ния Господу помолимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Бо­же, Тво­ею бла­годатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Всесвяту`ю, непоро́чную, преблагослове́н­ную, славную нашу Вла­дычицу Богородицу и Веч­ноде́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ву Ма­рию со всеми святыми помяну`в, са­ми`х се­бя, и друг друга, и всю нашу жизнь Хри­сту{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или более древнее:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­да­ди`м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти`м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Антифоны изобразительные </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-031-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-031"
                            >
                                {' '}
                                *
                            </a>
                        </span>
                    </span>
                </p>
                <p id="antifon1" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва перед пением <br />
                        первого антифона
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи Боже наш, Ты, Чья власть несравне́нна и слава непостижи`ма, Чья милость безмерна и чело
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        веколюбие несказа́нно, — Ты, Владыка, по Своему благосердию воз­зри на нас и на этот святой дом и
                        яви` Твою неистощимую милость и сострадание Твоё нам и моля´щимся с нами. —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ибо Тебе́ подобает вся слава, честь и поклонение, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Первый антифон
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">Пс 10</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">2</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
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
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor002" />
                        малая ектения
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Тво­ею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Всесвяту`ю, непоро́чную, преблагослове́нную, слав­ную нашу Вла­ды­чицу Богородицу и Вечноде́ву
                        Ма­рию со все­ми свя­тыми помяну`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в, са­ми`х се­бя, и друг друга, и всю нашу жизнь Христу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­да­ди`м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">по­святи`м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> Н</span>
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи Боже наш, спаси народ Твой и благо­слови на­следие Твоё, Церковь Твою в полноте сохрани,
                        освяти лю­бя­щих красоту` дома Твоего! Ты в ответ прославь их Твоей бо­же­ственною си­лой и нас,
                        на­дею­щих­ся на Тебя, не оставь, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Твоя´ власть и Твои` царствие, и сила, и слава, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Второй антифон
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">Пс 14</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">5</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-7">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Хвали Господа, душа моя!</span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-7">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Восхвалю` Господа, доко́ле живу;
                                <br /> буду петь пред Богом моим,
                                <br /> поку`да есмь.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Не надейтеся на вельмож,
                                <br /> на Адамова сына — в нём спасения нет:
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                выйдет дух его, он вернётся в землю свою,
                                <br /> в тот день погибнут все замыслы его.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Бла́го тому, кому в помощь Иакова Бог,
                                <br /> чья надежда — на Господа, на Бога своего,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                на Того, Чьё творение — небеса и земля,
                                <br /> и море, и всё, что в них,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Кто хранит верность вовек,
                                <br /> для утесняемых вершит суд,
                                <br /> а́лчущим подаёт хлеб; <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господь выводит узников на свет,
                                <br /> Господь отверзает очи слепцам,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Господь выпрямляет тех, кто согбе́н,
                                <br /> Господь праведным благоволи`т,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Господь пришельцев хранит,
                                <br /> помогает сироте́ и вдове,
                                <br /> но искриви`т неправедных путь.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Царствует Господь вовек,
                                <br /> Бог твой, о Сион, — в род и род.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне.</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                <a id="_idTextAnchor003" />
                                Единородный Сын и Сло­во Бо­га,
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Ты, бессмертный, ради нашего спасения добровольно во­плоти`вшийся
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> от святой Бого­ро­дицы и Вечно­де́вы Ма­рии,</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> неизменно воче­ло­ве́чившийся</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                и рас­пя´­тый, Хри­сте Боже, Смер­тию смерть попра́в­ший,
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> один из Свя­той Тро­ицы,</span>
                            <span className="_--КРАСНЫЙ">//</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                прославляемый вместе с От­цом и Свя­тым Ду­хом, — спаси нас!
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
                        <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне.</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                <a id="_idTextAnchor003" />
                                Единородный Сыне и Слове Божий, Безсмертен Сый
                            </span>
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
                            <span className="_--КРАСНЫЙ">//</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> спрославляемый Отцу и Святому Духу, спаси нас.</span>
                        </p>
                    </>
                )}
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [И далее Малая ектения, </span>см. с.{' '}
                    <a href="03_ЛитЗлат_РУС_ЛИЗ.html#_idTextAnchor002">34</a>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.]</span>
                </p>
                <p id="antifon3" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва перед пением
                        <br />
                        третьего антифона
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ты эти общие и согласные молитвы нам даро­ва́л, Ты и двоим или троим, согласно собравшимся во имя
                        Твоё, просимое подавать обещал, — Ты же и ныне исполни на пользу прошения слуг Твоих: подай нам
                        в нынешнем веке познание Твоей Истины, а в будущем Жизнь вечную дару`й, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо Ты` благой и человеколюбивый Бог и мы` вос­сылаем славу Те­бе,
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Свя­тому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Третий антифон
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">Мф 5:3-1</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">2</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-030-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-030"
                            >
                                {' '}
                                **
                            </a>
                        </span>
                    </span>
                </p>
                {lang === 'default' && (
                    <>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Во царствии Своём вспомни о нас, Господи,
                                <br /> когда Ты при­дёшь царствовать!
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">На </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны нищие духом,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                ибо их есть Царство Небесное.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Блаженны скорбящие,
                                <br /> ибо будут они уте́шены.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">На </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">0</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны кроткие,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                ибо они примут в удел землю.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Блаженны а́лчущие и жаждущие правды,
                                <br /> ибо будут они насыщены.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 8</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Блаженны милосердные,
                                <br /> ибо будут они помилованы.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Блаженны те, чьи сердца́ чисты`,
                                <br /> ибо увидят они Бога.{' '}
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 6</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны миротворцы,
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                ибо наречены` они будут сынами Божьими.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Блаженны гонимые за правду,
                                <br /> ибо их есть Царство Небесное.
                            </span>
                        </p>
                        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 4</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Блаженны вы, когда станут вас
                                <br /> бесчестить и гнать <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                и лживо скажут про вас всякое <br />
                                худое слово — из-за Меня.
                                <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Радуйтесь и веселитесь, <br /> ибо велика́ награда ваша на Небесах!
                            </span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> И ныне.]</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-РаздСл ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-3">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Антифоны вседневные</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Первый антифон </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">Пс 91:2-3, 16</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Сладко Господа благодарить!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> По хода́тайству Богородицы, о Спаситель, спаси нас!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Припев на каждый стих.)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Сладко Господа благодарить,
                        <br /> имени Твоему, о Вышний, бряца́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ть,</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        возвещать поутру` милость Твою,
                        <br /> и верность Твою — в ночи`.
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Прав Господь, Бог наш,
                        <br /> и неправды нет у Него.
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> И ныне.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Второй антифон </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">Пс 92:1, 5</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господь&nbsp;— Царь. Его оде</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я´</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние&nbsp;— слава.</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> По хода́тайству святых Твоих, о Спаситель, спаси нас!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Припев на каждый стих.)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господь&nbsp;— Царь. Его оде</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я´</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ние&nbsp;— слава,
                        <br /> пояс Его облачения&nbsp;— мощь!{' '}
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Сто</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т мир&nbsp;— и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> не дрогнет.</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-2">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Откровения Твои несомненно верны`.</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-б-отст ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Храм Твой, Господи, навеки укр</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">а́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">сила святость!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> Слава, и ныне.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Единородный Сын… </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(см. с. </span>
                    <a href="03_ЛитЗлат_РУС_ЛИЗ.html#_idTextAnchor003">
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">35</span>
                    </a>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Третий антифон </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">Пс 94:1-</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">5</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Приди`те пред Господом ликовать,
                        <br /> Твердыне спасения нашего возгласи`м,
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Дивный во святых Сын Божий, спаси нас, поющих Тебе: <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> аллилуия! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Припев на каждый стих.)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        благодарно станем пред Ним,
                        <br /> при звуке струн возопии`м Ему!
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ибо Господь — великий Бог,</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> над всеми богами великий Царь;</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в руке Его — бездны земли`,</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и высо́ты гор — во власти Его;</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и море Он сотворил,</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и сушу извая´ли руки Его.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="malyVhod" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">3</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Малый вход с Евангелием</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед входом</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Владыка, Господи Боже наш, Ты установил на Небесах чины` и воинства ангелов и архангелов для
                        служения Твоей Славе, — соделай же, чтобы с нашим входом вошли святые ангелы, вместе с нами
                        служа́ и прославляя Твою благость, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Тебе́ подобает вся слава, честь и поклонение, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всег­да и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, святой вход!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
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
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Все продвигаются вперёд.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Показывая народу Евангелие:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Ста­нем благоговейно!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Праздничные входные стихи — см.: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн. 2. Изд. 3-е, испр. и доп. М. : </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">СФИ</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2015</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. С. </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">23</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">9–2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">63</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Входная песнь </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">литургии оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Придите, покло́нимся и припадём ко Христу!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вос­крес­ший из мёртвых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или в праздники:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">По хо­да́­тай­ству Бого­ро­дицы</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">и т. д., или по будням: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Дивный во святых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Сын Божий, спа­си нас, поющих Те­бе:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> аллилуия!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Далее следуют тропари и кондаки праздника и храма.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p id="trisvatoe" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва перед пением <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Трисвятой песни
                        <span id="footnote-029-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-029"
                            >
                                {' '}
                                ***
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Боже святой и во святыне пребывающий, Тебя Три­святой песнью серафимы воспевают и херувимы
                        славословят, Тебе все небесные силы поклоняются! Ты` из небытия´ в бытие́ всё привёл, Ты сотворил
                        человека по Своему образу и подобию и всеми Твоими да­ра́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ми его наделил; Ты и просящему подаёшь премудрость и разум, и согрешающего не презираешь, ибо
                        установи`л ему ко спасению покаяние. Ты{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        удостоил нас, убогих и недостойных слуг Твоих, и в этот час стать пред лицом славы Твоего
                        святого жертвенника и должное поклонение и славословие Тебе приносить, — Ты` же, Владыка, прими`
                        и от уст нас, грешных, Трисвяту`ю песнь и посети нас Своей благостью; прости нам все вольные и
                        невольные согрешения, освяти` наши души и тела и дай нам праведно служить Тебе во все дни жизни
                        на­шей, по хода́­тайству святой Богородицы и всех святых, во все века творивших угодное Тебе, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты`, Боже наш, свят и мы` воссылаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-4"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-4">Тихо:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, пение Трисвято́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">го!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
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
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Трисвятое</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-5">
                        <span id="footnote-028-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-028"
                            >
                                {' '}
                                ****
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Свято́й Боже, свято́й Крепкий, свято́й Бессмерт­ный, помилуй нас{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне. </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Свято́й Бессмертный, помилуй нас. Свято́й Боже, свято́й Крепкий, свято́й Бес­смерт­ный, помилуй нас.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Чтения и прошения верных</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-13">
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
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Дан </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">3:5</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">4-</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">55</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вне́млем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н]</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Проки`мен, глас… </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Текст прокимнов воскресных по гласам, а также буд­ничных и праздничных — см.:{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн. 2. С. </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">22</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1–2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">63</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ CharOverride-3">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Из Соборного по­сла­ния Иакова </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Петра</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">чтение</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">; или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> Из Послания к римлянам </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> к коринфянам</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">, или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> к галатам</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">святого</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> апо­сто­ла Павла чтение</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ CharOverride-3">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны!</span>
                </p>
                <p id="apostol" className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Чтение Апостола</span>
                </p>
                {apostol}
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">читавшем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">у</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ CharOverride-6">Проповедь</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p id="gospel" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва <br />
                        перед чтением Евангелия
                        <span id="footnote-027-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-027"
                            >
                                {' '}
                                *****
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Возжги` в наших сердцах, человеколюби`вый Владыка, Твоего богопознания чистый свет и наши
                        духовные очи открой для уразумения{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        евангельской проповеди! Вложи` в нас и страх пред Твоими благи`ми за́поведями, дабы, одолев{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">все</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        устремления плотски`е, мы проводили жизнь духовную, всегда мысля и совершая благоуго́дное Тебе, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ведь Ты` просвещение душ и тел наших, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Хри­сте</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, и мы` воссылаем славу Те­бе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">вме­сте с Твоим безначальным Отцом и все­свят</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">ы́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и благ</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и животвор</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">я´</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">­щим Ду­хом Твоим,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во ве­ки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благослови меня, владыка, — благовестителя святого апос­тола и евангелиста{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Бог, по хода́тайству святого славного и все­хва́ль­ного апо­сто­ла и евангелиста{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        да даст тебе, бла­го­веству`ю­щему, слово со многой силою для совершения бла­го­ве­стия Своего
                        возлюб­ленного Сына, Господа нашего Иису­са Христа!
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Принимая Евангелие от пресвитера:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вынося Евангелие из алтаря:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аллилуия, аллилуия, аллилуия, глас…</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Народ припевает </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аллилуия</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> трижды — здесь и после каждого стиха. </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Воскресные стихи по гласам, а также будничные и праздничные — см.:{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн. 2. С. </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">23</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">9–2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">63</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Во время чтения и пения аллилуария — каждение Евангелия, как Слова Божьего.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Стоя на амвоне лицом к народу или в центре храма лицом на восток:{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Премудрость! Станем благоговейно! Услышим свя­тое евангелие!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> От </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя) </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">святого благовестия чтение.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Слава Тебе, Господи, слава Тебе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны! </span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Чтение Евангелия</span>
                </p>
                {gospel}
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир тебе, благовеству`ющему!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Слава Тебе, Господи, слава Тебе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-6">Проповедь</span>
                </p>
                <p id="sugubaja" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-14">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Сугубая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Возгласим все, от всей души и от всего нашего разу­мения возгласим:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господь Вседержитель, Бог отцов наших, молим Тебя: услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Помилуй нас, Боже, по великой милости Твоей, молим Тебя: услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">великом господине и отце на­шем святейшем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> па­три­архе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и о </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">господине нашем преосвяще́ннейшем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> митрополите </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">ар­хи­епи­скопе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">, или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">епископе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и обо всех </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">предстоящих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> во Хри­сте бра­тьях наших.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о нашей богохранимой стране </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Русской</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7"> и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        обо всём народе и властях её, дабы про­-
                        <br />
                        водить нам спокойную и тихую жизнь во всём бла­го­честиво и до­стойно.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы молимся о наших братьях священниках, священ­но­и`ноках, и обо всём во Христе братстве
                        нашем.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы молимся о блаженных и всегда помина­емых свя­тей­ших православных патриархах, и
                        со­зда­те­лях святого дома сего{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[если в обители:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> свя­той обители сей</span>
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы молимся о милости, жизни, мире, здра­вии, спа­се­нии, посещении, прощении и отпуще́
                    </span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        ]
                        <span id="footnote-026-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-026"
                            >
                                {' '}
                                ******
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о принося´</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        щих поже́ртвования и де­ла­ющих доброе для этого святого и вседостойного хра­ма, о в нём
                        трудя´щихся, пою­щих и пред­сто­я­щих лю`дях, ожидающих от Тебя великой и неисто­щи­мой милости.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва при усердном <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">сугубом</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> молении</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи Боже наш, прими это усердное моление от служителей Твоих, и по мно­жеству Твоей милости
                        помилуй нас, и яви` Твоё сострадание к нам и ко всему народу Твоему, ожидающему от Тебя
                        неис­тощи`мой милости, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо Ты` ми`лостивый и человеколюби`вый Бог и мы` воссылаем славу Тебе,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ CharOverride-3">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">СУГУБАя Заупокойная ектения</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-025-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-025"
                            >
                                {' '}
                                *******
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Помилуй нас, Боже, по великой милости Твоей, молим Тебя: услышь и помилуй!
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(трижды на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся об упокое́нии душ усопших чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Божьих </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имена)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и о прощении им всякого согреше­ния, воль­ного и невольного,
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        дабы Господь Бог всели`л души их там, где праведные об­ретают покой.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Милости Божьей, Царства Небесного и прощения грехов их у Христа, бессмертного Царя и Бога
                        нашего, испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подай, Господи.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва об усопших</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Боже ду`хов и всякой пло́ти, Ты смерть попра́л, и дьявола низ­ложи`л, и Жизнь миру Твоему дарова́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л, — Ты же, Го­споди, упокой души усопших чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> (имена) </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        в месте светлом, в месте отрадном, в месте покойном, откуда уда­ле­ны` страдание, скорбь и
                        стена́ние. Всякое согрешение, соделанное ими словом, или делом, или в мыслях, как благой и
                        человеколюби`вый Бог прости`, ибо нет человека, который жил бы и не согрешил, ведь один только
                        Ты без греха, праведность Твоя — праведность вечная, и Твоё слово — истина! —
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ибо Ты` воскресение, и жизнь, и покой усопших чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> (имена)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Христе Боже наш, и мы` вос­сы­лаем славу Тебе, вместе с Твоим безначальным Отцом и всесвяты`м и
                        благи`м и животворя´щим Ду­хом Твоим, ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="oglashaemie" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">5</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Отпуст оглашаемых <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-6">(если есть)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Оглашаемые, помолитесь Господу!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Огл</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ектения об оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Верные, помолимся об оглашаемых, дабы Го­сподь помиловал их,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> огласил их словом Истины,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> открыл им Евангелие правды,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> соединил их со Своей святой, ка­фо­ли­ческой </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вселенской, соборной</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и апостольской Цер­ко­вью.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Спаси, помилуй, поддержи и сохрани их, Боже, Тво­ею благодатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Оглашаемые, пред Господом ваши главы` пре­­кло­ни`те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Преклоняя головы:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Огл </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Пред Тобой, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва об оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи Боже наш, в вышних обитающий и на до́ль­нее взирающий, ради спасения рода че­ловеческого
                        пославший Твоего единородного Сына и Бога, Гос­пода нашего Иисуса Христа, — воззри на рабов
                        Тво­их огла­ша­емых, склони`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в­ших пред То­бою свои гла­вы` </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[имена]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и удостой их во время благоприя´тное ку­пели воз­рож­дения, про­щения грехов и одежды
                        нетления, соедини их с Твоей святой, ка­фо­ли­ческой{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вселенской</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> со­борной</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и апос­толь­ской Цер­ковью и со­при­чи`сли их к Твоему и`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        збранному <br />
                        ста­ду,&nbsp;—
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        дабы и они` с нами славили вседостойное и пре­кра­с­ное имя Твоё,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Все оглашаемые, изыди`те! Оглашаемые, изы­ди`те! Все оглашаемые, изыди`те!
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-024-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-024"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пусть не останется никого из оглашаемых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и просве­щае­мых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-023-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-023"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        [Все непричащающиеся с благоговением покидают цер­ковь.]
                    </span>
                </p>
                <p id="vernie" className="_-ОСНОВНОЙ_Имя-Службы ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">
                        II. <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor004" />
                        Литургия верных
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Приуготовление</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-13">
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
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва первая
                        <span id="footnote-022-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-022"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благодарим Тебя, Господи, Бог </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">небесных</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        сил, ибо Ты удостоил нас и ныне предстать пред Твоим святым жертвенником и воззвать к Твоему
                        состраданию, прося прощения за грехи наши и совершённые по неведению Твоим народом: прими, Боже,
                        нашу молитву, соделай нас достойными приносить Тебе молитвы, моления и жертвы бескровные за весь
                        народ Твой и укрепи нас, ко­то­рых Ты поставил на это служение Тебе, чтобы в силе{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Свя­того Ду­ха Тво­его неосужденно и непреткновенно, со сви­де­тель­ством чи­стой совести нашей,
                        во всякое время и на всяком месте призы­вать Те­бя, дабы Ты, внимая нам, был милостив к нам по
                        Твоей великой бла­гости. —{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Громко:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ибо Тебе́ подобает вся слава, честь и поклонение</span>
                    <span className="_-СПЕЦСЛУЖЕБНЫЕ_дляРЕД_вЧЕРНОМтексте CharOverride-7">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во ве­ки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Великая ектения <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(сокращённая)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О мире свыше и спасении наших душ Господу помо­лимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О мире всего мира, об укреплении святых Божьих цер­кве́й и единении всех{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">их</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">] </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Об этом святом доме и обо всех, с верою, благоговением и страхом Божьим входящих в него, Господу
                        по­мо­лимся.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об избавле́нии нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­де́ния Господу помолимся.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Тво­ею благодатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва вторая</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Вновь, как и всегда, мы припада́ем к Тебе, о благой и человеколюбивый, и просим Тебя, дабы Ты,
                        воззре́в на наше моление, очистил наши ду­ши и{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тела от вся­кой скверны плоти и духа и дал нам неповин</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ное и не­осуж­де́нное предстоя­ние перед Твоим святым жер­т­вен­ником. Дару`й же, Боже, и{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">всем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">] </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        молящимся с нами пре­успе­ва́ние в жизни, и вере, и разумении духовном; дай им, всегда со страхом
                        и любовью служа Те­бе, неповинно и не­осуж­де́нно причащаться Твоим свя­тым таинствам и
                        Небес­ного Цар­ства Твоего удо­стоиться, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Громко:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        дабы мы, под Твое́й властью всегда хра­ни­мые, воссылали славу Тебе,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Дьякон (или предстоятель) совершает малое каждение с чте­нием Пс{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">50</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (см. с.&nbsp;</span>
                    <a>96</a>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5 ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ CharOverride-3">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва предстоятеля о себе
                        <span id="footnote-021-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-021"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Никто из свя´занных плотски`ми по́хотями и на­слаж­де­ниями не достоин приступать, или
                        прибли­жать­ся к Тебе, или слу­жить Тебе, Царю Славы, ведь слу­жение Тебе — велико́ и страшно и
                        для сами`х небес­ных сил! Но однако Ты, по Своему несказа́нному и безмер­ному человеколюбию,
                        не­преложно и неизменно став Человеком и Пер­во­свя­щен­ником нашим, при­ношение этого общего
                        слу­жения и бес­кровной жертвы пере­да́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        л нам как Владыка всего, ведь Ты один, Господи Боже наш, влады`чествуешь надо всем, что на небе
                        и на земле, Ты&nbsp;— на престоле хе­ру­вимском носи­мый, сера­фимов Господь и Царь Изра́иля,
                        один Святой и во свя­тыне пребывающий.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Итак, прошу Тебя, одного благо́го и внимающего моль­ба́м: воззри на меня, грешного и негодного
                        служителя Тво
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">его</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        <span id="footnote-020-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-020"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и силой Святого Духа Твоего укрепи меня, облечённого благодатью священства, для предстояния
                        перед этим свя­тым престолом Твоим и принесения в жертву Твоего свя­того и непорочного тела и
                        драгоценной кро́ви.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Преклони`в свою главу`, я к Тебе приступаю и прошу Те­бя: не отврати Твоего лица от меня и не
                        извергни меня из числа сыно́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        в Твоих, но благоволи`, чтобы через ме­ня, греш­ного и недо­стойного служителя Твоего, были
                        при­не­сены` Тебе эти дары`, —
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ведь Ты`&nbsp;— приносящий и приносимый, при­ни­ма­ющий и раздаваемый, Христе Боже наш, и мы
                        воссы­ла­ем славу Те­бе́, вместе с Твоим безначальным Отцом и все­святы`м и благи`м и
                        животворя´щим Ду­хом Твоим, ныне и всегда и во веки веков. Аминь.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p id="vhod" className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вход</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Херувимская песнь
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">входная песнь Литургии верных</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> 1-я часть Херувимской песни:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Херувимов в таинстве изображая…</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В то же время:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Херувимов в таинстве изображая <br /> и живо­творя­щей Троице <br /> Трисвятую песнь воспевая,{' '}
                        <br />
                        вся­кое ныне жи­тейское <br /> отло́жим попечение,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        <a id="_idTextAnchor005" />
                        дабы приня´ть нам Царя всего сущего, <br /> стражей ангельской
                        <br /> незримо сопровожда́емого.
                        <br />
                        Аллилуия, аллилуия, аллилуия.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Трижды.) </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Простите меня, братья и сёстры, греш­ного!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Прости и ты нас, досточти`мый отче!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> У жертвенника — после омовения рук тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, будь милостив ко мне, грешному!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо — после проскомидии и покрытия св.&nbsp;даров:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подыми, владыка!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Дьякону, принимающему св.&nbsp;дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возденьте руки ваши ко свя­тыне </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и бла­гословите Го­с­пода! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">13</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">3:2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Далее совершается Великий вход с приготов­лен­ными к прино­ше­нию хле­бом и вином.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ CharOverride-3">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Проскомидийные поминовения</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Великого господина и отца нашего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">свя­тей­ше­го</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> патри­ар­ха Мо­сковского и всея Руси </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">господина нашего преосвящен­ней­ше­го</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">ми­тро­по­лита </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">архиепископа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">, или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> епи­скопа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(титул)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">да воспо́мнит Господь Бог во цар­ствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во ве­ки ве­ков;</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">преосвященных</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        митрополитов, архиепископов и еписко­пов, и весь священнический и монашеский чин, и{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">прочий</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> клир церков­ный, братьев </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и сестёр</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святого дома сего…</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и всех вас, право­слав­ных </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> благочестивых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> христи­ан, да вос­по́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мнит Господь Бог во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во ве­ки веков!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-СПЕЦСЛУЖЕБНЫЕ_дляДИЗ_вКРАСНОМтексте CharOverride-8"> </span>
                    <span className="_-СПЕЦСЛУЖЕБНЫЕ_дляДИЗ_вКРАСНОМтексте CharOverride-8">[</span>
                    <span className="_-СПЕЦСЛУЖЕБНЫЕ_дляДИЗ_вКРАСНОМтексте CharOverride-8">Д и Н </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Да воспо́мнит Господь Бог пресвитерство твоё во цар­ствии Своём…
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К дьякону — тихо:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Да воспо́мнит Господь Бог священнодья´конство твоё во царствии Своём{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ CharOverride-6">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> 2-я часть Херувим­ской песни:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дабы приня´ть нам Царя всего сущего… </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(см. с.&nbsp;</span>
                    <a href="03_ЛитЗлат_РУС_ЛИЗ.html#_idTextAnchor005">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">53</span>
                    </a>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо — ставя св. дары на пре­стол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Достопочтенный Иосиф,
                        <br /> сняв с креста непорочное те­ло Твоё, <br />
                        его плащани`цей чистой с ароматами обвил <br /> и, погребая, в гробнице новой положи`л.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        В гробнице — телом <br /> и в аду — душой как Бог, <br />в раю — с разбойником <br /> и на
                        престоле — со Отцом и Ду­хом <br />
                        Ты пребывал, Христе, <br /> всё наполняя, не­объя´тный.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О, сколь живоно́сным и воистину прекраснее ра́я <br /> и све­т­лее любого царского чертога <br />
                        явился, Христе, гроб Твой — <br /> источник нашего воскресения!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Покрывая св. дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Достопочтенный Иосиф…</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Кадя св. дары:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Одари` ми­ло­с­тию Твоею Сион,
                        <br /> стены Иерусалима отстрой! <br />
                        Тогда будут жертвы угодны Тебе,
                        <br /> всесожже́ний и возношений обряд, <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тогда возло́жат тельцов <br /> на алтарь Твой{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 5</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">0:2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">0-</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">21</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">К дьякону:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Помолись обо мне, брат и сослужитель!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Дух Святой да сойдёт на тебя, </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и Сила Вышнего да осени`т тебя!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> (Лк </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">1:3</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">5.)</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тот же Дух да содействует нам во все дни жизни нашей!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо́мни и меня, владыка святой!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо́мнит тебя Господь Бог во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О приносимых святых дара́х Господу помолимся!</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об избавле́нии нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­де́ния Господу помолимся.</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подай, Господи </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ангела мира — верного наставника, хранителя на­ших душ и тел — у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Прощения и отпущения наших грехов и согрешений у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Доброго и полезного нашим ду`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">шам и миру мир у Господа испросим.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Остальное время нашей жизни прожи`ть в мире и покаянии у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Безболезненной, не­по­стыд­ной, мирной христианской кон­­-
                        <br />
                        чины нашей жизни и доброго ответа пред Христом на Страш­ном Суде испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Всесвяту`ю, непоро́чную, преблагослове́нную, слав­ную нашу Вла­дычи­цу Богородицу и Вечноде́ву
                        Марию со всеми свя­тыми помяну`в, са­ми`х се­бя, и друг друга, и всю нашу жизнь Христу{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дади`м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти`м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p id="prinoshenie" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва приношения</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> По поставлении св. даров на престол:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи Боже, Вседержитель, один Святой, Ты при­нимаешь жер­тву хва­лы от при­зы­ва­ющих Те­бя
                        всем сердцем, — прими же и нашу, греш­ных, молитву, и приведи нас к Твоему свя­тому
                        жерт­веннику, и укрепи нас для прино­шения Те­бе да­ро́в и жертв духовных за грехи наши и
                        совершённые по неве́­дению Твоим наро­дом; и удо­стой нас обрести милость в оча́х Твоих, чтобы
                        Тебе бла­го­уго́дной была жер­тва{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        наша и чтобы по­чи`л благо́й Дух благодати Твоей на нас, и на этих пред­ле­жащих дара́х, и на всём
                        народе Твоём, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        по состраданию Твоего единородного Сына, с Кото­рым Ты` благословен, вместе со всесвяты`м и
                        благи`м и живо­творя´щим Духом Твоим, ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p id="tselovanie" className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">3</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Целование мира
                        <br />и исповедание единой веры
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ CharOverride-9">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед целованием мира </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-019-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-019"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-4"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Иисусе Христе,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-4"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Боже наш, Созидатель люб­-
                        <br />
                        ви и благ Податель, дай и нам, чадам Твоим, любить друг друга, как возлюбил нас Ты, дабы,
                        соединённые единой любовью, мы к Тебе, Богу, приступили, и вознесли Тебе хвалу, и причастились
                        Твоим святым таинствам, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты` Любовь наша и мы` воссылаем славу Те­бе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        вместе с Твоим безначальным Отцом и всесвяты`м и благи`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и животворя´щим Духом Твоим,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возлю`бим друг друга! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Будем приветст­вовать друг друга целованием святым! — </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Рим 1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">6:1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">6.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        )
                        <span id="footnote-018-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-018"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П [и Н] </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Возлюблю Тебя, Господи, крепость моя! <br /> Господь — твердыня моя <br />и прибежище моё
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-4"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">7:2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">-3)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
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
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Сослужащие [и Н]: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">И есть, и будет</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-017-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-017"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> После преподания любви и мира:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Двери, двери!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-016-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-016"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В Премудрости будем внимать!</span>
                </p>
                <p id="simvol" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Символ веры</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Опахивая св. дары возду`хом:]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Верую в одного Бога — Отца, Вседержителя, Твор­ца неба и земли, всего видимого и невидимого.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        И в одного Господа Иисуса Христа, Сына Божьего&nbsp;— еди­но­родного, от Отца рождённого прежде
                        всех вре­мён{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> миро́в</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , Свет от Света, Бога истинного от Бо­га ис­тин­но­го, рождённого,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">но</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        не сотворённого, едино­сущ­ного От­цу, — через Которого всё стало;
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ради нас, людей, и для нашего спасения сшед­шего с Не­бес, и воплоти`вшегося от Свя­того Духа и
                        Де­вы Ма­рии, и ставшего Человеком;
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и распя´того за нас при Пилате Понтийском, и стра­дав­шего, и погребённого;
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и воскресшего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> восставшего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в третий день, по Пи­са­нию;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и восшедшего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вознёсшегося</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> на Небеса, и воссевшего по правую руку Отца;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и снова гряду`щего во Славе, дабы судить живых и мёрт­вых, и Его Царству не будет конца.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        И в Духа Святого — Господа, животворящего, от От­ца ис­ходящего, со Отцом и Сыном вместе
                        почитаемого и прославляемого, говорившего через про­роков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В одну святую, кафоли`ческую </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вселенскую, со­бор­ную</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и апостольскую Церковь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Признаю` одно крещение, ради прощения грехов.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ожидаю воскресения мёртвых </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и Жизни будущего века </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (т.&nbsp;е. вечной Жизни и нового состояния всего мира)
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="anafora" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Св. возношение (ана́фора)
                        <span id="footnote-015-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-015"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Станем строго, станем благоговейно! Будем со вниманием святое возношение в мире при­но­сить!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Милость! Мир! Жертва хвалы!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К народу (отложив возду`х):</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благодать нашего Господа Иисуса Хри­ста, и любовь Бога и Отца, и общение Святого Ду­ха да будет
                        со всеми вами!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И со духом твоим.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Воздев руки:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вознесём сердца!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возно́сим ко Господу.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Возблагодари`м Господа!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Достойно это, и праведно, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и справедливо</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        ]
                        <span id="footnote-014-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-014"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p id="prefacio" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-17">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Вводная часть</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Достойно это, и праведно, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и справедливо</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]&nbsp;</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        — Те­бя´ воспевать, Тебя бла­гословлять, Тебя вос­хвалять, Тебя бла­го­дарить, Тебе поклоняться
                        на всяком месте вла­ды­чества Твоего, ведь Ты`&nbsp;— Бог неизъяснимый, непостижимый, невидимый,
                        не­объят­ный, существующий непрестанно и тождест­венно, Ты, как и Твой единородный Сын и Свя­той
                        Дух Твой.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Ты` из небытия´ в бытие́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        нас привёл, и после паде­ния вос­ста­вил снова, и неотступно делал всё, до­ко́ле не возвёл нас на
                        Небо и не дарова́л нам Твоё будущее Царство.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        За всё это благодарим Тебя, как и Твоего единородного Сына и Святого Духа Твоего, за все
                        ве́до­мые и неве́до­мые, явные и неявные благодеяния, соделан­ные нам.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благодарим Тебя и за это </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">общее</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> служение </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (т. е. ли­-
                        <br />
                        тургию)
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        которое Ты благоволил приня´ть из рук на­­ших, хо­тя пред Тобою и предстоят тысячи ар­хан­ге­лов
                        и мно­жест­ва ангелов, херувимы и се­рафимы ше­стикры­лые, многоокие, воспаряю­щие на крыльях,
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">или </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">] Соделывает звездицей образ Креста.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> победную песнь воспевая, восклицая, возглашая и говоря </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(звездица отлагается)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        свят, свят, свят Господь Саваоф; полны` небо и зе­мля Славы Твоей! Осан­на{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. спасение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        в выш­них! Благословен Гряду`­щий во имя Господне! Осан­на в вышних!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Народ вторит.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        С этими блаженными силами, человеколюбивый Владыка, и мы восклицаем и говорим: свят и все­свят
                        Ты, как и Твой единородный Сын и Свя­той Дух Твой; Ты свят и всесвят&nbsp;— и прекрас­на Слава
                        Твоя!
                    </span>
                </p>
                <p id="anamnesis" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-17">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Воспоминание</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ты мир Свой та́к возлюбил, что о́тдал Своего еди­нородного Сына, дабы всякий веру­ющий в Него не
                        погиб, но имел Жизнь вечную.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Он же, придя и весь замысел </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">домо­устро­и­тель­ный про́мысел</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> о нас исполнив, в ту ночь, в ко­торую был </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        пре́­дан (а вернее Сам Се­бя пре́дал за Жизнь ми­ра), взяв хлеб в Свои святые и не­по­рочные и
                        безгре­ш­ные ру­ки, возблагодарив и бла­гословив, освя­тив, прело­ми`л его и пода́л Своим свя­-
                        <br />
                        тым ученикам и апо­столам, сказав:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> «Прими`те, вкуси`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        те, это тело Моё, за вас пре­лом­ля­емое ради прощения грехов».
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Так же и чашу после Тра́пезы по­да́л, говоря:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        «Пейте из неё все, это кровь Моя, кровь Нового За­­-
                        <br />
                        вета, за вас и за многих изливаемая ради про­ще­ния гре­хов».
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Итак, воспоминая эту Его спасительную заповедь и всё, ради нас Им соде́ланное: крест, гроб,
                        триднев­ное вос­кре­сение, на Небеса восхож­де­ние, по правую руку{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твою</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> восседа­ние и ещё Его второе и славное При­шествие,</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">или </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">] Возносит хлеб и вино.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоё из Твоего Тебе́ принося всегда и везде</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-013-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-013"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Тебя´ воспеваем, Тебя благословляем, Тебя бла­го­да­рим, Господи, и молимся Тебе, Боже наш!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        (На­род вто­рит.)
                        <span id="footnote-012-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-012"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p id="epiclisis" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Призывание</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы приносим Тебе это духовное и бескров­ное слу­же­ние, и просим, и молим, и умоляем:
                        ниспо­шли` Святого Ду­ха Твоего на нас и на эти предле­жащие дары`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, святой хлеб</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и соделай этот хлеб&nbsp;</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">—</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святым телом Твоего Христа,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, святую чашу</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> а что в чаше сей — святой кровью Твоего Христа,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, их вместе</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> преложи`в </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. перемени`в)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Святым Духом Твоим, </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д [</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь, аминь, аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-10"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо́мни меня, святой владыка, грешного!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да воспо́мнит тебя Господь Бог во царствии Своём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Отходя на прежнее место:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-4"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чтобы они были причаща́</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ющимся для трезве́ния ду­ши и прощения грехов, для общения Святого Духа Тво­его и достижения
                        полноты Царства Не­бе­сно­го, для дер­зно­вения пред Тобо
                    </span>
                    ю<span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, а не в суд или во осужде́ние!</span>
                </p>
                <p id="hodataistvo" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Хода́тайство</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ещё мы приносим Тебе это духов­ное служение за в вере почивших:{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        за пра́отцев, отцов, патри­ар­хов, проро­ков; апо­сто­лов, проповедников, благо­ве́стников,
                        мучеников, испо­ведников, подвижников{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. аске­тов)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и за ду­хи всех праведников, в вере до­стиг­ших совер­шенства{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">скончавшихся</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и особенно за всесвяту`ю, непоро́чную, пребла­­го­слове́н­ную, славную нашу Вла­дычицу
                        Бо­го­ро­ди­цу и Веч­ноде́ву Ма­рию;
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Во время каждения св. даров:</span>
                </p>
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
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-011-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-011"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и за святого Иоанна, пророка, Предтечу и Кре­сти­те­­ля, за святых славных и всехвальных
                        апо­сто­лов,{' '}
                    </span>
                    за свя­тых <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена)</span>, которых память ныне совер­ша­ем,{' '}
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и за всех Твоих свя­тых, по молитвам ко­торых воз­зри на нас, Боже.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        оспо́мни и всех усопших с надеждой на воскре­сение для Жизни вечной чад
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">) </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоих </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена усопших)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и упокой их там, где сияет Свет лица Твоего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Ещё мы приносим Тебе это духовное служение&nbsp;за весь наш мир, за святую кафолическую{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">все­лен­скую, со­бор­ную</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и апостольскую Церковь, за пре­быва­ющих в чистоте и достойной{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. свя­той)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> жизни; за нашу бо­гохра­нимую страну </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Русскую</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , весь народ и вла­сти её (дай им, Господи, мир­ное правление, дабы в ми­ре их и нам проводить
                        спокойную и тихую жизнь во всём благо­че­стиво и достойно).
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо́мни, Господи, этот город </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">это село </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в кото­ром живём </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> эту святую обитель, в ко­то­рой живём</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">как и все города и страны, и ве­рою жи­ву­щих в них.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И среди первых воспо́мни, Господи, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">великого гос­подина и отца на­шего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">святейшего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> патриарха Москов­ско­го и всея Ру­си, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">господина на­шего пре­ос­вя­­ще́ннейшего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">, мит­ропо­ли­та</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> ар­хи­епи­скопа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">, или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> епископа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(титул)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и да­ру`й ему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/им</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> слу­жить Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-им</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святой</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-ым </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">цер­кви</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-а́м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в ми­ре, в чести, невредимым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, здра­вым/-и, дол­го­де́н­ству­ю­щим</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, пра­виль­но пре­подаю`щим</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">/-и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> сло­во Твоей Ис­тины;</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и всех </span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Ещё мы мо́лим Тебя: воспо́мни, Господи, всех пра­вославных епи­ско­пов, правильно преподаю`­щих
                        сло­во Твоей Истины, всех пресви`теров, во Хри­сте дья´ко­нов, и весь иной священнослужа́­щий
                        чин.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Воспо́мни, Господи, плавающих, путешествующих, больных, страждущих, пленённых,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">за правду гонимых и заклю­чён­ных,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и о спасении их.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воспо́мни, Господи, и чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена живых)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Воспо́мни, Господи, принося´щих поже́ртвования, и дела­ющих доброе для Твоих святых церкве́й, и
                        за­ботя­щих­ся о бедных,{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и Свои милости на всех нас ниспо­шли`.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        И дай нам едиными уста́ми и единым сердцем про­слав­лять и воспевать вседостойное и прекра­с­ное
                        имя Твоё,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-19">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">5</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Приготовление ко причащению</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        И да будут милости великого Бога и нашего Спаси­теля Иисуса Христа со всеми вами!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И со духом твоим.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Просительная Ектения
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед Молитвой Господней)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Всех святых воспомяну`в, снова и снова в мире Гос­по­ду помолимся!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О принесённых и освящённых святых дара́х Го­с-
                        <br />
                        ­поду помолимся, дабы человеколюбивый Бог наш, приня´в их на Свой свя­той и пре­небесный и
                        умопостига́емый жер­твен­ник как бла­го­уха́ние духовное, в ответ нис­по­сла́л нам бо­же­ственную
                        благодать и дар Святого Ду­ха!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Помо­лим­ся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Об избавле́нии нас от всякого угнетения, гнева, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бе­ды`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и принуж­де́ния Господу помолимся.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Весь день провести свято, мирно и без­греш­но у Го­спо­да испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Подай, Господи </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ангела мира — верного наставника, хранителя наших душ и тел — у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Прощения и отпущения наших грехов и согрешений у Гос­пода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Доброго и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">полезного нашим ду`шам и миру мир у Господа испро­сим.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Остальное время нашей жизни прожи`ть в мире и покаянии у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Безболезненной, не­по­стыд­ной, мирной христианской кончины нашей жизни и доброго ответа пред
                        Христом на Страш­ном Суде испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Единства веры и общения Святого Духа испросив, са­ми`х се­бя, и друг друга, и всю нашу жизнь
                        Христу{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дади`м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти`м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Гос</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">поди.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p id="ourfather" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед причащением</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Тебе, человеколюбивый Владыка, вверяем всю на­шу жизнь и надежды, и просим, и мо́лим, и умоляем
                        Тебя:
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        удо­стой нас причаститься Твоим небесным и великим таинствам, этой священной и духовной тра́пезе,
                        с чистой со­ве­стью — для от­пуще́ния грехов и прощения согреше­ний, для общения Святого Духа и
                        насле­дования Цар­ства Небесного, для дерзно­ве­ния пред Тобою, а не в суд или во осужде́ние.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        И удостой нас, Владыка, со дерзновением не­осуж­де́нно сметь именовать Тебя, Небесного Бо­га,
                        Отцом и говорить{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> воспевать</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">: </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Отец наш Небесный!
                        <br />
                        да святи`тся имя Твоё,
                        <br />
                        да придёт Царство Твоё,
                        <br />
                        да будет воля Твоя
                        <br />и на земле, как на Небе;
                        <br />
                        хлеб наш насущный подай нам сегодня,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и прости нам долги` наши,
                        <br />
                        как и мы простили должникам нашим,
                        <br />и не введи нас во искушение,
                        <br />
                        но избавь нас от лукавого <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. от зла или от злого — дьявола)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, — </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо Твои` царствие, и сила, и слава, <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        <br />
                        ныне и всегда и во веки веков{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Мф </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">6:9</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">-</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">13</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пред Господом ваши главы` преклони`те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пред Тобой, Господи.</span>
                </p>
                <p id="glavopriklon" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва главопреклонная</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благодарим Тебя, о Царь невидимый, что Ты Своей неизме­ри`мой си­лой всё созда́л и по обилию
                        Своего благосе́рдия из небытия´ в бытие́ всё привёл, — Ты же, Владыка, воз­зри` с Небес на
                        склонивших пред Тобою свои главы`, ведь они склонили их не пред пло­тью и кровью, но пред Тобою,
                        грозным Богом. Итак, Владыка, Ты предстоящее устрой нам всем во благо, по собственной нужде́
                        каждого: плавающих со­про­води, путе­шествующим сопутствуй, больных ис­це­ли, как Врач душ и тел
                        наших, —
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-11">
                        <span id="footnote-010-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-010"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        В Литургии св. Василия Великого здесь стоит молитва о готовящихся к причащению:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О Владыка и Господь, Отец сострадания и Бог всякого утеше́ния, склони`вших пред Тобою свои главы`
                        благослови, освяти`, сохрани, укрепи, утверди`, от всякого злого дела отврати и со всяким добрым
                        делом сочетай, и удостой их неосужде́нно причаститься этим непорочным и животворящим таинствам
                        Твоим, для прощения грехов и общения Духа Святого, —
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        по милости, и состраданию, и человеколюбию Твоего еди­но­род­ного Сына, с Которым Ты`
                        благословен, вместе со всесвя­ты`м и благи`м и живо­тво­ря´щим Ду­хом Твоим, ны­не и все­гда и
                        во веки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">перед возношением св. хлеб</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">а</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Вне́мли, Господи Иисусе Христе, Боже наш, из свя­той обители Своей
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-009-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-009"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и при­ди`, дабы освя­ти`ть нас, — Ты, со Отцом на Не­бе­сах восседающий и с нами здесь невидимо
                        при­су­т­ствую­щий,&nbsp;— и бла­го­воли` Твоею сильною рукой пре­пода́ть часть от Твоего
                        непорочного тела и драгоценной крови нам и через нас&nbsp;— всему народу{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П и Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, будь милостив ко мне, грешному! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Трижды.)]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вознося св. хлеб:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Святыня — святы`м!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Один Ты свят, один Ты — Господь Иисус Христос, ко сла­ве Бога-Отца, аминь.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Раздроби, владыка, святой хлеб</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Раздробляется и раздаётся Агнец Божий, <br /> раз­дро­б­ля­емый&nbsp;— и не разделяемый, <br />
                        всегда вкушаемый&nbsp;— и ни­когда не оскудева́ющий, <br /> но причаща́ющихся освя­ща́ющий.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Восполни, владыка, святой поти`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">р</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Влагая частицу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ИС</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> в св. потир </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        (как бы воссо­единяя Тело и Кровь Хри­стовы) и затем говоря
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Полнота </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">об­щения</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Святого Духа!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь. Благослови, владыка, жар</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен жар святынь Тво­их </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во веки веков, аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вливая в св. потир кипяток:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пыл веры, наполненный Святым Духом</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> (т. е. Духом Жизни)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Дробится частица </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ХС</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        для причащения в алтаре
                        <span id="footnote-008-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-008"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                        .
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p id="prichashenie" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">6</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Св. причащение</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor006" />
                        Молитва перед св. дарами
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Молимся всею церковью</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П [и Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Верую, Господи, и ис­по­ве­дую, что Ты — по­ис­ти­-
                        <br />
                        не Христос, Сын Бога жи­во­го, пришедший в мир грешников спасти, первый из ко­то­рых — я. Ещё
                        верую, что вот это есть непорочное те­ло Твоё, а вот это есть драгоценная кровь Твоя.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-б-отст-абз ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Молю же Тебя: помилуй меня и прости мне воль­ные и невольные со­греше­ния мои, соделанные словом
                        или делом, в ве́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        дении или неве́дении, и удостой меня не­осуж­де́н­но причаститься непорочным таин­ствам Твоим для
                        прощения грехов и Жизни вечной, аминь.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Тра́пезы та́инственной Твоей, о Сын Божий, ме­ня при­ча­стни­ком и ныне прими`, ведь я врагам
                        Твоим тайны{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">] </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        не выдам и не дам Тебе того же целования, что Иу­да, но, словно разбойник, ис­пове́дую Те­бя:
                        вспо­м­ни обо м­не, Го­споди, во цар­ствии Своём!{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Прича­щение святым таинствам Твоим, Го­спо­ди, да будет мне не в суд или во осужде́ние, но для
                        ис­целения ду­ши и тела!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Причащение в алтаре</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Н Причастный стих
                        <span id="footnote-007-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-007"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                        .
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дьякон, приступи`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        Вот, я приступаю к бессмертному Царю и Богу нашему
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Преподай мне, владыка, драгоценное и святое тело нашего Го­спо­да и Бога и Спасителя Иисуса
                        Христа!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Священнодьякону </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        преподаётся драгоценное, и свя­тое, и непорочное тело нашего Господа и Бога и Спаси­теля Иисуса
                        Христа для про­ще­ния грехов его и Жизни вечной.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Причащаясь сам:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
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
                        Драгоценное и всесвятое тело нашего Го­спо­да и Бога и Спа­сителя Иисуса Христа пре­по­даётся
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Драгоценная и святая кровь нашего Господа и Бога и Спаси­теля Иисуса Христа преподаётся мне,
                        пре­сви­теру{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, для прощения грехов мо­их и Жизни вечной.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Целуя чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Вот, это коснулось уст моих, и удали`т беззакония мои, и от моих грехов меня очи­стит{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Ис </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">6:7</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дьякон, приступи!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Вот, я приступаю к бессмертному Царю и Богу нашему. Преподай мне, владыка, драгоценную и свя­тую
                        кровь нашего Господа и Бога и Спасителя Иису­са Христа!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Служителю Божьему дьякону </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        преподаётся драгоценная и святая кро­вь нашего Го­спода и Бога и Спаси­теля Иисуса Хри­ста для
                        про­ще­ния гре­хов его и Жизни вечной.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Дьякону после причащения:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Вот, это коснулось уст тво­их, и удали`т беззакония твои, и от твоих грехов те­бя очистит.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Дробится св. агнец (частицы </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">НИ</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">КА</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">) и гото­вится св. чаша для народа.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-20">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Причащение народа в храме</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В царских вратах народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Со страхом Божьим, и верою, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и любовью</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        при­сту­­-
                        <br />
                        пи`те!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Медленно:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословен Грядущий во имя Господне; <br /> Бог — Го­сподь, и воссиял Он нам! <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс&nbsp;</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">11</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">7:2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">6, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">27</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">.)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-006-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-006"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Причащая:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Чаду </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> рабу</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Божьему </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        преподаётся дра­гоцен­ное и свя­то­е тело и кровь нашего Господа и Бо­га и Спа­сителя Иисуса
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Тело Христово прими`те, от источника бессмер­тия вку­си`те!
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-005-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-005"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-20">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">После причащения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Увидев Воскресение Христа, покло́нимся свя­то­му Го­споду Иисусу, одному безгрешному! Кре­сту
                        Твое
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        му поклоняемся, Христе, и святое Вос­кре­сение Твоё по­ём и славим; Ты — Бог наш, кро­ме Тебя
                        иного не зна­ем и имя Твоё призы­ва­ем. При­ди`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        те, все вер­ные, по­кло́нимся святому Христову Воскресе­нию, ибо при­шла через Крест радость
                        все­му миру! Всегда благо­слов­ляя Госпо­да, воспеваем Вос­кре­сение Его: Он, ради нас распятие
                        претерпев, Смер­тию смерть победил!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Светись же, светись, новый Иерусалим, ибо Сла­ва Го­сподня над тобою взошла; ныне тор­жествуй и
                        весе­лись, Сион; а ты, чистая Богоро­дица, радуйся Воскре­сению Рождённого тобой!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О Христос — Пасха великая и святейшая, Пре­муд­рость, Божье Слово и Сила! Дару`й нам полнее{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> совершеннее</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> к Тебе приобщаться в невечер­ний день Царства Твоего.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Отирая оставшиеся частицы с дискоса в чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Своей непорочной Кро­вью отмой от грехов, Го­с­поди, всех воспомина́в­ших­ся здесь, по
                        хода́тай­ству Твоих святых!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">7</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благодарение после причащения</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя народ, в заключение: </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Спаси, Бо­же, народ Твой <br /> и благослови наследие Твоё!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">7:9</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Мы узре́ли Свет истинный, <br /> при`няли Духа Небесно­го, <br />
                        обрели мы веру истинную, <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        поклоняясь неразде­ль­ной Троице, <br /> ибо Она спасла нас
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-004-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-004"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Кадя св. чашу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Превыше небес, Боже, восстань, <br /> распростри`
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> над зе­м­лёй Славу Твою </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 5</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">6:6</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> —</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Относя св. чашу на жертвенник:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Благословен Бог наш —</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К народу:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да наполнятся уста наши</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> хвалою Тебе, Госпо­ди,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дабы нам воспевать Славу Твою,</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> раз­мыш­ля´ющими весь день о прав­де Твоей.</span>
                    <span className="_--КРАСНЫЙ">/</span>
                    <span className="_--КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аллилуия, аллилуия, аллилуия</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-003-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-003"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Станем благогове́йно! Причастившись божест­вен­-
                        <br />
                        ­ным, святым, непорочным, бессмертным, не­бесным и жи­во­тво­рящим, страшным Христовым
                        таинствам, до­стойно воз­благодари`м Господа!
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Весь день провести свято, мирно и без­греш­но ис­про­си`в, са­ми`х себя, и друг друга, и всю
                        нашу жизнь Хри­сту{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дади`м </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти`м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва благодарственная
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(после причащения всех)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благодарим Тебя, человеколюбивый Владыка, Благодетель душ наших, ибо и в нынешний день Ты
                        удо­сто­ил нас Твоих небесных и бессмертных таинств! Соделай же пря­мым путь наш, укрепи нас
                        всех во страхе Тво­ём, охра­ни на­шу жизнь, утверди наши стопы`, по мо­литвам и молениям славной
                        Богородицы и Вечноде́вы Марии, и всех Твоих свя­тых, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Совершая Евангелием образ Креста над анти­мин­сом:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты` освящение наше и мы` воссы­лаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">От­цу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Древний отпуст:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пойдём в мире!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> С именем Господним.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> При выходе из храма:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва заамвонная</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, благословля´ющих Тебя благословля´ющий </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и полагающихся на Тебя освящающий! Спаси народ Твой и благослови наследие Твоё, Цер­ковь Твою в
                        полноте со­хра­ни, освяти любя­щих красоту` дома Твоего! Ты в ответ про­славь их Твоей
                        божественною силой и нас, на­деющихся на Тебя, не ос­тавь; дару`й мир миру Твоему, церква́м
                        Твоим, свя­щен­ству, нашим правителям и все­му народу Твоему, —
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо всякое даяние доброе и всякий дар совер­шенный нисходит свыше — от Тебя´, Отца све­тов{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> светил</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и мы` вос­сы­ла­ем славу, и благодарение, и поклонение Тебе,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сы­ну и Свя­тому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">8</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Заключительные молитвы</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва «в сосудохранилище» <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">
                        (перед снятием священных одежд и на потребление <br />
                        св. даров или перед агапической трапезой)
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Как полнота Закона и Пророков, Христе Боже наш, <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Ты исполнил весь замысел <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> про́мысел</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Отчий, — <br />
                        исполни же радо­стью и весельем сердца наши` во все дни: ныне и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Н </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Да будет имя Господне благословенно — отныне и до века!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Трижды.)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-002-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-002"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Далее бывает раздача хлеба — антидора и про­сфор.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Псалом 33</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Может петься и в начале тра́пезы любви, т. е. агапы.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословлять буду Господа во всякое время,
                        <br /> непрестанно хвала Ему на уста́х моих.
                        <br />
                        Господом будет хвалиться душа моя,
                        <br /> да услышат кроткие — и возвеселя´тся.
                        <br />
                        Величайте Господа со мною,
                        <br /> будем превозносить имя Его вместе.
                        <br />
                        Взыска́л я Господа, и Он услышал меня,
                        <br /> и от всех скорбе́й моих избавил меня.
                        <br />
                        Приступи`те к Нему — и просвети`тесь,
                        <br /> и ли`ца ваши не постыдя´тся.
                        <br />
                        Вот, убогий воззвал — и Господь услышал его,
                        <br /> и от всех бед его Он спас его.
                        <br />
                        Ограждает ангел Господень боящихся Его — <br /> и избавляет их.
                        <br />
                        Вкуси`те — и увидите, что благ Господь!
                        <br /> Блаже́н тот, кто уповает на Него!
                        <br />
                        Бойтесь Господа, святые Его,
                        <br /> ибо нет скудости у боящихся Его.
                        <br />
                        Богатые обнищали и взалка́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ли,
                        <br /> а ищущие Господа не те́рпят нужды` <br />
                        ни в каком благе.
                        <br />
                        Приди`те, чада, послушайте меня:
                        <br /> страху Господню научу вас.
                        <br />
                        Кто же не хочет жить и долгоде́нствовать,
                        <br /> чтобы видеть бла́го?
                        <br />
                        Так удерживай язык свой от зла <br /> и уста свои — от лукавства.
                        <br />
                        Уклоняйся от зла и твори добро;
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> ищи мира и стремись к нему.
                        <br />
                        Очи Господни обращены` на праведных,
                        <br /> и уши Его — к молитве их.
                        <br />
                        Лицо же Господне против творящих зло,
                        <br /> дабы истребить с земли память о них.
                        <br />
                        Взывают праведные, и Господь слышит их,
                        <br /> и от всех скорбе́й их избавляет их.
                        <br />
                        Близок Господь к сокрушённым сердцем,
                        <br /> и смире́нных духом спасёт.
                        <br />
                        Много скорбе́й у праведного,
                        <br /> и от всех их избавит его Господь.
                        <br />
                        Он хранит все кости его,
                        <br /> ни одна из них не сокруши`тся.
                        <br />
                        Смерть же грешника люта́, <br /> и ненавидящие праведного согрешат.
                        <br />
                        Избавит Господь ду`ши рабов Своих,
                        <br /> и не погибнет никто из надеющихся на Него.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Бла­го­словляя народ на уход, возможно, после об­щей трапезы:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Благословение Го­сподне на вас, по Его милости и человеколюбию{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">во все дни:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ны­не и всегда и во веки веков!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Слава Тебе, Христе Боже, Надежда наша, слава <br />
                        Те­бе!
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-001-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-001"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. Бла­го­слови!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-000-backlink">
                            <a
                                className="_idFootnoteLink _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-000"
                            >
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                </p>
                <p id="otpust" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor008" />
                        <a id="_idTextAnchor009" />
                        Отпуст
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">По обычаю — с крестом в руках:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Христос, истинный Бог наш, по хода́тайству Своей всенепорочной Ма­тери, свя­тых слав­ных и
                        все­хваль­ных апосто­лов, во святых от­ца нашего Иоан­на, архи­епи­скопа
                        Константино́по­ль­ско­го, Злато­уста, святых{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(храма и дня)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и всех свя­тых, да помилует и спасёт нас, по Сво­ей бла­гости и человеколюбию!
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [В воскресенье:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Воскресший из мёртвых Христос, истинный Бог наш…</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Праздничные отпусты — см.: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн.&nbsp;2. С.&nbsp;</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">23</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">9–2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">63</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Многолетие
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(при закрытии завесы</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Великого го­спо­дина и отца нашего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">свя­тейше­го</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> па­три­арха Мос­ковского и всея Руси, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                        господина на­-
                        <br />
                        шего преосвященнейшего
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">, мит­ро­по­лита </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> архиепископа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">, или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> епископа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(титул)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">на­шу бо­гохра­ни­мую стра­ну </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Русскую</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> брать­ев </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и се­стёр</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        свя­того дома сего, и всех пра­во­слав­ных хри­стиан — Го­споди, со­хра­ни их на многие ле́та!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[И ещё:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи, твердыня на Тебя надеющихся, ут­верди Церковь, которую Ты приобрёл драгоценной Кровью
                        Своей!
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Священник в алтаре читает Благодарственные молитвы (см. с.&nbsp;
                    </span>
                    <a>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">120</span>
                    </a>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">–</span>
                    <a>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">124</span>
                    </a>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                </p>
                <hr className="HorizontalRule-1" />
                <div className="_idFootnotes">
                    <div id="footnote-031" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-031-backlink"
                                >
                                    *
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                То есть взятые из службы «Изобразительных» («Типика́»). Ан­тифоны ещё могут быть
                                праздничные и вседневные (будничные); последние даны ниже.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-030" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <a
                                className="_idFootnoteAnchor _idGenColorInherit"
                                href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-030-backlink"
                            >
                                **
                            </a>{' '}
                            «Блаженны» могут петься с тропарями из канонов Утрени по Типикону (богослужебному Уставу).
                        </p>
                    </div>
                    <div id="footnote-029" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-029-backlink"
                                >
                                    ***
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Если Трисвятое не поётся, то даётся только возглас.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-028" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-028-backlink"
                                >
                                    ****
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Вместо Трисвятого в Рождество Христово, Богоявление, Лазареву субботу, а также на
                                Светлой (Пасхальной) седмице и на Пятидесятницу поётся:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Вы все, во Христа крестившиеся, во Христа облеклись. Аллилуия!
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На Воздвижение креста: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Кресту Твоему поклоняемся, Владыка, и святое Воскресение Твоё славим.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-027" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-027-backlink"
                                >
                                    *****
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Изначально могла быть обращена к Богу-Отцу (ср.:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн.&nbsp;3. 2-е изд. М., </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2010</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. С.&nbsp;</span>125
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                        </p>
                    </div>
                    <div id="footnote-026" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-026-backlink"
                                >
                                    ******
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Далее могут быть ещё добавлены особые прошения, в т. ч. по специальной просьбе верных, о
                                болящих, по случаю различных бедствий, скорбей и нужд и т. д. Также перед Заупокойной
                                ектениёй могут быть добавлены и соответствующие особые молитвы после дьяконского
                                возгласа{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господу помолимся!</span>
                        </p>
                    </div>
                    <div id="footnote-025" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-025-backlink"
                                >
                                    *******
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Не читается в храмовые (престольные) и двунадесятые праздники и, как правило, в
                                воскресные дни, дни Святок и всей св. Пятидесятницы.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-024" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-024-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Если присутствуют просвещаемые, то здесь могут быть до­бавлены специальные Ектения и
                                Молитва о просвещаемых, сохранившиеся в Литургии преждеосвящённых даров (см.:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн.&nbsp;3. С.&nbsp;9</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">5–9</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">6).</span>
                        </p>
                    </div>
                    <div id="footnote-023" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-023-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Или: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Пусть никто из оглашаемых, никто из тех, чья вера не­твер­да, никто из кающихся, никто
                                из нечистых
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (т. е. обуреваемых) </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                не при­бли­жается к святым таинствам. Кто не причащается, да покинет собра­ние!
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (св. Григорий Двоеслов)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                    </div>
                    <div id="footnote-022" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-022-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Древнее надписание: «После распростертия илитона» (возможно, с ан­ти­минсом).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-021" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-021-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вставка из Литургии св. Василия Великого.</span>
                        </p>
                    </div>
                    <div id="footnote-020" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-020-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В церковнославянском тексте далее вставка: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и очисти мою душу и сердце от сове­сти нечистой</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                        </p>
                    </div>
                    <div id="footnote-019" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-019-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На Руси читалась до сер. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ХVII</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> в. Изначально могла быть обращена к Богу-Отцу.</span>
                        </p>
                    </div>
                    <div id="footnote-018" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-018-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Далее в тексте Служебника вставки:</span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-б-отст">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> …дабы в единомыслии ис­по­ведать:</span>
                        </p>
                        <p className="_-ПЕТИТ_Петит-б-отст">
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Отца и Сына и Святого Духа — Троицу единосущ­ную и нераздельную.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-017" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-017-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Согласно древней практике перед закрытием входных дверей все верные дают друг другу
                                целование мира и любви со сло­вами:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос посреди нас!</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> — и отвечая: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">И есть, и будет!</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [или:</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Христос воскрес!</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> — </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Воистину воскрес</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">].</span>
                        </p>
                    </div>
                    <div id="footnote-016" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-016-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                «Дьяконы пусть стоят при дверях… чтобы во время возношения никто не выходил и чтобы не
                                отворялась дверь, хотя бы пришёл и верующий» (Апостольские постанов­ления. 8.{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">11</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                        </p>
                    </div>
                    <div id="footnote-015" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-015-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Раздел (4) — Евхаристический кано́н. Он со­стоит из вступ­ления и четы­рех основных
                                частей: префа́цио (вводная часть), ана́мнесис (воспо­ми­нание), эпи`клесис (при­зывание) и
                                ин­тер­це́
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ссио (хода́тай­ство).</span>
                        </p>
                    </div>
                    <div id="footnote-014" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-014-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Далее в тексте Служебника вставка: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                покло­няться Отцу и Сыну и Святому Духу, Троице еди­носущной и нераз­дельной
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-8">.</span>
                        </p>
                    </div>
                    <div id="footnote-013" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-013-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> См. у М. Арранца и др. С греч., возможно ещё: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">согласно всему </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">этому</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">) (</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">по всем этим причинам</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и для всего </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">этого</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">) (Е. Ло­вягин и др.)</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                        </p>
                    </div>
                    <div id="footnote-012" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-012-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                В церковнославянском тексте Служебника далее следует вставка: тропарь Третьего часа, со
                                стихами (см.:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн.&nbsp;1. 3-е изд. М., </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2015</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span> С. 214
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">, а также: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн.&nbsp;7. </span>С.&nbsp;35
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                        </p>
                    </div>
                    <div id="footnote-011" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-011-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                В двунадесятые праздники и в дни их попразднества обычно вместо «Воистину подобает»
                                поётся «задостойник», т. е. запев на 9-й песни канона праздника (см.:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн. 1. Изд. 3-е, испр. и доп. М. : </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">СФИ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2015</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. С. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">17</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">7–2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">06</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">, </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">22</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4–2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">34</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">) и её ирмо́с.</span>
                        </p>
                    </div>
                    <div id="footnote-010" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-010-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Эта молитва, вероятно, когда-то служила отпустом для непричащающихся верных (см.: Taft
                                R. The Precommunion Rites. Roma,{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2000</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. P. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">193</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">). </span>
                        </p>
                    </div>
                    <div id="footnote-009" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-009-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В тексте Служебника далее вставка: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и со славного пре­стола царствия Своего</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-8">.</span>
                        </p>
                    </div>
                    <div id="footnote-008" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-008-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Далее по обычаю предстоятель просит у всех прощения и тихо молится:
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Отпусти, оставь, прости, Боже, наши вольные и невольные согре­ше­ния, соделанные словом
                                и делом, в ве́дении и неве́
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                дении, днём и в ночи`, во уме и разумении, — всё нам прости, по Своей благости и
                                человеколюбию!
                            </span>
                        </p>
                    </div>
                    <div id="footnote-007" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-007-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                То есть прича́стен (кино́ник) дня или святого — см.:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн.&nbsp;2. С.&nbsp;</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">22</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4–2</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">63</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                . Поётся во время прича­ще­ния в алтаре (а иногда и в храме).
                            </span>
                        </p>
                    </div>
                    <div id="footnote-006" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-006-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На Светлой седмице поётся </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (</span>см.: ПБ. Кн.&nbsp;1. с. 224
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                        </p>
                    </div>
                    <div id="footnote-005" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-005-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На Светлой седмице поётся </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                .<a id="_idTextAnchor007" />
                            </span>
                        </p>
                    </div>
                    <div id="footnote-004" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-004-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> От Пасхи до отдания поётся </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                , от Вознесения до отдания — тропарь Вознесению, в Троицкую родительскую субботу —{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">По глубочайшей Премудрости </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(см.: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ПБ</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Кн.&nbsp;7. С.&nbsp;</span>145
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                        </p>
                    </div>
                    <div id="footnote-003" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-003-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На Светлой седмице поётся </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                        </p>
                    </div>
                    <div id="footnote-002" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-002-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На Светлой седмице поётся </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                        </p>
                    </div>
                    <div id="footnote-001" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-001-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                На Пасху, в Светлую седмицу и на отдание Пасхи вместо этих слов поётся:{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                Христос воскрес из мёртвых, Смертию смерть поправ
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">, а народ закан­чивает: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и тем, кто во гробах, Жизнь дарова́в</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">. Затем даётся отпуст.</span>
                        </p>
                    </div>
                    <div id="footnote-000" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="03_ЛитЗлат_РУС_ЛИЗ.html#footnote-000-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> От Фоминой недели до отдания Пасхи поётся </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды).</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="_idGenObjectLayout-1">
                <div id="_idContainer004" className="Текстовый-фрейм"></div>
            </div>
        </div>
    );
};

export default Zlatoust;
