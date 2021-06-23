import React from 'react';
import { css } from 'emotion';
import { useApi } from 'hooks/useApi';
import Button from 'components/Button/Button';
import { useSubscriptionService } from 'stateMachines/subscription';
import { useTheme } from 'emotion-theming';
import LayoutMain from 'components/LayoutMain/LayoutMain';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = React.memo(() => {
    const { data, error, loading } = useApi<{ success: boolean }>('http://localhost:3001/profile/subscriptionInfo');
    const [_, send] = useSubscriptionService();
    const { logout } = useAuth0();
    const theme = useTheme();

    if (loading) {
        return <LayoutMain>Минуточку</LayoutMain>;
    }
    if (error) {
        return <LayoutMain>Ошибка</LayoutMain>;
    }

    return (
        <LayoutMain>
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                `}
            >
                <div
                    className={css`
                        flex-grow: 1;
                    `}
                >
                    <div
                        className={css`
                            flex-grow: 1;
                            font-size: 21px;
                            font-weight: bold;
                            color: ${theme.colours.gray};
                            margin-bottom: 24px;
                        `}
                    >
                        Подписка не активна
                    </div>
                    <div>
                        За 59 ₽/месяц вы можете купить одно мороженое в месяц или вложить их в качественную молитву
                        каждый день
                    </div>
                </div>
                <div>
                    <div>
                        <Button
                            variant="blue"
                            size="large"
                            onClick={() => {
                                send('SUBSCRIBE');
                            }}
                            className={css`
                                margin-bottom: 12px;
                                width: 100%;
                            `}
                        >
                            Подписаться
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                send('CLOSE');
                                logout();
                            }}
                            className={css`
                                width: 100%;
                                text-align: center;
                            `}
                        >
                            <div
                                className={css`
                                    font-size: 14px;
                                    text-decoration: underline !important;
                                `}
                            >
                                Выйти из аккаунта
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </LayoutMain>
    );
});

export default Profile;
