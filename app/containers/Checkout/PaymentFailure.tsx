import React from 'react';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import { useSubscriptionService } from 'stateMachines/subscription';
import { useTheme } from 'emotion-theming';
import Cross2 from 'components/svgs/Cross2';
import Praying from 'components/svgs/Praying';
import NoDarkMode from 'components/NoDarkMode/NoDarkMode';

const PaymentFailure = (): JSX.Element => {
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
                        send('RETRY');
                    }}
                >
                    <Cross2 />
                </Button>
                <div
                    className={css`
                        margin-top: 72px;
                    `}
                >
                    <div
                        className={css`
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 12px;
                        `}
                    >
                        Тысяча чертей
                    </div>
                    <div
                        className={css`
                            color: ${theme.colours.gray};
                            font-size: 14px;
                        `}
                    >
                        Что-то пошло не так. Обратитесь в техподдержку{' '}
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
                        Или попробуйте еще раз
                    </div>
                </div>
                <div
                    className={css`
                        flex-grow: 1;

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    <Praying fill={theme.colours.red} />
                </div>
                <Button
                    variant="red"
                    size="large"
                    onClick={() => {
                        send('RETRY');
                    }}
                    className={css`
                        margin-bottom: 36px;
                    `}
                >
                    Попробовать еще раз
                </Button>
            </div>
        </div>
    );
};

export default NoDarkMode(PaymentFailure);
