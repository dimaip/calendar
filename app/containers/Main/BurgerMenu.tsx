import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import CrossCircle from 'components/svgs/CrossCircle';
import { useSetRecoilState } from 'recoil';
import pendingUpdateState from 'state/pendingUpdateState';
import checkVersion from 'checkVersion';
import precache from 'precache';
import { useQueryClient } from 'react-query';

const BurgerMenu = ({ menuShown, setMenuShown }) => {
    const theme = useTheme();
    const setPendingUpdate = useSetRecoilState(pendingUpdateState);
    const queryClient = useQueryClient();
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
                    color: ${theme.colours.white};
                    width: 280px;
                    padding: 30px 30px 30px 30px;
                    padding-top: calc(env(safe-area-inset-top) + 30px);
                    z-index: 11;
                    font-size: 12px;
                    line-height: 1.5;
                `}
            >
                <Button
                    title="Закрыть меню"
                    onClick={() => setMenuShown(false)}
                    className={css`
                        display: block;
                        padding: 10px 18px;
                        position: absolute;
                        top: 0;
                        top: env(safe-area-inset-top) !important;
                        right: 0;
                    `}
                >
                    <CrossCircle />
                </Button>
                <div
                    className={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-start;
                        height: 100%;
                    `}
                >
                    <div>
                        Приложение «Православное&nbsp;богослужение» разработано{' '}
                        <a
                            className={css`
                                text-decoration: underline;
                            `}
                            rel="noopener"
                            href="https://psmb.ru"
                            target="_blank"
                        >
                            Преображенским братством
                        </a>
                        <br />
                        <br />
                        © Перевод Православного Богослужения на русский язык: Священник Георгий Кочетков
                        <br />
                        <br />
                        Цитирование Свящ. Писания по:
                        <br />
                        • Архимандрит Ианнуарий (Ивлиев)
                        <br />
                        • С.С. Аверинцев
                        <br />
                        • Епископ Кассиан (Безобразов)
                        <br />
                        • Протоиерей Сергий Овсянников
                        <br />
                        • Алексеев А.А.
                        <br />
                        • Левинская И.А.
                        <br />
                        • РБО 2011
                        <br />
                        • Novum Testamentum Graece, Nestle-Aland #28
                        <br />
                        • Deutsche Bibelgesellschaft, Stuttgart
                        <br />
                        <br />
                        Некоторые жития святых взяты с сайта holytrinityorthodox.com
                        <br />
                        <br />
                        Нашли ошибку или есть хорошая идея?{' '}
                        <a
                            className={css`
                                text-decoration: underline;
                            `}
                            href="mailto:pb@psmb.ru"
                            target="_blank"
                        >
                            Напишите нам!
                        </a>
                    </div>
                    <div>
                        Версия:{' '}
                        {
                            // @ts-ignore
                            VERSION
                        }
                        .{' '}
                        <Button
                            className={css`
                                text-decoration: underline;
                            `}
                            onClick={async () => {
                                const newVersion = await checkVersion();
                                if (newVersion) {
                                    setPendingUpdate(newVersion);
                                }
                                await precache(true);
                                await queryClient.refetchQueries();
                            }}
                        >
                            Обновить данные
                        </Button>
                    </div>
                </div>
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
