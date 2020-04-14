import React from 'react';
import './Shared.css';
import './Lpod.css';
import { useParams } from 'react-router-dom';
import forEach from 'lodash.foreach';
import useDay from 'hooks/useDay';
import ReadingItem from 'containers/Readings/ReadingItem';
import { css } from 'emotion';
import Tooltip from 'components/Tooltip/Tooltip';
import useScrollToReadings from './useScrollToReadings';

const Readings = ({ readings }) => (
    <>
        {readings
            .map(({ readingVerse, type }) =>
                readingVerse ? <ReadingItem key={readingVerse} readingVerse={readingVerse} type={type} /> : null
            )
            .filter(Boolean)}
    </>
);

const Lpod = ({ lang }) => {
    const { date } = useParams();
    const { data: day } = useDay(date);
    useScrollToReadings();

    const readings = day?.readings;
    const readingsForService = readings?.['Вечерня'];

    const readingVersesWithType = [];
    forEach(readingsForService, (readingVerses, type) => {
        readingVerses.forEach(readingVerse => {
            readingVersesWithType.push({
                readingVerse,
                type,
            });
        });
    });
    const firstReading = readingVersesWithType[0] && (
        <div className={css``}>
            <Readings readings={[readingVersesWithType[0]]} />
        </div>
    );
    const secondReading = readingVersesWithType[1] && <Readings readings={[readingVersesWithType[1]]} />;

    return (
        <div>
            <div id="_idContainer004" className="_idGenObjectStyleOverride-1">
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Входные молитвы читаются, как на Литургии св. Иоанна Златоуста, только вместо молитвы
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, простри Твою руку </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">читают молитву:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        О Господь, посылающий Слово Своё и исцеляющий раны душевные и телесные, простри и ко мне руку
                        помощи на это служение и скажи мне, расслабленному греховной немо­щью: «Я – спасение твоё,
                        отпускаются тебе грехи твои». Аминь.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Далее священнослужители облачаются в священные одежды, делая знамение Креста, целуя их и
                        произнося над каждой:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-Службы">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor001" />
                        I.
                        <br />
                        ВЕЛИКОПОСТНАЯ ВЕЧЕРНЯ
                    </span>
                </p>
                <p id="priugotovlenie" className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(1) Приуготовление</span>
                </p>
                <p className="_-ПЕТИТ_Петит-б-отст">
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
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Приди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те, покло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нимся <br /> Царю нашему Богу!
                        <br />
                        Приди
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те, покло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нимся и припадём ко Христу – <br /> Ца­рю нашему Богу!
                        <br />
                        Приди
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те, покло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нимся и припадём <br /> к Самому Хри­сту – <br /> Царю и Богу нашему!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Псалом 103, предначинательный</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благослови Господа, душа моя!
                        <br /> Господи, Боже мой, Ты весьма вели
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        к,
                        <br /> славою и блистанием облечён.
                        <br />
                        Ты облачаешься, словно в ризу, во свет,
                        <br /> Ты раскидываешь, словно шатёр, небеса;
                        <br />
                        Ты над вода
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми возвышаешь черто</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ги Твои,
                        <br /> делаешь о
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        блак колесницею Твоей,
                        <br />
                        шествуешь по ветровы
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м крыла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м,
                        <br /> ве
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тры вестниками Твоими творишь,
                        <br /> слу
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">гами Твоими – пламена</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> огня.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        На устоях землю Ты утвердил,
                        <br /> не поколеблется она в век и век;
                        <br />
                        как ризою, бездну Ты облачил.
                        <br /> Воды стояли на гора
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        х –<br />
                        от укора Твоего побежали они,
                        <br /> убоялись гласа грома Твоего,
                        <br />
                        спустились с гор, стекли
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        в дол,
                        <br /> на место, что назначил им Ты.
                        <br />
                        Положи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        л Ты им предел,
                        <br /> которого им не прейти
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ,<br /> сы
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">знова не разлиться им по земле.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В до</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        лах дал Ты место родникам,
                        <br /> меж гора
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми стру</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и текут,
                        <br />
                        по
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ят всех звере</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й полевы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        х,
                        <br /> она
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        гры утоляют жажду свою;
                        <br />
                        по
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        дле струй обитают птицы небес,
                        <br /> голос подают проме
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">жду ветве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й.
                        <br />
                        Напояешь Ты горы с высот Твоих,
                        <br /> от плодов дел Твоих насыщается земля.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Расти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">шь Ты для скотов траву</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> и на потре
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        бу человеку – злак,
                        <br />и хлеб изводишь из недр земли,
                        <br /> и вино, что сердца
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> людей весели</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        т,
                        <br />
                        больше, чем елей нама
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        слит лик,
                        <br /> и хлеб укрепляет сердца
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> людей.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Насыщаются Господни дерева</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ,<br /> кедры ливанские, что Ты насадил;
                        <br />
                        птицы гнездя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тся там,
                        <br /> и аисту кипари
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        с – жилище его;
                        <br />
                        козеро
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">гам – высо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ты гор,
                        <br /> ущелья – убежища барсука
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И луну сотворил Ты, ме</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ту времён,
                        <br /> и солнце, что знает свой закат;
                        <br />
                        Ты простираешь тьму, и бывает ночь,
                        <br /> и пробуждаются все звери лесов, –<br />
                        ры
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">кают львята о пожи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ве своей,
                        <br /> у Господа просят сне
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ди себе;
                        <br />
                        взойдёт солнце – идут они вспять,
                        <br /> по ло
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        говам расходятся своим;
                        <br />
                        выходит человек на труды свои,
                        <br /> до вечера на служение своё.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Велики</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , о, Господи, труды Твои,
                        <br /> всё с премудростию Ты сотворил,
                        <br />и полна
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        земля творений Твоих!
                        <br /> Вот море, без меры велико
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ,<br />и в нём живности без числа,
                        <br /> малые твари при больши
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        х;
                        <br />
                        там плывут суда, и там же – змий,
                        <br /> Тобою сотворённый, чтоб играть с ним.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Все они уповают на Тебя,
                        <br /> что Ты во благовре
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мение дашь им снедь;
                        <br />и Ты отверзаешь руку Твою
                        <br /> и всякое животное по
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        лнишь благ.
                        <br />
                        Сокроешь лик Твой – ужасну
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тся они,
                        <br /> отнимешь у них дух, и они умрут
                        <br /> и снова возвратятся во прах.
                        <br />
                        Дохнёшь ли на них – и восстанут они,
                        <br /> и Ты лицо земли обновишь.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Да будет слава Господня вовек,
                        <br /> да возрадуется Господь о делах Своих!
                        <br />
                        Он воззри
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        т на землю – и дрогнет она,
                        <br /> Он коснётся гор – и дымятся они.
                        <br />
                        Воспою Господу во все дни жизни моей,
                        <br /> пою Богу моему, пока я есмь.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Да будет угодна Ему песнь моя –<br /> а моя радость вся о Нём!
                        <br />
                        Да исчезнут грешники от земли,
                        <br /> чтобы словно не бывало злых!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови Господа, душа моя!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Аллилуия, аллилуия, аллилуия, <br /> сла­ва Тебе, Боже{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(триж­ды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Великая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В мире Господу помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О мире свыше и спасении наших душ Господу по­мо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О мире всего мира, об укреплении святых Бо­жьих цер­кве</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й и единении всех Господу помо­лим­ся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об этом святом доме и обо всех, с верою, бла­го­гове</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ни­ем и стра­хом Божьим входящих в него, Го­споду по­мо­лимся.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О великом господине и отце нашем свя­тейшем патриархе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">и о господине нашем пре­освя­ще</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ-петит">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">н­ней­шем митрополите </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> архи­епископе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> епи­ско­пе) </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, почтенном пре­сви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тер­стве, во Хри­сте дья­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">кон­стве, обо всём клире и на­роде </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Божьем</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Го­спо­ду по­мо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О нашей богохрани</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мой стране </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, обо всём на­ро­де и властя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х её Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об этом граде </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> об этом селе </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя), или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> об этой святой обите­ли</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и обо всех городах и стра­нах и верою жи­ву­щих в них Господу помолимся.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О благоприятной погоде, об изобилии плодов зем­ли и мирных вре­мена
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х Господу помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        О плавающих, путешествующих, болящих, стра­ж­ду­щих, пленённых,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">за правду го­нимых и за­клю­чённых,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и спа­се­нии их Го­споду помо­лимся.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Об избавле</span>
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Бо­же, Тво­ею бла­годатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дадим </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(2) Предвечерние антифоны</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва (1)
                        <br />
                        ПЕРЕД ЧТЕНИЕМ ПЕРВОГО АНТИФОНА
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи, сострадающий и милующий,
                        <br /> долготерпеливый и многоми
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        лостивый, <br />
                        услышь нашу молитву,
                        <br /> и вне
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мли гласу моления нашего,
                        <br /> и ко благу зна
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мение нам яви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        :<br />
                        направь нас на путь Твой,
                        <br /> дабы ходить нам в истине Твоей,
                        <br />
                        возвесели сердца
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> наши,</span>
                    <br /> дабы чтить нам святое имя Твоё,&nbsp;
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    {' '}
                    ибо велик Ты<span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span> и творишь чудеса,{' '}
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">один Ты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        &nbsp;– Бог,
                        <br /> и нет между богами подобного Тебе, Господи,
                        <br />
                        Ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> си</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        лен в милости и благ в крепости,
                        <br /> чтобы помогать, и утешать, и спасать
                        <br /> всех надеющихся на святое имя{' '}
                    </span>
                    Твоё,&nbsp;<span className="CharOverride-1">–</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1">
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">бо Тебе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        подобает вся слава, честь и поклонение,
                        <br />
                    </span>{' '}
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span> <br />
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ"> Чтение первого антифона</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (первой славы, или статьи) </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ">18-й кафизмы</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Пс &nbsp;119–123)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В это время </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        [раскрывается антиминс, приносится на престол дискос,]
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        совершается поклонение, агнец перекладывается на дискос и покрывается, далее следует его
                        каждение и снова совер­шается поклонение.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу по­мо­лимся!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [И далее Малая ектения.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва (2)
                        <br />
                        ПЕРЕД ЧТЕНИЕМ ВТОРОГО АНТИФОНА
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи, не обличай нас в ярости Твоей <br /> и не карай нас во гневе Твоём, <br /> но яви нам
                        снисхождение Твоё! <br />
                        Врач и Целитель душ наших, <br /> направь нас в тихую гавань, что угодна Тебе, <br />и просвети
                        очи сердец наших
                        <br /> для познания Твоей Истины,
                        <br />и дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й нам остальное время нынешнего дня,
                        <br /> как и всё время нашей жизни,
                        <br /> мирным и безгрешным,
                        <br />
                        по хода
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тайству святой Богородицы
                        <br /> и всех святых{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо Твоя власть и Твои царствие, и сила, и слава,
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        <br /> ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ"> Чтение второго антифона</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Пс 124–128)</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        [При этом совершается поклонение, каждение со свечой трижды вокруг престола и снова –
                        поклонение.]
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу по­мо­лимся!</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [И далее Малая ектения.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва (3)
                        <br />
                        ПЕРЕД ЧТЕНИЕМ ТРЕТЬЕГО АНТИФОНА
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи Боже наш,
                        <br />
                        воспо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни нас, грешных и негодных слуг Твоих,
                        <br /> когда мы призываем святое имя Твоё, <br />и не посрами
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        надежд наших на милость Твою,
                        <br /> но дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й нам, Господи, всё просимое <br /> для спасения
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-3">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br />и помоги нам любить и бояться Тебя
                        <br /> от всего нашего се
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        рдца
                        <br /> и исполнять во всём волю Твою, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо Ты благой и человеколюбивый Бог <br /> и мы воссылаем славу Тебе,
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        <br /> ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ">Чтение третьего антифона</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Пс 129–133)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В это время совершается три поклона, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        [весь народ простирается ниц, агнец переносится на жертвенник,]
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        далее следует приготовление чаши, покрытие, каж­дение, свеча ставится перед дарами, снова
                        совершается поклонение,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[складывается антиминс]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Снова и снова в мире Господу по­мо­лимся!</span>
                    <Tooltip>Молитвы (4)–(7) в случае необходимости могут быть опущены.</Tooltip>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [И далее Малая ектения.]</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва (4)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> В несмолка</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        емых песнопениях <br /> и непрестанных славословиях
                        <br /> Тебя воспевают святые Воинства, – <br />
                        исполни же и наши уста хвалою Тебе,
                        <br /> дабы нам величать святое имя Твоё;
                        <br />и дай нам долю в наследии
                        <br /> со всеми истинно чтущими Тебя
                        <br /> и исполняющими заповеди Твои,
                        <br />
                        по хода
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тайству святой Богородицы
                        <br /> и всех святых Твоих, –
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо Тебе подобает вся слава, честь и поклонение,
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва (5)</span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                Употреблялась до сер. XVII в., а на Украине&nbsp;– до XVIII в. (см.:&nbsp;Арранц&nbsp;М.{' '}
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КУРСИВ">Как молились Богу древ­ние византийцы. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">С. 4</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4–4</span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">5, 48).</span>
                        </>
                    </Tooltip>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен Ты, Господи, Бог всемогу</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        щий, <br /> ведь знаешь Ты разум человеческий <br />и понимаешь наши нужды лучше, чем мы, <br />{' '}
                        когда о них просим или размышляем,&nbsp;– <br />
                        удостой же нас, по обилию благосердия Твоего,
                        <br /> о Царь человеколюбивый и благо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й во всём,
                        <br /> с непостыдной совестью призвать святое имя Твоё; <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и не введи нас во искушение, <br /> но избавь нас от лукавого; <br /> и всё устрой нам на
                        пользу.&nbsp;–
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Ибо Тебе подобает вся слава, честь и&nbsp;поклонение,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">От­цу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва (6)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи, Господи!
                        <br /> всё держа
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        щий в Своей непорочной руке,
                        <br />
                        Ты долготерпели
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        в ко всем нам,
                        <br /> и сожалеешь о бедствиях наших,
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и удаляешь от нас беззакония наши,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        –<br />
                        воспо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мни же милость Твою и сострадание
                        <br /> и Твоей благостью посети нас,
                        <br />и дай нам
                    </span>
                    <Tooltip>
                        <>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В церковнославянском тексте далее вставка:</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> по благодати Твоей.</span>
                        </>
                    </Tooltip>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        в остальное время нынешнего дня <br /> избежать различных ко
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        зней лукавого,
                        <br />и нашу жизнь сохрани невредимой
                        <br /> благодатью Святого Духа Твоего, –
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        по милости и человеколюбию единородного Сына Твоего,
                        <br /> с Которым Ты благословен,
                        <br /> вместе со всесвяты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м<br /> и животворя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        щим Твоим Духом,
                        <br /> ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва (7)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Боже великий и дивный,
                        <br /> с неизъяснимой благостью и неистощимой заботой
                        <br /> устраивающий жизнь человеческую,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Т</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ы и земные бла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">га нам дарова</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        л,
                        <br /> и прежде ниспо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">сланными бла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        гами
                        <br /> Царству обе
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щанному нас обручи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        л.
                        <br />
                        Ты дал нам в прошедшую часть{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нынешнего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        дня
                        <br /> уклониться от всякого зла –<br />
                        дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й же нам и оставшуюся провести безупречно
                        <br /> пред лицом святой Славы Твоей,
                        <br />
                        воспевая Тебя, одного благо
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        го
                        <br /> и человеколюбивого Бога нашего, –
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо Ты Бог наш
                        <br /> и мы воссылаем славу Тебе,
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Снова и снова в мире</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва (8) перед «Господи, взываю»</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вечером, как и поутру</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и в полдень,
                        <br /> мы восхваляем, благословляем, благодарим
                        <br />и просим Тебя, Владыка всего:
                        <br /> вознеси нашу молитву,
                        <br /> словно фимиа
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м, пред лицо Твоё;
                        <br />и не дай склониться сердцам нашим
                        <br /> к словам или мыслям лукавым,
                        <br />
                        но избавь нас ото всех уловля
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ющих души наши.
                        <br />К Тебе, Господи, Господи, очи наши,
                        <br /> на Тебя надеемся –<br /> так не посрами
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> нас, Боже наш! –</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Ибо Тебе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> подобает вся слава, честь и поклонение,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        <br /> ныне и всегда и во веки веков.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-6">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor002" />
                        Вечерние псалмы
                        <br />
                        (П
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">с&nbsp;140–141, 129, 116</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Господи, взываю к Тебе, услышь меня!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Услышь меня, Господи!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(П</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">с&nbsp;140</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи, взываю к Тебе, услышь меня,
                        <br /> вне
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мли гла­су моления моего, <br /> когда взываю к Тебе.
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Услышь меня, Господи!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн _idGenCharOverride-1">2 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Да возносится молитва моя, словно фимиа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м, <br />
                        пред лицо Твоё,
                        <br /> воздея
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ние рук моих&nbsp;– как жертва ве­черняя.
                        <br />{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Услышь меня, Господи!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н или Ч </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Положи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , Господи, охрану устам моим, <br /> и огради двери губ моих; <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        не дай склониться сердцу моему к словам лукавым
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        для оправдания дел греховных <br />
                        вместе с людьми, делающими беззаконие, <br /> и да не вкушу
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> я от сласте</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й их. <br />
                        Пусть вразумляет меня праведник&nbsp;– это милость, <br /> пусть обличает меня&nbsp;– это лучший
                        елей, <br />
                        который не повредит главе моей; <br /> но мольбы
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        мои против злодейств их. <br />
                        Вожди их рассыпались по утёсам, <br /> и слышат, что слова
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> мои кро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тки. </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br />
                        Как будто зе
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">млю рассекают и дробя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        т нас, <br /> сыплются кости наши в челюсти преисподней. <br />
                        Но к Тебе, Господи, Господи, очи мои, <br /> на Тебя надеюсь, не отыми
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        души моей! <br />
                        Сохрани меня от силко
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        в, поставленных на меня, <br /> от тенёт беззаконников.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br />
                        Падут нечестивые в сети свои, <br /> а я их избегну.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(П</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">с&nbsp;141:1-6</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Гласом моим ко Господу воззвал я, <br /> гласом моим ко Господу помолился; <br />
                        излил пред Ним моление моё,
                        <br /> печаль мою открыл Ему. <br />
                        Когда изнемогал во мне дух мой, <br /> Ты знал стезю
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        мою. <br />
                        На пути, которым ходил я, <br /> они скрытно поставили сети для меня. <br />
                        Смотрю на правую сторону&nbsp;– и вижу, <br /> что никто не признаёт меня: <br />
                        не стало для меня убежища,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> никто не заботится о душе моей. <br />Я воззвал к Тебе, Господи, <br /> я сказал:
                        «Ты&nbsp;– прибежище моё
                        <br /> и удел мой на земле живых». <br />
                        Вне
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мли воплю моему, <br /> ибо я изнемог весьма; <br />
                        избавь меня от гонителей моих, <br /> ибо они сильнее меня.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Далее к стихам псалмов добавляется пение или чтение до 8–10 стихир на «Господи, взываю» и
                        совер­шается полное каж­дение храма.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(П</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">с 141:7</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">а </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">0</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Выведи из темни</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        цы душу мою,
                        <br /> дабы мне прославить имя Твоё. <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">2 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Вокруг меня соберутся праведные,
                        <br /> когда Ты я
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вишь мне благодея</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(П</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">с&nbsp;129</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">На 8</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Из глубины взываю к Тебе, Господи. <br /> Господи! ус­лы
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ши глас мой. <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">2 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Да будут уши Твои внимательны <br /> ко гласу молений моих.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">На 6</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Если Ты, Господи, будешь замечать беззакония,&nbsp;– <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи! кто устоит? <br />
                        Но у Тебя прощение, <br /> да благогове
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ют пред Тобою. <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">2 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Надеюсь на Господа, надеется душа моя; <br /> на слово Его уповаю.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">На 4</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Душа моя ожидает Господа <br /> более, не
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">жели стражи&nbsp;– у</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тра, <br /> более, не
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">жели стражи&nbsp;– у</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тра. <br />
                        Да уповает Изра
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        иль на Господа, <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">2 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        ибо у Господа милость <br /> и многое у Него избавление,
                        <br />и Он избавит Изра
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        иля <br /> от всех беззаконий его.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(П</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">с</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">&nbsp;116)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Хвали</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        те Господа, народы все,
                        <br /> славьте Его, все племена; <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-4">2 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ибо крепка</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        над нами милость Его, <br /> и верность Господня стои
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">т вовек.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-8">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> И ныне. Богородичен.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(3) Вход</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Вход (на закате солнца) – со светильником, ка­дилом [и Священным писанием].
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Благослови, владыка, святой вход!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен вход </span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Все продвигаются вперёд.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Показывая народу Священное писание:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премуд­рость! Станем благоговейно!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Вечерняя (входная) песнь
                        <br />
                        «при возжжении светильника»
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ясный Свет святой Славы бессмертного Отца Не­бес­ного,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святого и блаженного, Иисусе Хри­сте,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/ </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">при­дя к закату солнца, увидев свет вечер­ний,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> мы воспеваем Бога&nbsp;– Отца, и Сына, и Свя­того Духа.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> До­стоин Ты быть во все времена</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> вос­пе­тым гла­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">сами святыми,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/ </span>о Сын Божий
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, дающий Жизнь,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСН-ДаблСлэш">//</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> потому мир Тебя и славит!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(4) Чтения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-6">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вне</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">млем! </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Проки</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мен, глас… </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(см. Триодь постную)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Из книги Бытия </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или иной)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чтение.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны!</span>
                </p>
                <div id="firstReading">
                    <p className="_-ОСНОВНОЙ_Чтение-Писания ParaOverride-3">
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Чтение 1-й паремии</span>
                        <Tooltip>
                            Чтение приведено по библейскому тексту, чтец должен сам выбрать храмовый вариант прочтения
                            зачала
                        </Tooltip>
                    </p>
                </div>
                {firstReading}
                <p className="_-ПЕТИТ_КРАСН-петит-отст5 ParaOverride-6">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        [В это время свеча с жертвенника ставится на престол – на Евангелие.]
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Проки</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мен, глас… </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(по Триоди постной).</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Повели</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-007-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-007">
                                {' '}
                                ****
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Со свечой и кадилом:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Станем благоговейно!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> К приблизившемуся народу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[лежащему ниц]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Свет Христов просвещает всех!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Из книги Притчей </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или иной)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чтение.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Чтение 2-й паремии</span>
                    <Tooltip>
                        Чтение приведено по библейскому тексту, чтец должен сам выбрать храмовый вариант прочтения
                        зачала
                    </Tooltip>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-006-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-006">
                                {' '}
                                *****
                            </a>
                        </span>
                    </span>
                </p>
                {secondReading}
                <p className="_-ПЕТИТ_КРАСН-петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Свечу относят на жертвенник.]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">читавшему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Ч</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Чтение-Писания">
                    <span className="_-ВЫДЕЛЕНИЯ_REGULAR">Проповедь</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Прокимен великий <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(Пс 140:2, 1, 3-4а)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ч </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Да возносится молитва моя, как фимиа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м, <br /> пред лицо Твоё,
                        <br /> воздея
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние рук моих – как жертва вечерняя.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Стих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи, взываю к Тебе, услышь меня, <br /> вне
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мли гла­су моления моего,
                        <br /> когда взываю к Тебе.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Стих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Положи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , Господи, охрану устам моим, <br /> и огради двери губ моих;{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Стих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">не дай склониться сердцу моему к словам лукавым</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> для оправдания дел греховных.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> И снова:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Да возносится молитва моя, как фимиа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м, <br /> пред лицо Твоё,
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        <br /> воздея
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ние рук моих – как жертва вечерняя.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Все лежат ниц, предстоятель, стоя у престола, ка­дит его, а потом жертвенник.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        [Далее читается, по обы­чаю, молитва св. Ефрема Сирина с тремя покло­нами.]
                    </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-005-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-005">
                                {' '}
                                ******
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Сугубая ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Возгласим мы все от всей души и от всего по­мышления нашего воззовём!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господь Вседержитель, Бог отцов наших, молим Тебя, услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Помилуй нас, Боже, по великой милости Твоей, молим Тебя, услышь и помилуй!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и обо всех во Хри­сте </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">предстоящих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> бра­тьях наших.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о нашей богохранимой стране </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имя) </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        и обо всём народе и властях её, дабы проводить нам спокойную и тихую жизнь во всём благо­честиво
                        и до­стойно.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о наших братьях священниках, священ­но­и</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ноках, и обо всём во Христе братстве нашем.</span>
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Ещё мы молимся о милости, жизни, мире, здра­вии, спа­се­нии, посещении, прощении и отпуще
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­нии гре­хов чад </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ра­бов</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Божьих</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [имена]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и всех бра­тьев </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и сестёр</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> свя­того дома сего </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн"> святой обители сей</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ещё мы молимся о принося</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щих поже</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ртво­ва­ния и де­ла­ющих доброе для этого святого и вседо­стой­ного хра­ма, о в нём трудя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щихся, пою­щих и пред­сто­я­щих лю­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дях, ожидающих от Тебя великой и неисто­щи­мой милости.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва при усердном <br />
                        (сугубом) молении
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Господи Боже наш, прими это усердное моление от служителей Твоих, и помилуй нас, по мно­жеству
                        Твоей милости, и яви
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Твоё сострадание к нам и ко всему народу Твоему, ожидающему от Тебя неис­тощи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мой милости, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ибо Ты ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">лостивый и человеколюби</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вый Бог и мы воссылаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(5) Отпуст оглашаемых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_REGULAR">(если есть)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Оглашаемые, помолитесь Господу!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Оглашаемые</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-11">
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
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Оглашаемые, <a id="_idTextAnchor003" />
                        пред Господом ваши главы
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> пре­кло­ни</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Преклоняя головы:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Оглашаемые </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Пред Тобой, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-11">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва об оглашаемых</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Боже, Боже наш, Творец и Создатель всего, Ты желаешь, чтобы все были спасены
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и пришли к познанию Истины, – воззри же на рабов Твоих оглаша
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">емых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и избавь их от древ­него обольщения и ко</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        зней противника, и призови их в вечную Жизнь, просветив их души и тела и сопричи
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">с­лив их к Твоему духовному стаду, которое наре­чено</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Твоим именем святы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дабы и они</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> с нами славили вседостойное и пре­кра­с­ное имя Твоё, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-2">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ны­не и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">До 4-й седмицы Великого поста:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Оглашаемые, изы­ди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­те! Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Пусть не оста­нет­ся никого из оглашаемых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и просвещаемых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-004-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-004">
                                {' '}
                                *******
                            </a>
                        </span>
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст5">
                    {' '}
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Со среды же 4-й седмицы Великого поста</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-003-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-003">
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> вместо этих возгласов следует:</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-б-отст ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Все просвеща­емые, приступи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Помоли</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тесь, просвещаемые!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Просвещаемые</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">ЕКТЕНИЯ О ПРОСВЕЩАЕМЫХ</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Верные, о готовящихся ко святому просвещению братьях </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и сёстрах</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и о спасении их Господу помолимся,</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(на каждое прошение)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дабы Господь Бог наш утвердил их и укрепил,</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> просветил их светом разума и благочестия,</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> удостоил их во время благоприя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тное купели возрождения, прощения грехов и одежды нетления,
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> возродил их водою и Духом,</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> дарова</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л им совершенство в вере,</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> сопричи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">слил их к Своему святому и и</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">збранному стаду.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Спаси, помилуй, поддержи и сохрани их, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Просвещаемые, пред Господом ваши главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> преклони</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те!</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Просвещаемые</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пред Тобой, Господи.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">МОЛИТВА О ПРОСВЕЩАЕМЫХ</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Просияй, Владыка, лицом Твоим на готовящихся ко святому просве­щению и жаждущих греховную
                        скверну отря­сти
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(имена)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">; и озари их разум, укрепи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> их в вере, утверди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        в надежде, усовершенствуй в любви; и соделай их достойными членами Твоего Христа, отда
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вшего Себя как выкуп за души наши, –</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> просвещение наше и мы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> воссылаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Отцу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Все просвещаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Просвещаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Все оглашаемые, изыди</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">те! Пусть не останется никого из оглашаемых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и просвещаемых</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">!</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-5"> </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">*</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        [Все непричащающиеся с благоговением покидают церковь.]
                    </span>
                </p>
                <p className="_-СНОСКА_Сноска-КРАСНАЯ-кунцевая">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> * См. </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-3">1-е прим. на с. 97</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-Службы">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <a id="_idTextAnchor004" />
                        II.
                        <br />
                        ТАИНСТВО ПРИЧАЩЕНИЯ
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(1) Приуготовление</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Все верные, снова и снова в мире Господу помо­лим­ся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
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
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва первая</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже великий и достохва</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">льный, Ты перевёл нас от тления к нетлению животворя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        щей Смертью Твоего Христа, – Ты же все наши чувства от умерщвления страстя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми освободи, приставив к ним благо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">го прави</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        теля – внутренний разум: и око да будет непричастно всякому худому зрелищу, и слух – непри­сту
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        пен для слов праздных, а язык да будет чист от непристойных речей. Очисти и наши уста, восхваля
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющие Тебя, Господи, а нашим ру­ка</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м дай возде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">р­живаться от дел негодных и совершать лишь благоуго</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        дное Тебе, и все наши члены и мысли укрепляя Твоею благодатью. –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Громко:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Ибо Тебе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> подобает вся слава, честь и поклонение, </span>
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
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Великая ектения </span>
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
                        О мире всего мира, об укреплении святых Божьих цер­квей и единении всех{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">их</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся.</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Премудрость!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва вторая</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Владыка святой, преблаго</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й, мы умоляем Тебя, неоскудева</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ющего милостью: будь милостив к нам, грешным, и соде­лай нас достойными поднять Твоего
                        единородного Сына и Бога нашего, Царя Славы. Ибо вот, Его непорочное тело и животворящая кровь,
                        в нынешний час вноси
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мые, должны быть поло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">жены на этот та</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        инственный престол, не­зримо сопровожда­емые множеством воинства не­бесно­го. Дару
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й же нам неосужде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нно им причаститься, чтобы, просветив ими духовные очи, мы были сына
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми Света и Дня, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Громко:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        по дару Твоего Христа, с Которым Ты благословен, вместе со всесвяты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и животворя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щим Твоим Духом, ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Дьякон (или предстоятель) совершает малое каждение алтаря.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(2) Вход</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Входная песнь</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ныне силы небесные… С верой и желанием при­сту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">пим…</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Ныне силы небесные с нами незри</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мо служат,
                        <br />
                        ибо вот, входит Царь Славы, <br />
                        вот, сопровождается жертва <br />
                        та
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">инствен­ная и освящён­ная.</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-12">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> С верой и желанием присту</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        пим, <br />
                        дабы быть нам причастниками Жизни вечной
                        <br />
                        Аллилуия, аллилуия, аллилуия.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> (Трижды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        После пения 1-й части Входной песни со­вер­ша­ется перенесение св. даров на престол с каждением
                        перед ними.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">
                        [Весь народ лежит ниц; далее, по обычаю, читается молитва св. Ефрема Сирина с тремя поклонами.]
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(3) Приготовление ко причащению</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Просительная Ектения
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед Молитвой Господней)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Завершим нашу вечернюю молитву Господу!</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О принесённых и преждеосвящённых святых да­ра</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х Го­споду помолимся,</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
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
                <p className="_-ПЕТИТ_Петит-отст1-5">
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
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Весь вечер провести свято, мирно и без­греш­но у Го­спо­да испросим.
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
                        Ангела мира – верного наставника, хранителя <a id="_idTextAnchor005" />
                        наших душ и тел – у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Прощения и отпущения наших грехов и согрешений у Го­спода испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Доброго и полезного нашим ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        шам и <a id="_idTextAnchor006" />
                        миру мир у Господа испро­сим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Остальное время нашей жизни прожить в мире и покаянии у Господа испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Безболезненной, непо­стыд­ной, мирной христианской кончины нашей жизни и доброго ответа пред
                        Христом на Страш­ном Суде испросим.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Единства веры и общения Святого Духа испро­сив, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        х се­бя, и друг друга, и <a id="_idTextAnchor007" />
                        всю нашу жизнь Христу{' '}
                    </span>
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
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        МОЛИТВА ПО ПОСТАВЛЕНИИ СВ. ДАРОВ <br />
                        НА ПРЕСТОЛ И ПЕРЕД ПРИЧАЩЕНИЕМ
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О Бог неизъясни</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мых и неви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        димых Тайн, у Которого сокрыты богатства премудрости и ве
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дения, Ты открыл нам таинство этого </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">общего</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> служения </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(т. е. литургии)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        и поставил нас, грешных, по Своему великому человеколюбию, приносить Тебе дары
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и жертвы за наши грехи и грехи, совершённые по неве</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дению Твоим народом, – Ты же, Царь неви</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">димый, великие и непостижи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мые дела творя</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щий, славные и дивные, которым нет числа, воззри</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        на нас, недостойных служителей Твоих, стоя­щих, словно пред Твоим херувимским престолом, перед
                        этим святым жертвенником, на котором Твой единородный Сын и Бог наш пребывает чрез лежащие перед
                        нами страшные та
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ин­ства, и освободи нас и Твой верный народ от всякой нечисто­ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, и освяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> неотъе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м­лемым освящением ду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ши и тела</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        всех нас, дабы, причащаясь этим божественным святыням с чистой совестью, с непосрамлённым лицом
                        и просвещён­ным сердцем и оживо­творя
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ясь ими, мы соединились с Самим Твоим Христом, истинным Богом нашим, ибо Он сказал: «Вкуша
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ющий Плоть Мою и пьющий Мою Кровь во Мне пребывает, и Я в нём», и когда всели
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        тся в нас Слово Твоё, Господи, будет и обитать среди нас, мы, изба
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        вленные от всех козней дьявольских в деле, или слове, или в мыслях, да будем храмом Твоего
                        всесвято
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">го и до­сто­покло­ня</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">емого Духа и да получим обе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">­щан­ные нам бла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        га, вместе со всеми Тво­ими святыми, во все века творившими угодное Тебе.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
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
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П и Н</span>
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
                        но избавь нас от лукавого, –
                    </span>
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Мир всем!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> И духу твоему.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пред Господом наши главы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">` </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">прекло</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ним!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пред Тобой, Господи.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва главопреклонная</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Боже, один благой и благосердный, в вышних обитающий и на дольнее взирающий, воззри
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        благосердным оком на весь народ Твой и сохрани его; и удостой нас всех не­осужде
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        нно причаститься этим Твоим животворящим таинствам, ибо мы склонили свои главы
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> пред Тобою, ожидая от Тебя неистощимой милости, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        по милости, и состраданию, и человеколюбию Твоего еди­нород­ного Сына, с Которым Ты
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> благословен, вместе со всесвя­ты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и благи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м и животво­ря</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">щим Твоим Ду­хом, ны­не и все­гда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(перед откровением св. хлеба)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Тихо: </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Вне</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        мли, Господи Иисусе Христе, Боже наш, из свя­той обители Своей
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        <span id="footnote-002-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-002">
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и при­ди</span>
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
                        ть нам часть от Твоего непорочного тела и драгоценной крови, и через нас&nbsp;– всему народу{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Твоему</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[П и Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Боже, будь милостив ко мне, грешному! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Трижды.)]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Будем внимательны!</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Касаясь сверху рукою покрытого св. хлеба:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Преждеосвящённая святыня – святы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м! </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> И отлагает возду</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">х.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Один Святой, один Господь – Иисус Христос, во сла­ву Бога-Отца, аминь.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Далее следует раздробление св. даров, причащение священно­служителей и запивка из потира (кроме
                        потребляющего), см. выше,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-3">с. 65–66</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-13">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(4) Св. причащение</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ">Причащение в алтаре</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-1">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> При этом медленно поётся причастный стих:</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Вкуси</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        те – и увидите, что благ Господь.
                        <br /> Аллилуия, аллилуия, аллилуия.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        И другой, если праздник святого или храма – см. в прил. к кн. 2 ПБ.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        После причащения в алтаре дробится св.&nbsp;агнец и готовится св.&nbsp;чаша для народа.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ"> Причащение народа</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-001-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-001">
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЖИРНЫЙ"> в храме</span>
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
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-14">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословлять буду Господа во всякое время, <br /> непре­стан­но хвала Ему на уста
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х моих! </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс&nbsp;33:2.)</span>
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
                        преподаётся драгоценное и свя­то­е тело и кровь Господа и Бо­га и Спа­сителя нашего Иисуса
                        Христа для про­щения грехов его и Жизни вечной.{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Аминь.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-15">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(5) Благодарение после причащения</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5 ParaOverride-3">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Благословляя народ, в заключение: </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Спаси, Бо­же, народ Твой
                        <br /> и благослови наследие Твоё!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">(Пс 27:9.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Хлеб небесный и чашу жизни
                        <br /> вкуси
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        те – и увидите, что благ Господь! <br />
                        Аллилуия, аллилуия, аллилуия.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Показав, относит св. дары на жертвенник:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благословен Бог наш –</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> раз­мыш­ля­</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ющими весь день о прав­де Твоей.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">/</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аллилуия, аллилуия, аллилуия.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-7">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Ектения</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
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
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-6"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Поддержи, спаси, помилуй и сохрани нас, Боже, Твоею благодатью.
                    </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Весь вечер провести свято, мирно и без­греш­но ис­про­си
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">в, са­ми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">х себя, и друг друга, и всю нашу жизнь Хри­сту </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> чрез Христа</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Богу пре­дадим </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или: </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">посвяти</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">).</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Тебе, Господи.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва благодарственная
                        <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(после причащения всех)</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благодарим Тебя, Спасителя всех Бога, за все нам даро</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ванные бла</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        га Твои и за причащение святому телу и крови Твоего Христа – и просим Тебя, человеколюбивый
                        Владыка: сохрани нас под кровом{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        крыл Твоих и дай нам даже до нашего последнего вздоха достойно причащаться Твоим святыням, для
                        про­свещения души и тела и для наследования Царства Небесного, –
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ибо Ты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> освящение наше и мы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> воссы­лаем славу Тебе, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">От­цу и Сыну и Святому Духу,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Древний отпуст:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Пойдём в мире!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> С именем Господним.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> При выходе из храма:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Д</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господу помолимся!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> [Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Молитва заамвонная</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О Владыка, </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Бог</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Вседержитель, Ты всё создание с премудростью сотворил и по Твоему несказа
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">н­ному замыслу </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(или:</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> про</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мыслу</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> и великой благости привёл нас к этим всесвяты</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        м дням – для очищения душ и тел, для воздержания от страсте
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й, ради надежды воскресе­ния. Ты через сорок дней вручи</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">л скрижа</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ли с богоначе</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">р­танными письме­на</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ми Твоему служителю Моисею, – дай и нам, Благо</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">й, добрым подвигом подвиза</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ть­ся, бег поста завершить, веру невредимой сохранить, гла
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">вы невидимых зми</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ев сокруши</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ть, и победителями греха явиться, чтобы, достигнув </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">дня</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> святого Воскресения, неосужде</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">нно ему поклониться, –</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        ибо благословляется и прославляется вседостойное и прекрасное имя Твоё,{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Чёрн-ПЕТИТ-в-осн">Отца и Сына и Святого Духа,</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ныне и всегда и во веки веков.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-6">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-РаздСл ParaOverride-9">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(6) Заключительные молитвы</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Молитва «в сосудохранилище» <br />
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">
                        (перед снятием священных одежд <br />и на потребление св. даров <br />
                        или перед агапической трапезой)
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи Боже наш, Ты привёл нас к этим все­святы</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">м дням&nbsp;– соделав же нас о</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        бщниками Твоих страшных таинств, присоедини нас к Твоему духовному стаду и яви наслед­никами
                        Царства Твоего ныне и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">[Н]</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Да будет имя Господне благословенно – отныне и до века!{' '}
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(Трижды.)</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Пс 33</span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">
                        <span id="footnote-000-backlink">
                            <a className="_idFootnoteLink _idGenColorInherit" href="lpod.html#footnote-000">
                                {' '}
                                ********
                            </a>
                        </span>
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        [и Пс 144] (возможно и в начале трапезы любви, т. е. агапы).
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        {' '}
                        Бла­го­словляя народ на уход, возможно после общей трапезы:
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благословение Го­сподне на вас, по Его милости и человеколюбию, ны­не и всегда и во веки веков!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5 ParaOverride-10">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Аминь.</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Слава Тебе, Христе Боже, Надежда наша, слава Те­бе!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. Бла­го­слови!</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Отпуст</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">П</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Христос, истинный Бог наш, по хода</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">тайству Своей все­непо­рочной Матери </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(и прочее – по дню недели)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">, святых </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(храма и дня)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , и во святых отца нашего Григория Двоеслова, папы Римского, и всех святых, да помилует и спасёт
                        нас, по Своей благости и человеколюбию!
                    </span>
                </p>
                <p className="_-ПЕТИТ_КРАСН-петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">На Страстной седмице даётся свой отпуст: </span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Добровольно грядущий на страдания ради нашего спасения, Господь Христос, истинный Бог наш…
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_Звездочки ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">***</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Священник в алтаре читает благодарственные молитвы </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">*</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> После </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">Отец наш Небесный:</span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                        Отпустительный тропарь <br />
                        св. Григория Двоеслова,{' '}
                    </span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">глас 4</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Правилом веры и образом кротости, воздержания учителем тебя явила пастве твоей всех веще
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        й истина; ты обрёл через смирение – величие, через нищету – богатство, посему
                    </span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        , отец наш Гри­горий, мо­ли Христа Бога о спасении душ наших!
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_КРАСН-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне. </span>
                </p>
                <p className="_-ОСНОВНОЙ_Имя-части-отст2">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Богородичен,</span>
                    <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-"> глас 6</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> О Заступница христиан безукори</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">зненная… </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(с</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7">м. с.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-3"> 73</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7">).</span>
                </p>
                <p className="_-ОСНОВНОЙ_Основной-отст5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Господи, помилуй </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">(трижды)</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">. Че</span>
                    <span className="_-ДР--ГАРНИТУРЫ_УДАРЕНИЕ">`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">ствуемую превыше херувимов… </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">**</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">.</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Слава, и ныне. Отпуст</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-РЕДКИЕ_Знак-сноски-красной">***</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">.</span>
                </p>
                <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> * С</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7">м.: ПБ. Кн. 2. С. 207–211.</span>
                </p>
                <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> ** Там ж</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7">е. С. 211.</span>
                </p>
                <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> *** См. выш</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7">е, с. 34.</span>
                </p>
                <hr className="HorizontalRule-1" />
                <div className="_idFootnotes">
                    <div id="footnote-007" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-007-backlink"
                                >
                                    ****
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Вероятно, просвещаемым (и оглашаемым) подойти к солее.{' '}
                            </span>
                        </p>
                    </div>
                    <div id="footnote-006" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-006-backlink"
                                >
                                    *****
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Если есть бдение или полиелей, то здесь добавляются паремии праздника или святого.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-005" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-005-backlink"
                                >
                                    ******
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                Если есть полиелейный святой или храмовый праздник, то далее следует возглас Внемлем! и
                                читается Апостол с прокимном и Евангелие с аллилуарием, как на Литургии св. Иоанна
                                Златоуста или св. Василия Великого
                            </span>
                        </p>
                    </div>
                    <div id="footnote-004" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-004-backlink"
                                >
                                    *******
                                </a>
                            </span>
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
                        </p>
                    </div>
                    <div id="footnote-003" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-003-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                {' '}
                                То есть когда в храмах уже должны были быть просвещаемые.
                            </span>
                        </p>
                    </div>
                    <div id="footnote-002" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-002-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> В тексте Служебника далее вставка: </span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">и со славного пре­стола царствия Своего</span>
                            <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-8">.</span>
                        </p>
                    </div>
                    <div id="footnote-001" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-001-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> Кроме грудных младенцев.</span>
                        </p>
                    </div>
                    <div id="footnote-000" className="_idFootnote">
                        <p className="_-СНОСКА_Сноска-КРАСНАЯ">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                                <a
                                    className="_idFootnoteAnchor _idGenColorInherit"
                                    href="lpod.html#footnote-000-backlink"
                                >
                                    ********
                                </a>
                            </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> См.: ПБ. </span>
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ CharOverride-7">
                                Кн. 2. 3-е изд. М., 2015. С. 86–87.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lpod;
