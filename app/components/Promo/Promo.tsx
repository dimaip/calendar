import React from 'react';
import { css } from 'emotion';
import Button from '@material-ui/core/Button';
import { useTheme } from 'emotion-theming';
import promoDismissedState from 'state/promoDismissedState';
import { useRecoilState } from 'recoil';
import TagManager from 'react-gtm-module';
import useApp from 'hooks/useApp';

export const Promo = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
    const theme = useTheme();
    const { data } = useApp();
    const notification = data?.notification;

    const isLarge = window.matchMedia('(min-width: 700px)').matches;

    const [promoDismissed, setPrompoDismissed] = useRecoilState<boolean>(promoDismissedState(notification?.id));

    if (
        !notification ||
        isLarge ||
        (notification.activeSince && new Date() < new Date(notification.activeSince)) ||
        (notification.activeTill && new Date() > new Date(notification.activeTill)) ||
        promoDismissed
    ) {
        return <>{children}</>;
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
                background-color: ${notification.backgroundColour || 'black'};
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
                    {notification.title}
                </h1>
                <div
                    className={css`
                        margin-bottom: 24px;
                        line-height: 1.6;
                        flex-grow: 1;
                    `}
                >
                    {notification.subtitle}
                </div>
                <Button
                    onClick={() => {
                        TagManager.dataLayer({
                            dataLayer: {
                                event: `${notification.id}Dismissed`,
                            },
                        });
                        setPrompoDismissed(true);
                    }}
                    size="large"
                    style={{
                        color: 'white',
                        backgroundColor: notification.buttonColour || theme.colours.red,
                        width: '100%',
                    }}
                >
                    {notification.buttonText}
                </Button>
            </div>
        </div>
    );
};
