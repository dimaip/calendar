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
import { useRecoilState, useRecoilTransaction_UNSTABLE, useSetRecoilState } from 'recoil';
import customPrayersState from 'state/customPrayersState';
import disabledPrayersState from 'state/disabledPrayersState';
import scriptVersionsState from 'state/scriptVersionsState';
import currentScriptVersionState from 'state/currentScriptVersion';
import scriptEditorIsActiveState from 'state/scriptEditorIsActiveState';
import extraPrayersState from 'state/extraPrayers';

const unique = (arr: string[]) => [...new Set(arr).values()];

const Inner = ({ sharedServiceData }: { sharedServiceData: SharedService }) => {
    const history = useHistory();

    const [customPrayers, setCustomPrayers] = useRecoilState(customPrayersState('Sugubaja'));
    const [disabledPrayers, setDisabledPrayers] = useRecoilState(disabledPrayersState);
    const setScriptEditorIsActive = useSetRecoilState(scriptEditorIsActiveState);

    const [scriptVersions, setScriptVersions] = useRecoilState(scriptVersionsState(sharedServiceData?.service));
    const setCurrentScriptVersion = useSetRecoilState(currentScriptVersionState(sharedServiceData?.service));

    const setExtraPrayers = useRecoilTransaction_UNSTABLE(({ set }) => (distance) => {
        Object.entries(sharedServiceData.extraPrayers || {}).forEach(([key, value]) => {
            set(extraPrayersState(key), value);
        });
    });

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
                Добавьте этот чин себе трам-парам-пам-пам
            </div>
            <ButtonBox
                title="Добавить"
                onClick={() => {
                    setCustomPrayers(unique([...(customPrayers || []), ...(sharedServiceData.customPrayers || [])]));
                    setDisabledPrayers(
                        unique([...(disabledPrayers || []), ...(sharedServiceData.disabledPrayers || [])])
                    );

                    setScriptVersions([
                        ...(scriptVersions || []).filter((v) => v.id !== sharedServiceData.scriptVersionId),
                        { name: sharedServiceData.scriptVersionName, id: sharedServiceData.scriptVersionId },
                    ]);
                    setCurrentScriptVersion(sharedServiceData.scriptVersionId);
                    setScriptEditorIsActive(true);

                    setExtraPrayers();

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
