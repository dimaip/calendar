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
import VariableSection from '../../VariableSection';
import Trisvatoe from './Trisvatoe';
import VhodnoiStih from './VhodnoiStih';
import Reading from './Reading/Reading';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

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
    const reading = <Reading lang={lang} day={day} date={date} />;

    const hymns = (day?.troparions || day?.kondacs) && (
        <SolidSection marginTop={24} marginBottom={24} paddingTop={18} marginHorizontal={-12}>
            <Hymns hymns={(day?.troparions || '') + (day?.kondacs || '')} />
        </SolidSection>
    );

    const aliluja = (
        <VariableSection date={date}>
            <Alilujas day={day} date={date} />
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
                    <MdxLoader src="Liturgies/Katekhumen/Priugotovl" lang={lang} />
                    {!isEasterOffsetRange(0, 48) && lang === 'ru' && (
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
                    {!isEasterOffsetRange(0, 48) && lang === 'csj' && (
                        <>
                            <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">О Царь Небесный</span>
                            </p>
                            <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    {' '}
                                    Царю́ Небе́сный, Уте́шителю,
                                    <br />
                                    Ду́ше и́стины, И́же везде́ сый и вся исполня́яй,
                                    <br />
                                    Сокро́вище благи́х и жи́зни Пода́телю, прииди́ и всели́ся в ны,
                                    <br />и очи́сти ны от вся́кия скве́рны, и спаси́, Бла́же, ду́ши на́ша.
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
            <MdxLoader src="Liturgies/Katekhumen/VelikajaEktenia" lang={lang} />
            <MdxLoader src="Liturgies/Katekhumen/Molitva1" lang={lang} />
            {antifon1}

            <MdxLoader src="Liturgies/Katekhumen/MalajaEktenia" lang={lang} />

            <MdxLoader src="Liturgies/Katekhumen/Molitva2" lang={lang} />
            {antifon2}

            <MdxLoader src="Liturgies/Katekhumen/SnovaSnova" lang={lang} />

            <MdxLoader src="Liturgies/Katekhumen/Molitva3" lang={lang} />
            {antifon3}

            {/* @TODO hide during Sundays and feasts */}
            {!brightOrOtdanie && <MdxLoader src="Liturgies/Katekhumen/AntifonVsednev" lang={lang} />}
            <MdxLoader src="Liturgies/Katekhumen/MalijVhod" lang={lang} />

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

            {reading}

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
            {lang === 'ru' && (
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
            {lang === 'csj' && (
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
                    да даст тебе, бла­го­веству́ю­щему, слово со многой силою для совершения бла­го­ве­стия Своего
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
                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир тебе, благовеству́ющему!</span>
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

            <MdxLoader src="Liturgies/Katekhumen/SugubajaEktenia" lang={lang} />

            <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                    Молитва при усердном <br />
                </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">сугубом</span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> молении</span>
            </p>
            {lang === 'ru' && (
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

            {lang === 'csj' && (
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
                            Боже ду́хов и всякой пло́ти, Ты смерть попра́л, и дьявола низ­ложи`л, и Жизнь миру Твоему
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
                    <MdxLoader src="Liturgies/Katekhumen/Oglashaemie" />

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
