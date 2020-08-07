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
                <MdxLoader src="Liturgies/Vernie/Dialog" />
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
                <MdxLoader src="Liturgies/Vernie/Heruvimskaya2" />
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Просительная ектения</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/Prositelnaya" />
                <p id="prinoshenie" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва приношения</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-16">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> По поставлении св. даров на престол:</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/MolitvaPrinosh" />
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
                <MdxLoader src="Liturgies/Vernie/TselovanieMira" />
                <p id="simvol" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Символ веры</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/SimvolVery" />
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
                <MdxLoader src="Liturgies/Vernie/AnaforaVstup" />
                <p id="prefacio" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-17">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Вводная часть</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/AnaforaPrefac" />
                <p id="anamnesis" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-17">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Воспоминание</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/AnaforaAnamnes" />
                <p id="epiclisis" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Призывание</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/AnaforaEpikles" />
                <p id="hodataistvo" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Хода́тайство</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/AnaforaIntercess" />                                                                
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
                <MdxLoader src="Liturgies/Vernie/Zaamvon" />
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
