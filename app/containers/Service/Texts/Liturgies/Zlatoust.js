import React from 'react';
import { css } from 'emotion';
import Tooltip from 'components/Tooltip/Tooltip';
import MdxLoader from 'containers/Service/Texts/MdxLoader';

import useLiturgy from './Vernie/useLiturgy';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';
import { Link } from 'react-router-dom';

const Zlatoust = ({ lang, date }) => {
    const { katekhumen, otpust, prichasten, saints, zadastoinik } = useLiturgy(lang, 'zlatoust');
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();

    const isEasterOffsetRange = makeIsEasterOffsetRange(date);
    const brightWeek = isEasterOffsetRange(0, 6);
    const easterSeason = isEasterOffsetRange(0, 38);
    const easterOtdanie = isEasterOffsetRange(38);
    return (
        <div
            className={css`
                margin-bottom: 24px;
            `}
        >
            <p className="_-ОСНОВНОЙ_Имя-Службы" id="nachalo">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Божественная литургия Иоанна Златоуста</span>
            </p>
            <div id="_idContainer003" className="_idGenObjectStyleOverride-1">
                {katekhumen}

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
                <MdxLoader src="Liturgies/Vernie/Priugotovlenie" />
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва первая
                        <Tooltip>
                            <>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                    Древнее надписание: «После распростертия илитона» (возможно, с ан­ти­минсом).
                                </span>
                            </>
                        </Tooltip>
                    </span>
                </p>
           <MdxLoader src="Liturgies/Vernie/Molitva1" />
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Великая ектения <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(сокращённая)</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/SokrEktenia" />
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва вторая</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/Molitva2" />
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Дьякон (или предстоятель) совершает малое каждение с чте­нием Пс{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">50</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва предстоятеля о себе
                        <Tooltip>
                            <>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Вставка из Литургии св. Василия Великого.</span>
                            </>
                        </Tooltip>
                    </span>
                </p>
                <MdxLoader src="Liturgies/Vernie/MolitvaOSebe" />
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
                <MdxLoader src="Liturgies/Vernie/Heruvimskaya" />
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
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Проскомидийные поминовения</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/ProskPomin" />
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> 2-я часть Херувим­ской песни:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Дабы приня´ть нам Царя всего сущего… </span>
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
                        Безболезненной, не­по­стыд­ной, мирной христианской кон­­чины нашей жизни и доброго ответа пред Христом на Страш­ном Суде испросим.
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
                        <Tooltip>На Руси читалась до сер. ХVII в. Изначально могла быть обращена к Богу-Отцу.</Tooltip>
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
                        Боже наш, Созидатель люб­ви и благ Податель, дай и нам, чадам Твоим, любить друг друга, как возлюбил нас Ты, дабы,
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
                        <Tooltip>
                            <>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Далее в тексте Служебника вставки:</span>
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
                            </>
                        </Tooltip>
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
                    <Tooltip>
                        <>
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
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> После преподания любви и мира:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Двери, двери!</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                «Дьяконы пусть стоят при дверях… чтобы во время возношения никто не выходил и чтобы не
                                отворялась дверь, хотя бы пришёл и верующий» (Апостольские постанов­ления. 8. 11).
                            </span>
                        </>
                    </Tooltip>
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
                <MdxLoader src="Liturgies/Vernie/SimvolVery" />
                {lang === 'csj' && (
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
                    </>
                )}
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
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Св. возношение (ана́фора)</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                Раздел (4) — Евхаристический кано́н. Он со­стоит из вступ­ления и четы­рех основных
                                частей: префа́цио (вводная часть), ана́мнесис (воспо­ми­нание), эпи`клесис (при­зывание) и
                                ин­тер­це́ссио (хода́тай­ство).
                            </span>
                        </>
                    </Tooltip>
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
                        <Tooltip>
                            <>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Далее в тексте Служебника вставка: </span>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    покло­няться Отцу и Сыну и Святому Духу, Троице еди­носущной и нераз­дельной.
                                </span>
                            </>
                        </Tooltip>
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
                        (т. е. ли­тургию)
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
                        «Пейте из неё все, это кровь Моя, кровь Нового За­­вета, за вас и за многих изливаемая ради про­ще­ния гре­хов».
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
                    <Tooltip>
                        <>
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
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Тебя´ воспеваем, Тебя благословляем, Тебя бла­го­да­рим, Господи, и молимся Тебе, Боже наш!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        (На­род вто­рит.)
                        <Tooltip>
                            <>
                                <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                    В церковнославянском тексте Служебника далее следует вставка: тропарь Третьего часа,
                                    со стихами (см.: ПБ. Кн.&nbsp;1. 3-е изд. М., 2015. С. 214, а также: ПБ. Кн.&nbsp;7.
                                    M., 2010 С.&nbsp;35).
                                </span>
                            </>
                        </Tooltip>
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
                {zadastoinik}
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
                    <MdxLoader src="Liturgies/Vernie/Otche" />
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
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Эта молитва, вероятно, когда-то служила отпустом для непричащающихся верных (см.: Taft
                                R. The Precommunion Rites. Roma, 2000. P. 193).
                            </span>
                        </>
                    </Tooltip>
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
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В тексте Служебника далее вставка: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и со славного пре­стола царствия Своего</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-8">.</span>
                        </>
                    </Tooltip>
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
                        <Tooltip>
                            <>
                                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                    Далее по обычаю предстоятель просит у всех прощения и тихо молится:
                                </span>
                                <p className="_-ПЕТИТ_Петит-б-отст">
                                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">П</span>
                                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                        {' '}
                                        Отпусти, оставь, прости, Боже, наши вольные и невольные согре­ше­ния, соделанные
                                        словом и делом, в ве́дении и неве́дении, днём и в ночи`, во уме и разумении, — всё
                                        нам прости, по Своей благости и человеколюбию!
                                    </span>
                                </p>
                            </>
                        </Tooltip>
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
                        Верую, Господи, и ис­по­ве­дую, что Ты — по­ис­ти­не Христос, Сын Бога жи­во­го, пришедший в мир грешников спасти, первый из ко­то­рых — я. Ещё
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
                {prichasten}
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
                        при­сту­­пи`те!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Медленно:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>

                    {brightWeek && (
                        <span>
                            {' '}
                            Христос воскрес из мёртвых, Смертию смерть поправ и тем, кто во гробах, Жизнь дарова́в
                        </span>
                    )}
                    {!brightWeek && (
                        <>
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
                        </>
                    )}
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
                {prichasten}
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
                    {easterSeason && (
                        <span>
                            {' '}
                            Христос воскрес из мёртвых, Смертию смерть поправ и тем, кто во гробах, Жизнь дарова́в
                        </span>
                    )}
                    {!easterSeason && !(isEasterOffsetRange(39, 47) && dayOfWeek !== 0) && (
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Мы узре́ли Свет истинный, <br /> при`няли Духа Небесно­го, <br />
                                обрели мы веру истинную, <br />
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                поклоняясь неразде­ль­ной Троице, <br /> ибо Она спасла нас
                            </span>
                        </>
                    )}
                    {isEasterOffsetRange(39, 47) && dayOfWeek !== 0 && (
                        <>
                            {' '}
                            Тропарь Вознесения Господня, глас 4
                            <br />
                            Вознёсся во славе Ты, Христе Боже наш, <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span> и
                            радость подарил ученикам, <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span> обещав им Святого
                            Духа, <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span> когда они через Твоё благословение
                            уверились, <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">//</span> что Ты - Сын Божий, Искупитель
                            мира.
                        </>
                    )}
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
                    {brightWeek && (
                        <span>
                            {' '}
                            Христос воскрес из мёртвых, Смертию смерть поправ и тем, кто во гробах, Жизнь дарова́в
                        </span>
                    )}
                    {!brightWeek && (
                        <>
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
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аллилуия, аллилуия, аллилуия.</span>
                        </>
                    )}
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Станем благогове́йно! Причастившись божест­вен­­ным, святым, непорочным, бессмертным, не­бесным и жи­во­тво­рящим, страшным Христовым
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
                        Ты исполнил весь замысел{' '}
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
                    {brightWeek && (
                        <span>
                            {' '}
                            Христос воскрес из мёртвых, Смертию смерть поправ и тем, кто во гробах, Жизнь дарова́в
                        </span>
                    )}
                    {!brightWeek && (
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                                {' '}
                                Да будет имя Господне благословенно — отныне и до века!{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Трижды.)</span>
                        </>
                    )}
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
                {/* @TODO: убрать сноску и вместо нее сделать алгоритм */}
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span>
                        {!(brightWeek || easterOtdanie) && (
                            <>
                                Слава Тебе, Христе Боже, Надежда наша, слава <br />
                                Те­бе!
                            </>
                        )}
                        {(brightWeek || easterOtdanie) && (
                            <>Христос воскрес из мёртвых, Смертию смерть поправ и тем, кто во гробах, Жизнь дарова́в</>
                        )}
                    </span>
                    <Tooltip>
                        <>
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
                        </>
                    </Tooltip>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. Бла­го­слови!</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> От Фоминой недели до отдания Пасхи поётся </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Христос воскрес </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды).</span>
                        </>
                    </Tooltip>
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
                {otpust}
                {saints}
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
                        господина на­шего преосвященнейшего
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
                <p className="">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Священник в алтаре читает{' '}
                        <Link
                            className={css`
                                text-decoration: underline;
                            `}
                            to={`/date/${date}/service/blagodarstvennie`}
                        >
                            Благодарственные молитвы
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Zlatoust;
