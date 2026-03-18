import React, { useState } from 'react';
import { css } from 'emotion';
import HeaderMain from 'containers/Main/HeaderMain';
import Loader from 'components/Loader/Loader';
import BottomNav from 'components/BottomNav/BottomNav';
import { useAuth } from 'oidc-react';
import Button from 'components/Button/Button';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import SectionHeading from 'containers/Main/SectionHeading';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import PrayerSetup from 'containers/HabitTracker/PrayerSetup';
import ContributionGraph from 'containers/HabitTracker/ContributionGraph';
import StreakStats from 'containers/HabitTracker/StreakStats';
import DrawerWithHeader from 'components/Drawer/DrawerWithHeader';

const Inner = () => {
    const auth = useAuth();
    const [signingOut, setSigningOut] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const profile = auth.userData?.profile;
    const settings = useQuery(api.habitTracker.getSettings, profile ? undefined : 'skip');
    const habitTrackerEnabled = !!settings?.habitTracker;

    if (signingOut || auth.isLoading) {
        return <Loader />;
    }
    if (!profile) {
        void auth.signIn();
        return <Loader />;
    }
    return (
        <div
            className={css`
                display: flex;
                flex-direction: column;
                height: calc(100vh - 110px);
                padding: 0 12px;
            `}
        >
            {profile.given_name ? <SectionHeading>Привет, {profile.given_name}!</SectionHeading> : null}
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                {habitTrackerEnabled && (
                    <>
                        <ContributionGraph />
                        <StreakStats />
                        <Button
                            title="Настроить молитвенное правило"
                            onClick={() => setShowSetup(true)}
                            className={css`
                                border: 1px solid #d9dde5;
                                border-radius: 8px;
                                text-align: center;
                                margin-top: 8px !important;
                                margin-bottom: 16px !important;
                                padding: 10px 16px !important;
                                font-size: 14px;
                                width: 100%;
                            `}
                        >
                            Настроить молитвенное правило
                        </Button>
                    </>
                )}

                {!habitTrackerEnabled && settings !== undefined && (
                    <ButtonBox
                        title="Молитвенное правило"
                        onClick={() => setShowSetup(true)}
                        className={css`
                            border-radius: 6px;
                            background-color: #4169e1 !important;
                            text-align: center;
                            margin-bottom: 16px !important;
                            cursor: pointer;
                            color: white;
                        `}
                    >
                        Молитвенное правило
                    </ButtonBox>
                )}

                {showSetup && (
                    <DrawerWithHeader
                        onClose={() => setShowSetup(false)}
                        header="Молитвенное правило"
                    >
                        <PrayerSetup onComplete={() => setShowSetup(false)} />
                    </DrawerWithHeader>
                )}

                <div
                    className={css`
                        margin-top: 8px;
                        opacity: 0.7;
                        font-size: 14px;
                    `}
                >
                    Если вы смените устройство, вы всегда сможете сохранить ваши личные (и соборные!) настройки.
                    Например, избранные песнопения, молитвенные списки и др. Для этого нужно будет просто войти в
                    аккаунт на новом устройстве!
                </div>
            </div>
            <ButtonBox
                title="Выйти"
                onClick={() => {
                    setSigningOut(true);
                    void auth.signOut();
                    window.location.href = `https://z.molitva.app/oidc/v1/end_session?id_token_hint=${auth.userData?.id_token}&post_logout_redirect_uri=https://molitva.app`;
                }}
                className={css`
                    border-radius: 6px;
                    background-color: #4169e1 !important;
                    text-align: center;
                    margin-bottom: 24px !important;
                    cursor: pointer;
                    color: white;
                `}
            >
                Выйти из аккаунта
            </ButtonBox>
        </div>
    );
};

const Profile = React.memo(() => {
    useDocumentTitle('Профиль пользователя - Православное богослужение на русском языке');

    return (
        <div>
            <HeaderMain />
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                <Inner />
            </div>

            <BottomNav active={undefined} />
        </div>
    );
});

export default Profile;
