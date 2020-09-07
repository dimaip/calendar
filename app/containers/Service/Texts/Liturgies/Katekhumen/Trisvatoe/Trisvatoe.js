import React from 'react';
import Tooltip from 'components/Tooltip/Tooltip';
import Html from 'components/Html/Html';
import If from 'components/If/If';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import Parts from 'components/Parts/Parts';
import useParts from 'hooks/useParts';

const Trisvatoe = ({ date }) => {
    const { data: parts } = useParts(date, 'ru');
    const vmestoTrisvatogoExists = Boolean(parts?.liturgy?.['Вместо Трисвятого']);
    return (
        <>
            <p id="trisvatoe" className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-2">
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                    Молитва перед пением <br />
                </span>
                <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">
                    Трисвятой песни
                    <Tooltip>Если Трисвятое не поётся, то даётся только возглас.</Tooltip>
                </span>
            </p>
            <If condition={!vmestoTrisvatogoExists}>
                <MdxLoader src="Liturgies/Katekhumen/Trisvatoe/MolitvaPered" />
            </If>

            {!vmestoTrisvatogoExists && (
                <>
                    <p className="_-ПЕТИТ_ПетитСТ-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">[</span>
                        <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Тихо:</span>
                    </p>
                    <p className="_-ПЕТИТ_Петит-отст1-5">
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> </span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">Д</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ"> Благослови, владыка, пение Трисвято́</span>
                        <span className="_-ВЫДЕЛЕНИЯ_ЧЁРНЫЙ">го!</span>
                        <span className="_-ВЫДЕЛЕНИЯ_Красн-ПЕТИТ-в-осн">]</span>
                    </p>
                </>
            )}
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

            <If condition={!vmestoTrisvatogoExists}>
                <MdxLoader src="Liturgies/Katekhumen/Trisvatoe/Trisvatoe" />
            </If>
            <Parts
                date={date}
                partNames={['liturgy.Вместо Трисвятого']}
                Layout={({ children }) => (
                    <>
                        <p className="_-ОСНОВНОЙ_Имя-части-отст5 ParaOverride-12">
                            <span className="_-ВЫДЕЛЕНИЯ_КРАСНЫЙ">Вместо Трисвятого</span>
                        </p>
                        {children}
                    </>
                )}
            />
        </>
    );
};
export default Trisvatoe;
