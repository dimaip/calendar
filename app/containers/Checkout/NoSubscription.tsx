import React from 'react';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import { useTheme } from 'emotion-theming';
import { useSubscriptionService } from 'stateMachines/subscription';
import Cross2 from 'components/svgs/Cross2';

const NoSubscription = (): JSX.Element => {
    const [_, send] = useSubscriptionService();
    const theme = useTheme();
    return (
        <div
            className={css`
                background-color: ${theme.colours.white};
                color: ${theme.colours.darkGray};
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
                    <Cross2 />
                </Button>
                <div
                    className={css`
                        flex-grow: 1;
                        margin-top: 72px;
                    `}
                >
                    <div
                        className={css`
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 36px;
                        `}
                    >
                        К сожалению мы не нашли у вас подписки
                    </div>
                    <div
                        className={css`
                            color: ${theme.colours.gray};
                        `}
                    >
                        Обратитесь в техподдержку{' '}
                        <a
                            className={css`
                                text-decoration: underline;
                            `}
                            href="mailto:pb@psmb.ru"
                            target="_blank"
                        >
                            pb@psmb.ru
                        </a>
                        <br />
                        <br />
                        Или оформите подписку
                    </div>
                </div>
                <Button
                    variant="blue"
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

                <div
                    className={css`
                        font-size: 10px;
                        margin: 12px -24px;
                    `}
                >
                    <Button>Условия использования</Button> | <Button>Политика конфеденциальности</Button>
                </div>
            </div>
        </div>
    );
};

export default NoSubscription;
