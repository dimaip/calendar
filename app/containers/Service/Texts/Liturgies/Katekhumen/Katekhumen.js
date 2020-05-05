import React from 'react';
import { css } from 'emotion';
import Tooltip from 'components/Tooltip/Tooltip';
import isGospel from 'domain/isGospel';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import Antifon1 from './Antifon1/Antifon1';
import Antifon2 from './Antifon2/Antifon2';
import Antifon3 from './Antifon3/Antifon3';
import SolidSection from 'components/SolidSection/SolidSection';
import Hymns from 'containers/Main/Hymns';
import useScrollToReadings from '../../useScrollToReadings';
import forEach from 'lodash.foreach';
import useExternalDay from 'hooks/useExternalDay';
import Sermons from 'containers/Main/Sermons';
import ReadingItem from 'containers/Readings/ReadingItem';
import Alilujas from './Aliluja';
import Prokimens from './Prokimen';
import VariableSection from '../../VariableSection';
import Trisvatoe from './Trisvatoe';
import VhodnoiStih from './VhodnoiStih';

const Readings = ({ readings }) => (
    <>
        {readings
            .map(({ readingVerse, type }) =>
                readingVerse ? <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} /> : null
            )
            .filter(Boolean)}
    </>
);

const getKatekhumenReadings = day => {
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
    return { apostol, gospel };
};

const Katekhumen = ({ lang, date, day }) => {
    useScrollToReadings();
    const externalDayQuery = useExternalDay(date);
    const { apostol, gospel } = getKatekhumenReadings(day);

    const antifon1 = <Antifon1 lang={lang} date={date} />;
    const antifon2 = <Antifon2 lang={lang} date={date} />;
    const antifon3 = <Antifon3 lang={lang} date={date} />;

    const hymns = day?.prayers && day.prayers.length > 0 && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={day.prayers} />
        </SolidSection>
    );

    const aliluja = (
        <VariableSection date={date}>
            <Alilujas day={day} date={date} />
        </VariableSection>
    );

    const prokimen = (
        <VariableSection date={date}>
            <Prokimens day={day} date={date} />
        </VariableSection>
    );

    const trisvatoe = <Trisvatoe day={day} lang={lang} />;

    const vhodnoiStih = (
        <VariableSection date={date}>
            <VhodnoiStih day={day} lang={lang} />
        </VariableSection>
    );

    const { sermons: sermonsData } = externalDayQuery.data || {};

    const sermons = (
        <SolidSection paddingTop={8} marginTop={12} marginHorizontal={-12}>
            <Sermons date={date} sermons={sermonsData} hideTitle />
        </SolidSection>
    );

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const brightWeek = isEasterOffsetRange(0, 6);
    const easterSeason = isEasterOffsetRange(0, 38);
    const easterOtdanie = isEasterOffsetRange(38);
    const brightOrOtdanie = brightWeek || easterOtdanie;
    return (
        <>
            <p id="katekhumen" className="_-ОСНОВНОЙ_Имя-Службы ParaOverride-1">
                <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">
                    I. <br />
                </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                    <a id="_idTextAnchor001" />
                    Литургия оглашаемых
                </span>
            </p>
            {!easterSeason && (
                <>
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
                    </p>
                    {lang === 'default' && (
                        <>
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
                                    Дух Истины, о Ты, везде пребывающий и всё наполняющий, Со­кро­вищ­ница благ и жизни
                                    Податель, при­ди` и вселись в
                                </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    нас, и очи­сти нас от вся­кой скверны, и спа­си, Бла­го́й, ду­ши наши.
                                </span>
                            </p>
                        </>
                    )}
                    {lang === 'ЦСЯ' && (
                        <>
                            <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">О Царь Небесный</span>
                            </p>
                            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    {' '}
                                    Царю Небесный, Утешителю,
                                    <br />
                                    Душе истины, Иже везде сый и вся исполняяй,
                                    <br />
                                    Сокровище благих и жизни Подателю, прииди и вселися в ны,
                                    <br />и очисти ны от всякия скверны, и спаси, Блаже, души наша.
                                </span>
                            </p>
                        </>
                    )}
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
                </>
            )}
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
            {easterSeason && (
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span> Тропарь Пасхи: Христос воскрес из мёртвых, / Смертию
                    смерть поправ // и тем, кто во гробах, Жизнь даровав (трижды)
                </p>
            )}
            {brightOrOtdanie && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span> Тропарь Пасхи: Христос воскрес из мёртвых, /
                        Смертию смерть поправ // и тем, кто во гробах, Жизнь даровав (трижды)
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span> Тропарь Пасхи: Христос воскрес из мёртвых, /
                        Смертию смерть поправ // и тем, кто во гробах, Жизнь даровав. (трижды – здесь и по одному разу
                        после каждого стиха)
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span> Да воccтанет Бог, и pаc­точа́тcя вpаги Его, и да
                        бегут от лица Его ненавидящие Его;
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span> как иcчезает дым, да иcчезнут они, как тает воcк
                        от лица огня,
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">3</span> да сгинут злые пред Божьим лицом, – а
                        пpа­вед­ники да возвеcелятcя!
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4</span> Вот день, что cотвоpил Гоcподь: возликуем,
                        возвеcелимcя о нём!
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Cлава.</span> Христос воскрес…
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">И ныне.</span> Христос воскрес…
                    </p>
                </>
            )}
            <>
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
            </>
            <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-2">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Антифоны изобразительные</span>
                <Tooltip>
                    То есть взятые из службы «Изобразительных» («Типика́»). Ан­тифоны ещё могут быть праздничные и
                    вседневные (будничные); последние даны ниже.
                </Tooltip>
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
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Господи Боже наш, Ты, Чья власть несравне́нна и слава непостижи`ма, Чья милость безмерна и
                            чело
                        </span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            веколюбие несказа́нно, — Ты, Владыка, по Своему благосердию воз­зри на нас и на этот святой
                            дом и яви` Твою неистощимую милость и сострадание Твоё нам и моля´щимся с нами. —
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-4">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ибо Тебе́ подобает вся слава, честь и поклонение, </span>
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
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Господи Боже наш, Егоже держава несказанна и слава непостижима, Егоже милость безмерна и
                            человеколюбие неизреченно. Сам, Владыко, по благоутробию Твоему, призри на ны и на святый
                            храм сей, и сотвори с нами и молящимися с нами, богатыя милости Твоя и щедроты Твоя.
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Яко подобает Тебе всякая слава, честь и поклонение, Отцу, и Сыну, и Святому Духу, ныне и
                            присно, и во веки веков.
                        </span>
                    </p>
                </>
            )}
            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
            </p>

            {antifon1}

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
                    Всесвяту`ю, непоро́чную, преблагослове́нную, слав­ную нашу Вла­ды­чицу Богородицу и Вечноде́ву Ма­рию
                    со все­ми свя­тыми помяну`
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
            {lang === 'default' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Господи Боже наш, спаси народ Твой и благо­слови на­следие Твоё, Церковь Твою в полноте
                            сохрани, освяти лю­бя­щих красоту` дома Твоего! Ты в ответ прославь их Твоей бо­же­ственною
                            си­лой и нас, на­дею­щих­ся на Тебя, не оставь, —
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            ибо Твоя´ власть и Твои` царствие, и сила, и слава,{' '}
                        </span>
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
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Господи Боже наш, спаси люди Твоя и благослови достояние Твое, исполнение Церкве Твоея
                            сохрани, освяти любящия благолепие дому Твоего. Ты тех воспрослави Божественною Твоею силою
                            и не остави нас, уповающих на Тя.
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Яко Твоя держава и Твое есть Царство и сила, и слава, Отца, и Сына, и Святаго Духа, ныне и
                            присно, и во веки веков.
                        </span>
                    </p>
                </>
            )}
            <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
            </p>

            {antifon2}

            <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-2">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу помолимся!</span>
            </p>
            <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [И далее Малая ектения.]</span>
            </p>
            <p id="antifon3" className="_-ОСНОВНОЙ_Имя-части-отст5">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                    Молитва перед пением
                    <br />
                    третьего антифона
                </span>
            </p>
            {lang === 'default' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Ты эти общие и согласные молитвы нам даро­ва́л, Ты и двоим или троим, согласно собравшимся во
                            имя Твоё, просимое подавать обещал, — Ты же и ныне исполни на пользу прошения слуг Твоих:
                            подай нам в нынешнем веке познание Твоей Истины, а в будущем Жизнь вечную дару`й, —
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
                </>
            )}
            {lang === 'ЦСЯ' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Иже общия сия и согласныя даровавый нам молитвы, иже и двема или трем согласующимся о имени
                            Твоем прошения подати обещавый, Сам и ныне раб Твоих прошения к полезному исполни, подая нам
                            и в настоящем веце познание Твоея истины, и в будущем живот вечный даруя.
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            Яко благ и человеколюбец Бог еси, и Тебе славу возсылаем, Отцу, и Сыну, и Святому Духу, ныне
                            и присно, и во веки веков.
                        </span>
                    </p>
                </>
            )}
            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
            </p>

            {antifon3}

            {/* @TODO hide during Sundays and feasts */}
            {!brightOrOtdanie && (
                <>
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
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Сладко Господа благодарить,
                            <br /> имени Твоему, о Вышний, бряца́
                        </span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ть,</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            возвещать поутру` милость Твою,
                            <br /> и верность Твою — в ночи`.
                        </span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Прав Господь, Бог наш,
                            <br /> и неправды нет у Него.
                        </span>
                    </p>
                    <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава.</span>
                    </p>
                    <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
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
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господь&nbsp;— Царь. Его оде</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я´</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние&nbsp;— слава.</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            По хода́тайству святых Твоих, о Спаситель, спаси нас!
                        </span>
                    </p>
                    <p className="_-ПЕТИТ_КРАСН-петит-б-отст">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Припев на каждый стих.)</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господь&nbsp;— Царь. Его оде</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">я´</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            ние&nbsp;— слава,
                            <br /> пояс Его облачения&nbsp;— мощь!{' '}
                        </span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Сто</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и`</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т мир&nbsp;— и</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> не дрогнет.</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-9">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
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
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            благодарно станем пред Ним,
                            <br /> при звуке струн возопии`м Ему!
                        </span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ибо Господь — великий Бог,</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> над всеми богами великий Царь;</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> в руке Его — бездны земли`,</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и высо́ты гор — во власти Его;</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и море Он сотворил,</span>
                    </p>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и сушу извая´ли руки Его.</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    </p>
                </>
            )}
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
            {lang === 'default' && (
                <>
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
                </>
            )}
            {lang === 'ЦСЯ' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Владыко Господи Боже наш, уставивый на небесех чины и воинства Ангел и Архангел в служение
                            Твоея славы, сотвори со входом нашим входу святых Ангелов быти, сослужащих нам, и
                            сославословящих Твою благость.{' '}
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Яко подобает Тебе всякая слава, честь и поклонение, Отцу, и Сыну, и Святому Духу, ныне и
                            присно, и во веки веков.
                        </span>
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
                <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[Д</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, святой вход!</span>
                <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
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
            <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Входная песнь </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">литургии оглашаемых</span>
            </p>
            {vhodnoiStih}

            <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-2">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Далее следуют тропари и кондаки праздника и храма.</span>
            </p>
            {hymns}
            <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-7">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[Д</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
            </p>
            {trisvatoe}
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
            {prokimen}
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
            <div id="firstReading">
                <p id="apostol" className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Чтение Апостола</span>
                    <Tooltip>
                        Чтение приведено по библейскому тексту, чтец должен сам выбрать храмовый вариант прочтения
                        зачала
                    </Tooltip>
                </p>
            </div>
            <div
                className={css`
                    margin: 0 5px;
                `}
            >
                {apostol}
            </div>
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
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                Изначально могла быть обращена к Богу-Отцу (ср.: ПБ Кн.&nbsp;3. 2-е изд. М., 2010.
                                С.&nbsp;125).
                            </span>
                        </>
                    </Tooltip>
                </span>
            </p>
            {lang === 'default' && (
                <>
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
                            устремления плотски`е, мы проводили жизнь духовную, всегда мысля и совершая благоуго́дное
                            Тебе, —
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ведь Ты` просвещение душ и тел наших, </span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Хри­сте</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, и мы` воссылаем славу Те­бе, </span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">
                            вме­сте с Твоим безначальным Отцом и все­свят
                        </span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">ы́</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и благ</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и`</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">м и животвор</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">я´</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">­щим Ду­хом Твоим,</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и все­гда и во ве­ки веков.</span>
                    </p>
                </>
            )}
            {lang === 'ЦСЯ' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Возсияй в сердцах наших человеколюбче Владыко, Твоего Богоразумия нетленный свет, и
                            мысленныя наши отверзи очи, во евангельских Твоих проповеданий разумение: вложи в нас и
                            страх блаженных Твоих заповедей, да плотския похоти вся поправше, духовное жительство
                            пройдем, вся, яже ко благоугождению Твоему, и мудрствующе и деюще.{' '}
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Ты бо еси просвещение душ и телес наших, Христе Боже, и Тебе славу возсылаем, со
                            безначальным Твоим Отцем, и пресвятым и благим и животворящим Твоим Духом, ныне и присно, и
                            во веки веков.
                        </span>
                    </p>
                </>
            )}

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
            {aliluja}
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
                <Tooltip>
                    Чтение приведено по библейскому тексту, чтец должен сам выбрать храмовый вариант прочтения зачала
                </Tooltip>
            </p>
            <div
                className={css`
                    margin: 0 5px;
                `}
            >
                {gospel}
            </div>
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
            {sermons}
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
                    Ещё мы молимся о наших братьях священниках, священ­но­и`ноках, и обо всём во Христе братстве нашем.{' '}
                </span>
            </p>
            <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                    {' '}
                    Ещё мы молимся о блаженных и всегда помина­емых свя­тей­ших православных патриархах, и со­зда­те­лях
                    святого дома сего{' '}
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
                    <Tooltip>
                        Далее могут быть ещё добавлены особые прошения, в т. ч. по специальной просьбе верных, о
                        болящих, по случаю различных бедствий, скорбей и нужд и т. д. Также перед Заупокойной ектениёй
                        могут быть добавлены и соответствующие особые молитвы после дьяконского возгласа "Господу
                        помолимся!"
                    </Tooltip>
                </span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
            </p>
            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о принося´</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                    щих поже́ртвования и де­ла­ющих доброе для этого святого и вседостойного хра­ма, о в нём трудя´щихся,
                    пою­щих и пред­сто­я­щих лю`дях, ожидающих от Тебя великой и неисто­щи­мой милости.
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
            {lang === 'default' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Господи Боже наш, прими это усердное моление от служителей Твоих, и по мно­жеству Твоей
                            милости помилуй нас, и яви` Твоё сострадание к нам и ко всему народу Твоему, ожидающему от
                            Тебя неис­тощи`мой милости, —
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
                </>
            )}

            {lang === 'ЦСЯ' && (
                <>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Господи Боже наш, прилежное сие моление приими от Твоих раб, и помилуй нас по множеству
                            милости Твоея, и щедроты Твоя низпосли на ны и на вся люди Твоя, чающыя от Тебе богатыя
                            милости.
                        </span>
                    </p>
                    <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Яко милостив и человеколюбец Бог еси, и Тебе славу возсылаем, Отцу, и Сыну, и Святому Духу,
                            ныне и присно, и во веки веков.{' '}
                        </span>
                    </p>
                </>
            )}
            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
            </p>
            {/* @TODO: hide on Sundays and feasts */}
            {!brightOrOtdanie && (
                <>
                    {' '}
                    <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">СУГУБАЯ ЗАУПОКОЙНАЯ ЕКТЕНИЯ</span>
                        <Tooltip>
                            Не читается в храмовые (престольные) и двунадесятые праздники и, как правило, в воскресные
                            дни, дни Святок и всей св. Пятидесятницы.
                        </Tooltip>
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
                    <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва об усопших</span>
                    </p>
                    <p className="_-ПЕТИТ_Петит-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Боже ду`хов и всякой пло́ти, Ты смерть попра́л, и дьявола низ­ложи`л, и Жизнь миру Твоему
                            дарова́
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
                            человеколюби`вый Бог прости`, ибо нет человека, который жил бы и не согрешил, ведь один
                            только Ты без греха, праведность Твоя — праведность вечная, и Твоё слово — истина! —
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
                            Христе Боже наш, и мы` вос­сы­лаем славу Тебе, вместе с Твоим безначальным Отцом и
                            всесвяты`м и благи`м и животворя´щим Ду­хом Твоим, ныне и всегда и во веки веков.
                        </span>
                    </p>
                    <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-15">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Н</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    </p>
                </>
            )}
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
            {/* @TODO: спрятать всегда, когда поется "Все вы во Христа крестившиеся", см. по табличке */}
            {!brightWeek && (
                <>
                    <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва об оглашаемых</span>
                    </p>
                    {lang === 'default' && (
                        <>
                            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    {' '}
                                    Господи Боже наш, в вышних обитающий и на до́ль­нее взирающий, ради спасения рода
                                    че­ловеческого пославший Твоего единородного Сына и Бога, Гос­пода нашего Иисуса
                                    Христа, — воззри на рабов Тво­их огла­ша­емых, склони`
                                </span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в­ших пред То­бою свои гла­вы` </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[имена]</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    , и удостой их во время благоприя´тное ку­пели воз­рож­дения, про­щения грехов и
                                    одежды нетления, соедини их с Твоей святой, ка­фо­ли­ческой{' '}
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
                        </>
                    )}
                    {lang === 'ЦСЯ' && (
                        <>
                            <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-11">
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    {' '}
                                    Господи Боже наш, иже на небесех живый и призираяй на вся дела Твоя, призри на рабы
                                    Твоя оглашенныя, приклоньшыя своя выя пред Тобою и даждь им легкий ярем, сотвори их
                                    уды честны святыя Твоея Церкве и сподоби их бани пакибытия, оставления грехов и
                                    одежди нетления, в познание Тебе, истиннаго Бога нашего.
                                </span>
                            </p>
                            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    {' '}
                                    Да и тии с нами славят пречестное и великолепое имя Твое, Отца, и Сына, и Святаго
                                    Духа, ныне и присно, и во веки веков.
                                </span>
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
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                            {' '}
                            Все оглашаемые, изыди`те! Оглашаемые, изы­ди`те! Все оглашаемые, изыди`те!
                        </span>
                        <Tooltip>
                            <>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                    Если присутствуют просвещаемые, то здесь могут быть до­бавлены специальные Ектения и
                                    Молитва о просвещаемых, сохранившиеся в Литургии преждеосвящённых даров (см.: ПБ.
                                    Кн.&nbsp;3. С.&nbsp;95–96).
                                </span>
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
                                    Пусть никто из оглашаемых, никто из тех, чья вера не­твер­да, никто из кающихся,
                                    никто из нечистых
                                </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (т. е. обуреваемых) </span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    не при­бли­жается к святым таинствам. Кто не причащается, да покинет собра­ние!
                                </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (св. Григорий Двоеслов)</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                            </>
                        </Tooltip>
                    </p>
                    <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                            {' '}
                            [Все непричащающиеся с благоговением покидают цер­ковь.]
                        </span>
                    </p>
                </>
            )}
        </>
    );
};

export default Katekhumen;
