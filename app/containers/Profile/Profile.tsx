import React, { useState } from 'react';
import { css } from 'emotion';
import HeaderMain from 'containers/Main/HeaderMain';
import Loader from 'components/Loader/Loader';
import BottomNav from 'components/BottomNav/BottomNav';
import { useAuth } from 'oidc-react';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import BurgerMenu from 'containers/Main/BurgerMenu';
import SectionHeading from 'containers/Main/SectionHeading';
import { useHistory } from 'react-router-dom';

const Inner = () => {
    const auth = useAuth();
    const profile = auth.userData?.profile;
    const history = useHistory()
    if (auth.isLoading) {
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
            `}
        >
            <SectionHeading>Здравствуйте, {profile.given_name}!</SectionHeading>
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                Если вы смените устройство, вы всегда можете сохранить ваши личные (и соборные!) настройки, если зайдете
                в аккаунт: избранные песнопения, молитвенные списки и др.
            </div>
            <ButtonBox
                title="Выйти"
                onClick={() => {
                    void auth.signOut();
                    history.replace('/')
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
