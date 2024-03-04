import React from 'react';
import { css } from 'emotion';
import Button from '@material-ui/core/Button';
import { useTheme } from 'emotion-theming';
import { useRecoilState } from 'recoil';
import TagManager from 'react-gtm-module';
import scriptEditorPromoDismissedState from 'state/scriptEditorPromoDismissedState';
import { useHistory, useParams } from 'react-router-dom';

export const ScriptEditorPromo = (): JSX.Element | null => {
    const history = useHistory();
    const { date } = useParams();
    const theme = useTheme();

    const isLarge = window.matchMedia('(min-width: 700px)').matches;

    const [promoDismissed, setPrompoDismissed] = useRecoilState(scriptEditorPromoDismissedState);

    if (promoDismissed || isLarge) {
        return null;
    }
    return (
        <div
            className={css`
                z-index: 12;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ae841a;
                color: white;
            `}
        >
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    padding: 36px 24px;
                    padding-bottom: calc(36px + env(safe-area-inset-bottom));
                    height: 100%;
                `}
            >
                <h1
                    className={css`
                        font-size: 36px;
                        margin-bottom: 24px;
                    `}
                >
                    Теперь вы можете менять чин вашего молитвенного правила
                </h1>
                <div
                    className={css`
                        margin-bottom: 24px;
                        line-height: 1.6;
                        flex-grow: 1;
                    `}
                >
                    Например, если вы молитесь в дороге, то вы можете сократить некоторые части
                </div>
                <Button
                    onClick={() => {
                        TagManager.dataLayer({
                            dataLayer: {
                                event: `ScriptEditorPromoDismissed`,
                            },
                        });
                        setTimeout(() => {
                            setPrompoDismissed(true);
                        }, 0);
                        history.push(`/date/${date}/service/${new Date().getHours() < 13 ? 'matins' : 'vespers'}`);
                    }}
                    size="large"
                    style={{
                        color: '#ae841a',
                        backgroundColor: theme.colours.white,
                        width: '100%',
                    }}
                >
                    Пойду молиться!
                </Button>
            </div>
        </div>
    );
};
