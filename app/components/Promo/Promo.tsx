import React from 'react';
import { css } from 'emotion';
import Button from '@material-ui/core/Button';
import { useTheme } from 'emotion-theming';
import promoDismissedState from 'state/promoDismissedState';
import { useRecoilState } from 'recoil';
import TagManager from 'react-gtm-module';

export const Promo = (): JSX.Element | null => {
    const theme = useTheme();

    if (new Date('2021-10-31') < new Date()) {
        return null;
    }

    const [promoDismissed, setPrompoDismissed] = useRecoilState(promoDismissedState('30oct'));
    if (promoDismissed) {
        return null;
    }
    return (
        <div
            className={css`
                z-index: 12;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: black;
                color: white;

                @media (min-width: 720px) {
                    display: none;
                }
            `}
        >
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    padding: 36px 24px;
                    height: 100vh;
                    padding-bottom: calc(36px + env(safe-area-inset-top));
                `}
            >
                <h1
                    className={css`
                        font-size: 36px;
                        margin-bottom: 24px;
                    `}
                >
                    В стране ковидные ограничения
                </h1>
                <div
                    className={css`
                        margin-bottom: 24px;
                        line-height: 1.6;
                        flex-grow: 1;
                    `}
                >
                    Чтобы вы смогли участвовать в Молитве памяти из дома, мы выложили последование молитвы о жертвах
                    советских репрессий
                </div>
                <Button
                    onClick={() => {
                        TagManager.dataLayer({
                            dataLayer: {
                                event: 'Oct30Dismissed',
                            },
                        });
                        setPrompoDismissed(true);
                    }}
                    size="large"
                    style={{ color: 'white', backgroundColor: theme.colours.red, width: '100%' }}
                >
                    Слава Богу!
                </Button>
            </div>
        </div>
    );
};
