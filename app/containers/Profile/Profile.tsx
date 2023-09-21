import React, { useState } from 'react';
import { css } from 'emotion';
import HeaderMain from 'containers/Main/HeaderMain';
import Loader from 'components/Loader/Loader';
import BottomNav from 'components/BottomNav/BottomNav';
import { useAuth } from 'oidc-react';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import BurgerMenu from 'containers/Main/BurgerMenu';
import SectionHeading from 'containers/Main/SectionHeading';

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
            <SectionHeading>Привет, {profile.given_name}!</SectionHeading>
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
    const [menuShown, setMenuShown] = useState(false);

    return (
        <div>
            <HeaderMain menuShown={menuShown} setMenuShown={setMenuShown} />
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                <Inner />
            </div>

            <BurgerMenu menuShown={menuShown} setMenuShown={setMenuShown} />
            <BottomNav active={undefined} />
        </div>
    );
});

export default Profile;
