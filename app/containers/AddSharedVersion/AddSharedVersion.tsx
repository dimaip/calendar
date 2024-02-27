import React, { useState } from 'react';
import { css } from 'emotion';
import HeaderMain from 'containers/Main/HeaderMain';
import Loader from 'components/Loader/Loader';
import BottomNav from 'components/BottomNav/BottomNav';
import ButtonBox from 'components/ButtonBox/ButtonBox';
import BurgerMenu from 'containers/Main/BurgerMenu';
import SectionHeading from 'containers/Main/SectionHeading';
import useSharedService, { SharedService } from 'hooks/useSharedService';
import { useHistory, useParams } from 'react-router-dom';
import { useAddSharedVersion } from 'hooks/useAddSharedVersion';

const Inner = ({ sharedServiceData }: { sharedServiceData: SharedService }) => {
    const history = useHistory();

    const addSharedVersion = useAddSharedVersion(sharedServiceData?.service);

    return (
        <div
            className={css`
                display: flex;
                flex-direction: column;
                height: calc(100vh - 110px);
                padding: 0 12px;
            `}
        >
            <SectionHeading>С вами поделились чином «{sharedServiceData.scriptVersionName}»!</SectionHeading>
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                Добавьте этот чин себе. Как только автор чина внесет в него изменения, они отобразятся у вас
            </div>
            <ButtonBox
                title="Добавить"
                onClick={() => {
                    addSharedVersion(sharedServiceData);
                    history.push(`/date/${new Date().toISOString().slice(0, 10)}/service/${sharedServiceData.service}`);
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
                Добавить чин себе
            </ButtonBox>
        </div>
    );
};

const AddSharedVersion = React.memo(() => {
    const [menuShown, setMenuShown] = useState(false);

    const { versionData } = useParams();
    const { data: sharedServiceData } = useSharedService(versionData);

    return (
        <div>
            <HeaderMain menuShown={menuShown} setMenuShown={setMenuShown} />
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                {sharedServiceData ? <Inner sharedServiceData={sharedServiceData} /> : <Loader />}
            </div>

            <BurgerMenu menuShown={menuShown} setMenuShown={setMenuShown} />
            <BottomNav active={undefined} />
        </div>
    );
});

export default AddSharedVersion;
