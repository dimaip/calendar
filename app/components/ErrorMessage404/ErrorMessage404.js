import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
const ErrorMessage = () => {
    const theme = useTheme();
    return (
        <div
            className={css`
                display: flex;
                color: ${theme.colours.gray};
                fill: ${theme.colours.gray};
                align-items: center;
                padding: 18px;
            `}
        >
            <div>
                <svg viewBox="-72 0 480 480" width={80}>
                    <path d="M100.688 0L0 100.688V480h336V0zM96 27.313V96H27.312zM320 464H16V112h96V16h208zm0 0" />
                    <path d="M126.625 190.055L104 212.687l-22.625-22.632-11.313 11.312L92.689 224l-22.626 22.633 11.313 11.312L104 235.313l22.625 22.632 11.313-11.312L115.313 224l22.624-22.633zm0 0M201.375 257.945L224 235.313l22.625 22.632 11.313-11.312L235.313 224l22.625-22.633-11.313-11.312L224 212.687l-22.625-22.632-11.313 11.312L212.688 224l-22.625 22.633zm0 0M98.344 330.344l11.312 11.312 7.434-7.433c28.137-28.063 73.683-28.063 101.82 0l7.434 7.433 11.312-11.312-7.433-7.434c-34.387-34.308-90.059-34.308-124.446 0zm0 0" />
                </svg>
            </div>
            <div
                className={css`
                    margin-left: 18px;
                    margin-top: -5px;
                `}
            >
                <h3
                    className={css`
                        font-weight: bold;
                        font-size: 24px;
                    `}
                >
                    Эта страница куда-то потерялась...
                </h3>
                <p>
                    Если вы уверены, что она должна тут быть, напишите нам на{' '}
                    <a
                        className={css`
                            text-decoration: underline;
                        `}
                        href="mailto:pb@psmb.ru"
                        target="_blank"
                    >
                        pb@psmb.ru
                    </a>
                </p>
                <p>
                    <a
                        className={css`
                            text-decoration: underline;
                        `}
                        href="/"
                    >
                        Вернуться на главную
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ErrorMessage;
