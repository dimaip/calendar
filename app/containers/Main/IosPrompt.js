import React, { useState, useEffect } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import { isCapacitor, isIphone, isInStandaloneMode } from 'utils/deviceInfo';
import { useRecoilState } from 'recoil';
import iosPromptState from 'state/iosPromptState';

const IosPrompt = () => {
    const theme = useTheme();
    const now = new Date();
    const [showIosPrompt, setShowIosPrompt] = useState(false);
    const [iosPromptDismissed, setIosPromptDismissed] = useRecoilState(iosPromptState);

    useEffect(() => {
        let mounted = true;
        setTimeout(() => {
            if (mounted) {
                setShowIosPrompt(true);
            }
        }, 3000);
        return () => {
            mounted = false;
        };
    }, []);

    // @ts-ignore

    // Bother users again in 60d
    const showAgain = !iosPromptDismissed || now.getTime() - iosPromptDismissed > 1000 * 3600 * 24 * 60;
    const shouldShowIosPrompt = !isCapacitor() && isIphone() && !isInStandaloneMode() && showAgain && showIosPrompt;

    return (
        shouldShowIosPrompt && (
            <div
                className={css`
                    position: sticky;
                    bottom: 15px;
                    left: 0;
                    right: 0;
                    width: 300px;
                    margin: 0 auto;
                    padding: 14px 30px 14px 18px;
                    background: ${theme.colours.white};
                    border: 1px solid ${theme.colours.lineGray};
                    font-size: 16px;
                    line-height: 1.5;
                    color: ${theme.colours.darkGray};
                    &:after,
                    &:before {
                        top: 100%;
                        left: 50%;
                        border: solid transparent;
                        content: ' ';
                        height: 0;
                        width: 0;
                        position: absolute;
                        pointer-events: none;
                    }
                    &:after {
                        border-color: rgba(255, 255, 255, 0);
                        border-top-color: ${theme.colours.white};
                        border-width: 15px;
                        margin-left: -15px;
                    }
                    &:before {
                        border-color: rgba(206, 206, 210, 0);
                        border-top-color: ${theme.colours.lineGray};
                        border-width: 16px;
                        margin-left: -16px;
                    }
                `}
            >
                <Button
                    title="Закрыть"
                    onClick={() => {
                        const now = new Date();
                        setIosPromptDismissed(now.getTime());
                    }}
                    className={css`
                        position: absolute;
                        right: 0;
                        top: 0;
                        padding: 3px 8px !important;
                    `}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={12}>
                        <path
                            fill={theme.colours.gray}
                            d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z"
                        />
                    </svg>
                </Button>
                <div
                    className={css`
                        margin-bottom: 6px;
                    `}
                >
                    <strong>Установи меня...</strong> и я превращусь в настоящее приложение!
                </div>
                Нажми на{' '}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width={20}
                    className={css`
                        vertical-align: text-top;
                    `}
                >
                    <g fill="none" stroke="#057cff">
                        <path d="M59.885 28.793h17.886v56.34H22.229v-56.34h19.92" strokeWidth="3.578" />
                        <path d="M38.389 19.065l5.805-5.926L50 7.212l5.806 5.927 5.805 5.926" strokeWidth="2.986" />
                        <path d="M49.895 9.125l.61 46.243" strokeWidth="3.087" />
                    </g>
                </svg>
                {', '} а затем выбери
                <br />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="25 20 92 92"
                    width={20}
                    className={css`
                        vertical-align: text-top;
                    `}
                >
                    <g transform="translate(-159.55 -449.116)" fill="none" stroke="#bcbcbc">
                        <rect
                            fill="#bcbcbc"
                            width="61.785"
                            height="61.985"
                            x="199.524"
                            y="488.99"
                            ry="13.015"
                            strokeWidth="2.9"
                        />
                        <path
                            stroke={theme.colours.white}
                            d="M230.317 507.323l.2 25.318M243.076 519.883l-25.318.199"
                            strokeWidth="2.9"
                        />
                    </g>
                </svg>{' '}
                <span
                    className={css`
                        color: ${theme.colours.gray};
                    `}
                >
                    На экран «‎Домой»‎‎
                </span>
            </div>
        )
    );
};

export default IosPrompt;
