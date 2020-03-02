import React, { Suspense, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import getTheme from 'styles/theme';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import Loader from 'components/Loader/Loader';
const Zlatoust = React.lazy(() => import('./Texts/Zlatoust'));

const Service = () => {
    const { serviceId, date } = useParams();
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);

    const [lang, setLang] = useState('default');

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                        height: 60px;
                        border-bottom: 1px solid #ccc;
                        position: sticky;
                        top: 0;
                        background-color: white;
                    `}
                >
                    <div
                        className={css`
                            position: absolute;
                        `}
                    >
                        <Link to={`/date/${date}/services`} title="Назад">
                            <div
                                className={css`
                                    padding: 18px;
                                    &:hover {
                                        opacity: 0.8;
                                    }
                                `}
                            >
                                <LeftIcon colour={theme.colours.darkGray} />
                            </div>
                        </Link>
                    </div>
                    <div
                        className={css`
                            position: absolute;
                            right: 12px;
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <div
                            onClick={() => setLang(lang === 'ЦСЯ' ? 'default' : 'ЦСЯ')}
                            role="button"
                            className={css`
                                cursor: pointer;
                                padding: 8px 6px 3px 6px;
                                margin-right: 6px;
                                border-radius: 8px;
                                color: ${lang === 'ЦСЯ' ? 'white' : 'inherit'};
                                background-color: ${lang === 'ЦСЯ' ? 'gray' : 'white'};
                            `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 400 440" width="16">
                                <path
                                    d="M187.57.442c-16.544.166-26.08 1.862-34.412 15.099v170.734s.615 19.322-23.513 19.322H18.043S.546 207.411.546 223.098v130.32s-4.83 12.064 45.84 12.064c50.667 0 53.095-10.849 53.095-10.849v-109.23s-.15-13.832 23.962-13.832c32.134 0 29.715 9.628 29.715 12.644v182.798s-1.016 12.565 46.842 12.565 46.842-12.565 46.842-12.565V244.215c0-3.016-2.42-12.644 29.715-12.644 24.111 0 23.988 13.832 23.988 13.832v109.23s2.402 10.85 53.07 10.85 45.839-12.064 45.839-12.064v-130.32c0-15.688-17.497-17.502-17.497-17.502H270.382c-24.128 0-23.54-19.322-23.54-19.322V15.54C236.65-.651 224.64.428 200.212.44h-.423c-4.46-.002-8.524-.037-12.219 0z"
                                    fillRule="evenodd"
                                    fill={lang === 'ЦСЯ' ? 'white' : 'black'}
                                    strokeWidth=".845"
                                />
                            </svg>
                        </div>
                        <ZoomControlToggle />
                    </div>
                </div>
                <Zoom>
                    <div
                        className={css`
                            margin-left: 12px;
                            margin-right: 12px;
                        `}
                    >
                        <Suspense fallback={Loader}>{serviceId === 'zlatoust' && <Zlatoust lang={lang} />}</Suspense>
                    </div>
                </Zoom>
            </div>
        </ThemeProvider>
    );
};
export default Service;
