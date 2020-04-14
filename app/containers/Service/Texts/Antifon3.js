import React from 'react';
import Tooltip from 'components/Tooltip/Tooltip';
import { makeIsEasterOffsetRange } from 'domain/getDayInfo';

const Antifon3Easter = () => (
    <>
        <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Третий антифон, глас 5</span>
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">1</span> Да восстанет Бог / и расточатся враги Его.
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Тропарь, глас 5</span> Христос воскрес из мёртвых, Смертию смерть
            поправ и тем, кто в гробах, Жизнь даровав.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">2</span> Да восстанет Бог и расточатся враги Его, / и да бегут от лица
            Его ненавидящие Его.
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Тропарь, глас 5</span> Христос воскрес из мёртвых, Смертию смерть
            поправ и тем, кто в гробах, Жизнь даровав.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">3</span> Как исчезает дым, да исчезнут они, как тает воск от лица
            огня.
            <br /> <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Тропарь, глас 5</span> Христос воскрес из мёртвых, Смертию
            смерть поправ и тем, кто в гробах, Жизнь даровав.
        </p>
        <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">4</span> Да сгинут злые пред Божьим лицом, – а праведные да
            возвеселятся.
            <br />
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Тропарь, глас 5</span> Христос воскрес из мёртвых, Смертию смерть
            поправ и тем, кто в гробах, Жизнь даровав.
        </p>
    </>
);

const Antifon3Sunday = ({ lang }) => (
    <>
        <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                Третий антифон
                <br />
            </span>
            <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">(</span>
            <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">Мф 5:3-1</span>
            <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">2</span>
            <span className="_-РЕДКИЕ_СТРОЧНЫЕ-в-прописн--заг-">)</span>
            <Tooltip>
                «Блаженны» могут петься с тропарями из канонов Утрени по Типикону (богослужебному Уставу).
            </Tooltip>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Блаженны а́лчущие и жаждущие правды,
                        <br /> ибо будут они насыщены.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 8</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Блаженны милосердные,
                        <br /> ибо будут они помилованы.
                        <br />
                    </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Блаженны те, чьи сердца́ чисты`,
                        <br /> ибо увидят они Бога.{' '}
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 6</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ CharOverride-1"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">
                        Блаженны гонимые за правду,
                        <br /> ибо их есть Царство Небесное.
                    </span>
                </p>
                <p className="_-ОСНОВНОЙ_ОсновнойСТ-отст1-5">
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> На 4</span>
                    <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ"> </span>
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">1</span>
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
                    <span className="_-ВЫДЕЛЕНИЯ_НАДИНДЕКС-красн CharOverride-1">2</span>
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
                        <br /> бесчестить и гнать <br /> и изженут, и рекут всяк <br /> зол глагол на вы, лжуще Мене
                        ради.
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
    </>
);

const Antifon3 = ({ lang, date: dateString }) => {
    const isEasterOffsetRange = makeIsEasterOffsetRange(dateString);
    if (isEasterOffsetRange(0, 6)) {
        return <Antifon3Easter />;
    }

    return <Antifon3Sunday lang={lang} />;
};

export default Antifon3;
