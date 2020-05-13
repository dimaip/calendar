import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LeftIcon from 'components/svgs/LeftIcon';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';
import Zoom from 'components/Zoom/Zoom';
import useSaint from '../../hooks/useSaint';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import RteText from 'components/RteText/RteText';
import { useTheme } from 'emotion-theming';

const Saint = () => {
    const { saintId, date } = useParams();
    const { data: saint, status } = useSaint(saintId);
    const theme = useTheme();

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'error' || !saint) {
        return <ErrorMessage500 />;
    }

    return (
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
                    <Link to={`/date/${date}`} title="Назад">
                        <div
                            className={css`
                                padding: 18px;
                                &:hover {
                                    opacity: 0.8;
                                }
                            `}
                        >
                            <LeftIcon />
                        </div>
                    </Link>
                </div>
                <div
                    className={css`
                        position: absolute;
                        right: 12px;
                    `}
                >
                    <ZoomControlToggle />
                </div>
            </div>
            <div
                className={css`
                    margin-top: 24px;
                    padding: 0 16px 16px 16px;
                `}
            >
                <h3
                    className={css`
                        color: ${theme.colours.primary};
                        margin-bottom: 12px;
                        font-size: 30px;
                    `}
                >
                    {saint.title}
                </h3>
                {saint.icon && (
                    <div
                        className={css`
                            margin-top: 24px;
                            margin-bottom: 24px;
                        `}
                    >
                        <img
                            src={saint.icon}
                            alt={saint.title}
                            className={css`
                                max-width: 100%;
                            `}
                        />
                    </div>
                )}
                <Zoom>
                    <RteText html={saint.bodytext} />
                </Zoom>
            </div>
        </div>
    );
};
export default Saint;
