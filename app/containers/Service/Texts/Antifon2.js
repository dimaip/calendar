import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

const Antifon2Easter = () => (
    <>
        <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Второй антифон, глас 2</span>
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span> Бог да помилует нас, да благословит.
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Припев</span> Спаси нас, Сын Божий, воскресший из мёртвых, / поющих
            Тебе: Аллилуйя.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span> Бог да помилует нас, да благословит, да обратит на нас
            светлый Свой взор!
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Припев</span> Спаси нас, Сын Божий, воскресший из мёртвых, / поющих
            Тебе: Аллилуйя.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">3</span> Тогда путь Твой ведом будет на земле, и все страны увидят
            спасение Твоё.
            <br /> Припев: Спаси нас, Сын Божий, воскресший из мёртвых, / поющих Тебе: Аллилуйя.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4</span> Да восхвалят народы, Тебя, Боже! Все народы да восхвалят
            Тебя!
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Припев</span> Спаси нас, Сын Божий, воскресший из мёртвых, / поющих
            Тебе: Аллилуйя.
        </p>
    </>
);

const Antifon2Sunday = ({ lang }) => (
    <>
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
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Хвали Господа, душа моя!</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Восхвалю` Господа, доко́ле живу;
                        <br /> буду петь пред Богом моим,
                        <br /> поку`да есмь.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Не надейтеся на вельмож,
                        <br /> на Адамова сына — в нём спасения нет:
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        выйдет дух его, он вернётся в землю свою,
                        <br /> в тот день погибнут все замыслы его.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Бла́го тому, кому в помощь Иакова Бог,
                        <br /> чья надежда — на Господа, на Бога своего,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        на Того, Чьё творение — небеса и земля,
                        <br /> и море, и всё, что в них,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Кто хранит верность вовек,
                        <br /> для утесняемых вершит суд,
                        <br /> а́лчущим подаёт хлеб; <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господь выводит узников на свет,
                        <br /> Господь отверзает очи слепцам,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господь выпрямляет тех, кто согбе́н,
                        <br /> Господь праведным благоволи`т,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Господь пришельцев хранит,
                        <br /> помогает сироте́ и вдове,
                        <br /> но искриви`т неправедных путь.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> воплотитися от Святыя Богородицы и Приснодевы Марии,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> непреложно вочеловечивыйся,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> распныйся же, Христе Боже, смертию смерть поправый,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Един Сый Святыя Троицы,</span>
                    <span className="_--КРАСНЫЙ">//</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> спрославляемый Отцу и Святому Духу, спаси нас.</span>
                </p>
            </>
        )}
    </>
);

const Antifon2 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <Antifon2Easter />;
    }

    return <Antifon2Sunday lang={lang} />;
};

export default Antifon2;
