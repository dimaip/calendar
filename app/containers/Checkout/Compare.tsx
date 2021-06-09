import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Button from 'components/Button/Button';
import { useSubscriptionService } from 'stateMachines/subscription';
import { gray2a, gray3, blue } from 'styles/getTheme';
import Cross2 from 'components/svgs/Cross2';
import NoDarkMode from 'components/NoDarkMode/NoDarkMode';

const headingStyle = css`
    font-size: 30px;
    color: ${blue};
    margin-bottom: 24px;
    @media (max-width: 365px) {
        font-size: 22px;
    }
`;
const textStyle = css`
    font-size: 14px;
    color: ${gray2a};
    line-height: 1.2;
    margin-bottom: 24px;
`;

const Compare = (): JSX.Element => {
    const theme = useTheme();
    const [_, send] = useSubscriptionService();
    return (
        <NoDarkMode>
            <div
                className={css`
                    width: 100vw;
                    background-color: ${theme.colours.white};
                `}
            >
                <div
                    className={css`
                        margin: 0 auto;
                        height: 100vh;
                        max-width: 640px;
                        padding: 0 24px;
                        text-align: center;

                        display: flex;
                        flex-direction: column;
                    `}
                >
                    <Button
                        className={css`
                            position: absolute;
                            top: 0;
                            right: 0;
                        `}
                        onClick={() => {
                            send('STAY_FREE');
                        }}
                    >
                        <Cross2 />
                    </Button>
                    <div
                        className={css`
                            display: flex;
                            height: 100%;
                            margin: 72px 0;
                        `}
                    >
                        <div
                            className={css`
                                width: 50%;
                                border-right: 1px solid ${gray3};
                                padding-right: 24px;

                                display: flex;
                                flex-direction: column;
                            `}
                        >
                            <div
                                className={css`
                                    flex-grow: 1;
                                `}
                            >
                                <div className={headingStyle}>Бесплатно</div>
                                <div className={textStyle}>Литургия Иоанна Златоуста</div>
                                <div className={textStyle}>Литургия Василия Великого</div>
                            </div>
                            <Button
                                variant="white"
                                border
                                onClick={() => {
                                    send('STAY_FREE');
                                }}
                            >
                                Продолжить
                            </Button>
                        </div>
                        <div
                            className={css`
                                width: 50%;
                                padding-left: 24px;

                                display: flex;
                                flex-direction: column;
                            `}
                        >
                            <div
                                className={css`
                                    flex-grow: 1;
                                `}
                            >
                                <div className={headingStyle}>59 ₽/мес.</div>
                                <div className={textStyle}>Домашнее моливенное правило Утреннее и Вечернее</div>
                                <div className={textStyle}>Часослов Шестой час и Полуночница</div>
                            </div>
                            <Button
                                variant="blue"
                                border
                                onClick={() => {
                                    send('SUBSCRIBE');
                                }}
                            >
                                Оформить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </NoDarkMode>
    );
};

export default Compare;

// <div>
//     Compare our plans
//     <Button
//         onClick={() => {
//             send('STAY_FREE');
//         }}
//     >
//         <div
//             className={css`
//                 font-size: 14px;
//                 text-decoration: underline !important;
//             `}
//         >
//             Free
//         </div>
//     </Button>
//     <Button
//         onClick={() => {
//             send('SUBSCRIBE');
//         }}
//     >
//         <div
//             className={css`
//                 font-size: 14px;
//                 text-decoration: underline !important;
//             `}
//         >
//             Subscribe
//         </div>
//     </Button>
// </div>;
