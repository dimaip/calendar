import React, { useContext } from 'react';
import { css } from 'emotion';
import { LangContext, LangDispatchContext } from './useLangReducer';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';

const ParallelLanguageBar = () => {
    {
        const langState = useContext(LangContext);
        const langDispatch = useContext(LangDispatchContext);
        return (
            langState.lang === 'parallel' && (
                <div
                    className={css`
                        height: 36px;
                    `}
                >
                    <div
                        className={css`
                            display: flex;
                            align-items: center;
                            background-color: #8e8e93;
                            color: white;
                            font-size: 13px;
                            position: fixed;
                            z-index: 1;
                            top: 44px;
                            left: 0;
                            right: 0;
                        `}
                    >
                        <div
                            className={css`
                                width: 50%;
                                padding: 10px;
                                text-align: left;
                            `}
                        >
                            {langState.langA === 'ru' && 'Русский'}
                            {langState.langA === 'csj' && 'Церковнослав.'}
                        </div>
                        <div>
                            <Button
                                onClick={() =>
                                    langDispatch(
                                        // @ts-ignore
                                        { type: 'toggleParallelLangs' }
                                    )
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16.564"
                                    height="16.361"
                                    viewBox="0 0 16.564 16.361"
                                >
                                    <g transform="translate(-165.142 -53.294)">
                                        <g transform="translate(165.848 54)">
                                            <path
                                                d="M0,0V9.68l3.712-4.1"
                                                transform="translate(9.68 3.712) rotate(90)"
                                                fill="none"
                                                stroke="#fbfbfb"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                            />
                                            <line
                                                x1="3.712"
                                                y1="4.103"
                                                transform="translate(4.103) rotate(90)"
                                                strokeWidth="1"
                                                stroke="#fbfbfb"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                            />
                                        </g>
                                        <g transform="translate(181 68.948) rotate(180)">
                                            <path
                                                d="M0,0V9.68l3.712-4.1"
                                                transform="translate(9.68 3.712) rotate(90)"
                                                fill="none"
                                                stroke="#fbfbfb"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                            />
                                            <line
                                                x1="3.712"
                                                y1="4.103"
                                                transform="translate(4.103) rotate(90)"
                                                strokeWidth="1"
                                                stroke="#fbfbfb"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </Button>
                        </div>
                        <div
                            className={css`
                                width: 50%;
                                padding: 10px 10px 10px 0px;
                                text-align: left;
                                display: flex;
                            `}
                        >
                            <div
                                className={css`
                                    flex-grow: 1;
                                `}
                            >
                                {langState.langB === 'ru' && 'Русский'}
                                {langState.langB === 'csj' && 'Церковнослав.'}
                            </div>
                            <Button
                                className={css`
                                    flex-grow: 0;
                                    font-size: 24px;
                                    padding: 0 !important;
                                    line-height: 0;
                                    margin-top: -6px;
                                `}
                                // @ts-ignore
                                onClick={() => langDispatch({ type: 'setLang', lang: 'ru' })}
                            >
                                <Cross white />
                            </Button>
                        </div>
                    </div>
                </div>
            )
        );
    }
};

export default ParallelLanguageBar;
