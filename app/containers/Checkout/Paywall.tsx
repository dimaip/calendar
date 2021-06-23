import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Button from 'components/Button/Button';
import { useSubscriptionService } from 'stateMachines/subscription';
import Cross2 from 'components/svgs/Cross2';
import NoDarkMode from 'components/NoDarkMode/NoDarkMode';

const Feature = ({ title, subTitle }: { title: string; subTitle: string }): JSX.Element => (
    <div
        className={css`
            margin-bottom: 24px;
        `}
    >
        <div
            className={css`
                font-size: 17px;
            `}
        >
            {title}
        </div>
        <div
            className={css`
                font-size: 14px;
            `}
        >
            {subTitle}
        </div>
    </div>
);

const Paywall = ({ authenticated = false }): JSX.Element => {
    const [_, send] = useSubscriptionService();
    const theme = useTheme();
    return (
        <div
            className={css`
                background-color: ${theme.colours.blue};
                width: 100vw;
            `}
        >
            <div
                className={css`
                    margin: 0 auto;
                    height: 100vh;
                    max-width: 640px;
                    padding: 0 24px;
                    text-align: center;

                    display: flex;
                    flex-direction: column;
                `}
            >
                <Button
                    className={css`
                        position: absolute;
                        top: 0;
                        right: 0;
                    `}
                    onClick={() => {
                        send('CLOSE');
                    }}
                >
                    <Cross2 white />
                </Button>
                <div
                    className={css`
                        flex-grow: 1;

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    <div>
                        <div
                            className={css`
                                font-size: 30px;
                                margin-bottom: 24px;
                            `}
                        >
                            <span
                                className={css`
                                    font-size: 90px;
                                `}
                            >
                                59
                            </span>{' '}
                            ₽/мес.
                        </div>
                        <Feature title="Домашнее моливенное правило" subTitle="Утреня и Вечерня" />
                        <Feature title="Часослов" subTitle="Шестой час и Полуночница" />
                    </div>
                </div>
                <Button
                    variant="white"
                    size="large"
                    onClick={() => {
                        send('SUBSCRIBE');
                    }}
                    className={css`
                        margin-bottom: 16px !important;
                    `}
                >
                    Оформить за 59 ₽ в месяц
                </Button>
                <Button
                    variant="black"
                    size="large"
                    onClick={() => {
                        send('SUBSCRIBE');
                    }}
                >
                    Оформить за 599 ₽ в год
                </Button>

                {!authenticated && (
                    <Button
                        onClick={() => {
                            send('ALREADY_SUBSCRIBED');
                        }}
                    >
                        <div
                            className={css`
                                font-size: 14px;
                                text-decoration: underline !important;
                            `}
                        >
                            Уже есть подписка?
                        </div>
                    </Button>
                )}

                <div
                    className={css`
                        font-size: 10px;
                        margin: 0 -24px;
                    `}
                >
                    <Button>Условия использования</Button> | <Button>Политика конфеденциальности</Button>
                </div>
            </div>
        </div>
    );
};

export default NoDarkMode(Paywall);
