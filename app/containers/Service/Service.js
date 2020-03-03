import React, { Suspense, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import getTheme from 'styles/theme';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import useDay from 'hooks/useDay';
import Zoom from 'components/Zoom/Zoom';
import Loader from 'components/Loader/Loader';
import LanguageSwitcher from './LanguageSwitcher';
import TOCSwitcher from './TOCSwitcher';
import zlatoustTOC from './Texts/zlatoustTOC';
const Zlatoust = React.lazy(() => import('./Texts/Zlatoust'));

const TOC = ({ serviceId, showTOC, setShowTOC }) => {
    const data = serviceId === 'zlatoust' ? zlatoustTOC : {};
    return (
        showTOC && (
            <>
                <div
                    className={css`
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 0;
                    `}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowTOC(false);
                    }}
                ></div>
                <div
                    className={css`
                        position: fixed;
                        top: 60px;
                        left: 50px;
                        right: 0;
                        bottom: 0;
                        background-color: white;
                        padding: 24px;
                        border-left: 1px solid #d9dde5;
                        box-shadow: -1px 0px 3px #d9dde5;
                        z-index: 1;
                        overflow-y: auto;
                    `}
                >
                    {Object.keys(data).map(anchorID => (
                        <div
                            key={anchorID}
                            className={css`
                                margin-bottom: 12px;
                                cursor: pointer;
                            `}
                            role="button"
                            onClick={() => {
                                const domNode = document.getElementById(anchorID);
                                setShowTOC(false);
                                if (domNode) {
                                    domNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }}
                        >
                            {data[anchorID]}
                        </div>
                    ))}
                </div>
            </>
        )
    );
};

const Service = () => {
    const { serviceId, date } = useParams();
    const { data: day } = useDay(date);
    const theme = getTheme(day?.colour);
    const textRef = useRef();

    const [lang, setLang] = useState('default');
    const [showTOC, setShowTOC] = useState(false);

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
                        z-index: 1;
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
                        <LanguageSwitcher lang={lang} setLang={setLang} />
                        <ZoomControlToggle />
                        <TOCSwitcher showTOC={showTOC} setShowTOC={setShowTOC} />
                    </div>
                </div>
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <Zoom>
                        <>
                            <div
                                className={css`
                                    margin-left: 12px;
                                    margin-right: 12px;
                                `}
                            >
                                <Suspense fallback={Loader}>
                                    {serviceId === 'zlatoust' && <Zlatoust lang={lang} />}
                                </Suspense>
                            </div>
                            {<TOC serviceId={serviceId} showTOC={showTOC} setShowTOC={setShowTOC} />}
                        </>
                    </Zoom>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default Service;
