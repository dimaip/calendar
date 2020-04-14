import React from 'react';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

const Antifon1Easter = () => (
    <>
        <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Первый антифон, глас 2</span>
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span> Славьте Бога, все жители земли.
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Припев</span> По ходатайству Богородицы, Спаситель, / спаси нас.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span> Славьте Бога, все жители земли, славьте имя Его, славьте Его
            хвалой!
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Припев</span> По ходатайству Богородицы, Спаситель, / спаси нас.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">3</span> Скажите Богу: «Как грозны Твои дела! Ты могуч, враги
            заискивают пред Тобой.
            <br /> <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Припев</span> По ходатайству Богородицы, Спаситель, / спаси
            нас.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4</span> Да склонятся пред Тобою все жители земли, да воспоют Тебя, да
            воспоют Твоё имя.
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Припев</span> По ходатайству Богородицы, Спаситель, / спаси нас.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Слава, и ныне</span> По ходатайству Богородицы, Спаситель, / спаси
            нас.
        </p>
    </>
);

const Antifon1Sunday = ({ lang }) => (
    <>
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
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Н</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благослови Господа, душа моя!
                        <br /> Благословен Ты, Господи.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        <br /> Благослови Господа, душа моя,
                        <br /> и всё, что во мне, — имя святое Его;
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        благослови Господа, душа моя,
                        <br /> и не забывай всех даро́в Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Он прощает все беззакония твои,
                        <br /> исцеляет все неду`ги твои,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        избавляет от истле́ния жизнь твою,
                        <br /> милостью и щедротами венчает тебя,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        насыщает бла́гами зрелость твою;
                        <br /> как у орла, обновится юность твоя!
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Милость творит Господь,
                        <br /> тесни`мых защищает права́;
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        открыл Он Моисею пути Свои,
                        <br /> сына́м Изра́илевым — деяния Свои:
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        щедр и ми`лостив Господь,
                        <br /> долготерпелив и благ весьма,
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-б-отст">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">[</span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        прогневается не до конца,
                        <br /> и враждует не вове́к.
                    </span>
                </p>
                <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Не по беззакониям нашим сотворил Он нам,
                        <br /> и не по грехам нашим воздал Он нам;
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> но как высоки`</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        небеса над землёй,
                        <br /> сильна́ милость Его к боящимся Его;
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        как восток от запада далёк,
                        <br /> беззакония наши отдали`л Он от нас;
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        как ми`лует отец детей,
                        <br /> ми`лует Господь боящихся Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Ибо знает Он состав наш,
                        <br /> па́
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">мятует, что мы — персть.</span>
                </p>
                <p className="_-ПЕТИТ_Петит-отст1-5 ParaOverride-6">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Человек — дни его подобны траве,
                        <br /> как цвет полево́й, отцветают они;
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        повеет над ним — и нет его,
                        <br /> и не узна́ет его место его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Но милость Господня от века и вове́к
                        <br /> к боя´щимся Его,
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Господь воздвиг престол Свой на небесах,
                        <br /> и всё объе́млет царство Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Благословите Господа, все Воинства Его,
                        <br /> слу`ги Его, творящие волю Его!
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Благословите Господа, все дела Его,
                        <br /> на всяком месте владычества Его!
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_Красн-ЖИРНЫЙ">]</span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5 ParaOverride-4">
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благослови, душе моя, Господа,
                        <br /> и не забывай всех воздаяний Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Очищающаго вся беззакония твоя,
                        <br /> исцеляющаго вся недуги твоя.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Избавляющаго от истления живот твой,
                        <br /> венчающаго тя милостию и щедротами.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Исполняющаго во благих желание твое:
                        <br /> обновится, яко орля, юность твоя.
                        <br /> Творяй милостыни Господь,
                        <br /> и судьбу всем обидимым.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Сказа пути Своя Моисеови,
                        <br /> сыновом Израилевым хотения Своя.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Щедр и милостив Господь,
                        <br /> долготерпелив и многомилостив.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Не до конца прогневается,
                        <br /> ниже в век враждует.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Не по беззаконием нашим сотворил есть нам,
                        <br /> ниже по грехом нашим воздал есть нам.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Яко по высоте небесней от земли,
                        <br /> утвердил есть Господь милость Свою на боящихся Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Елико отстоят востоцы от запад,
                        <br /> удалил есть от нас беззакония наша.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Якоже щедрит отец сыны,
                        <br /> ущедри Господь боящихся Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Яко Той позна создание наше,
                        <br />
                        помяну, яко персть есмы.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1 </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Человек, яко трава дние его,
                        <br /> яко цвет сельный, тако оцветет.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Яко дух пройде в нем, и не будет,
                        <br /> и не познает ктому места своего.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Милость же Господня от века и до века
                        <br /> на боящихся Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        И правда Его на сынех сынов,
                        <br /> хранящих завет Его,
                        <br /> и помнящих заповеди Его
                        <br /> творити я.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Господь на небеси уготова Престол Свой,
                        <br /> и Царство Его всеми обладает.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Благословите Господа, ангели Его,
                        <br /> сильнии крепостию, творящии слово Его,
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        услышати глас словес Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Благословите Господа, вся силы Его,
                        <br /> слуги Его, творящии волю Его.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Благословите Господа, вся дела Его,
                        <br /> на всяком месте владычества Его.
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        {' '}
                        Благослови, душе моя, Господа,
                        <br /> и вся внутренняя моя Имя святое Его. <br />
                        Благословен еси, Господи.
                    </span>
                </p>
            </>
        )}
    </>
);

const Antifon1 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <Antifon1Easter />;
    }

    return <Antifon1Sunday lang={lang} />;
};

export default Antifon1;
