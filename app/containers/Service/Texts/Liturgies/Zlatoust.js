import React from 'react';
import { css } from 'emotion';
import Tooltip from 'components/Tooltip/Tooltip';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Blagodarenie from './Vernie/Blagodarenie/index.mdx';

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
                <MdxLoader src="Liturgies/Vernie/AnaforaIntercess" zadastoinik={zadastoinik} />
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-19">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">5</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Приготовление ко причащению</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/DaBudut" />
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Просительная Ектения
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед Молитвой Господней)</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/Prositelnaya2" />
                <p id="ourfather" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва перед причащением</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/MolitvaAfterPrich" />
                <MdxLoader src="Liturgies/Vernie/Otche" />
                <MdxLoader src="Liturgies/Vernie/MirVsem2" />
                <p id="glavopriklon" className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва главопреклонная</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/MolitvaGlav" />
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
                <MdxLoader src="Liturgies/Vernie/MolitvaBeforeVosn" />
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
                <MdxLoader src="Liturgies/Vernie/MolitvaBeforeDary" />
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-18">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Причащение в алтаре</span>
                </p>
                {prichasten}
                <MdxLoader src="Liturgies/Vernie/PrichAltar" />
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-20">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Причащение народа в храме</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/PrichPeople" />
                {brightWeek && <MdxLoader src="Shared/EasterTroparion" />}
                {!brightWeek && <MdxLoader src="Liturgies/Vernie/PrichStihPeople" />}
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-20">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">После причащения</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/AfterPrich" />
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <Blagodarenie easterSeason={easterSeason} isEasterOffsetRange={isEasterOffsetRange} dayOfWeek={dayOfWeek} brightWeek={brightWeek}/>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ектения</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/EkteniaAftPric" />
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва благодарственная
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(после причащения всех)</span>
                </p>
                <MdxLoader src="Liturgies/Vernie/MolitvaBlag" />
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
                <MdxLoader src="Liturgies/Vernie/Sosudohran" />
                {brightWeek && (
                    <MdxLoader src="Shared/EasterTroparion" />
                    )}
                {!brightWeek && (
                    <MdxLoader src="Liturgies/Vernie/DaBudetImja" />
                )}
                <MdxLoader src="Liturgies/Vernie/Psalom33" />
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Бла­го­словляя народ на уход, возможно, после об­щей трапезы:
                    </span>
                </p>
                <MdxLoader src="Liturgies/Vernie/OkBlag" />
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
                            <>Христос воскрес из мёртвых, Смертию смерть поправ и тем, кто во гробах, Жизнь дарова́в.</>
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
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и тем, кто во гробах, Жизнь дарова́в.</span>
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
                <MdxLoader src="Liturgies/Vernie/Mnogoletie" />
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
