import React, { useState } from 'react';
import { css } from 'emotion';
import HeaderMain from 'containers/Main/HeaderMain';
import Loader from 'components/Loader/Loader';
import BottomNav from 'components/BottomNav/BottomNav';
import { useAuth } from 'oidc-react';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import SectionHeading from 'containers/Main/SectionHeading';
import { useDocumentTitle } from 'utils/useDocumentTitle';

const Inner = () => {
    const auth = useAuth();
    const [signingOut, setSigningOut] = useState(false);
    const profile = auth.userData?.profile;
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
                Если вы смените устройство, вы всегда сможете сохранить ваши личные (и соборные!) настройки. Например,
                избранные песнопения, молитвенные списки и др. Для этого нужно будет просто войти в аккаунт на новом
                устройстве!
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
