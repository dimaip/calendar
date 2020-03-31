import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import CrossCircle from 'components/svgs/CrossCircle';

const BurgerMenu = ({ menuShown, setMenuShown }) => {
    const theme = useTheme();
    return (
        <>
            <div
                className={css`
                    position: fixed;
                    left: 0;
                    transform: ${menuShown ? 'none' : 'translateX(-280px)'};
                    transition: all 0.2s ease-in;
                    top: 0;
                    bottom: 0;
                    background: ${theme.colours.darkGray};
                    color: white;
                    width: 280px;
                    padding: 80px 30px 30px 30px;
                    z-index: 2;
                    font-size: 13px;
                    line-height: 1.5;
                `}
            >
                <Button
                    onClick={() => setMenuShown(false)}
                    className={css`
                        display: block;
                        padding: 10px 18px;
                        position: absolute;
                        top: 12px;
                        right: 4px;
                    `}
                >
                    <CrossCircle />
                </Button>
                Приложение «Православное&nbsp;богослужение» разработано{' '}
                <a
                    className={css`
                        text-decoration: underline;
                    `}
                    href="https://psmb.ru"
                    target="_blank"
                >
                    Преображенским братством
                </a>
                <br />
                <br />
                © Переводы Св. Писания и Богослужебных текстов:
                <br />
                Архимандрит Ианнуарий (Ивлиев)
                <br />
                Священник Георгий Кочетков
                <br />
                С.С. Аверинцев
                <br />
                Епископ Кассиан (Безобразов)
                <br />
                РБО 2011
                <br />
                Novum Testamentum Graece Edited by Barbara Aland and others
                <br />
                Deutsche Bibelgesellschaft, Stuttgart
                <br />
                <br />
                При любом использовании материалов сайта, ссылка на источник обязательна
            </div>
            <div
                role="button"
                onClick={() => setMenuShown(false)}
                className={css`
                    position: fixed;
                    display: ${menuShown ? 'block' : 'none'};
                    z-index: 1;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.3);
                `}
            />
        </>
    );
};
export default BurgerMenu;
