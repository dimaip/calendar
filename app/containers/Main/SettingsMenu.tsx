import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import { useRecoilState, useSetRecoilState } from 'recoil';
import pendingUpdateState from 'state/pendingUpdateState';
import checkVersion from 'checkVersion';
import precache from 'precache';
import { useQueryClient } from 'react-query';
import LeftIcon from 'components/svgs/LeftIcon';
import ZoomControl from 'components/ZoomControl/ZoomControl';
import ThemeControl from 'components/ThemeControl/ThemeControl';
import Zoom from 'components/Zoom/Zoom';
import menuShownState from 'state/menuShownState';

const SettingsMenu = () => {
    const [menuShown, setMenuShown] = useRecoilState(menuShownState);
    const theme = useTheme();
    const setPendingUpdate = useSetRecoilState(pendingUpdateState);
    const queryClient = useQueryClient();
    if (!menuShown) {
        return null;
    }
    const backElement = (
        <div
            className={css`
                padding: 18px;
                &:hover {
                    opacity: 0.8;
                }
            `}
            onClick={() => setMenuShown(false)}
        >
            <LeftIcon />
        </div>
    );
    return (
        <div
            style={{
                backgroundColor: theme.colours.white,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                overflowY: 'auto',
            }}
        >
            <div
                className={css`
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                    position: sticky;
                    top: 0;
                    background-color: ${theme.colours.white};
                `}
            >
                {backElement}
                <h3
                    className={css`
                        color: ${theme.colours.black};
                        font-size: 28px;
                        font-weight: 600;
                    `}
                >
                    Настройки
                </h3>
            </div>

            <div style={{ padding: '0 18px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <Zoom>
                        <h4
                            className={css`
                                color: ${theme.colours.black};
                                font-size: 24px;
                                font-weight: 400;
                                margin-top: 18px;
                                margin-bottom: 12px;
                            `}
                        >
                            Размер текста
                        </h4>
                    </Zoom>
                    <ZoomControl />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <Zoom>
                        <h4
                            className={css`
                                color: ${theme.colours.black};
                                font-size: 24px;
                                font-weight: 400;
                                margin-top: 18px;
                                margin-bottom: 12px;
                            `}
                        >
                            Тема оформления
                        </h4>
                    </Zoom>
                    <ThemeControl />
                </div>
                <Zoom>
                    <>
                        <h4
                            className={css`
                                color: ${theme.colours.black};
                                font-size: 24px;
                                font-weight: 400;
                                margin-bottom: 12px;
                            `}
                        >
                            О приложении
                        </h4>

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
                            • Haile Selassie Amharic Bible
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
                    </>
                </Zoom>
            </div>
        </div>
    );
};
export default SettingsMenu;
