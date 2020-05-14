import React from 'react';
import { useParams } from 'react-router-dom';
import { css } from 'emotion';
import Loader from 'components/Loader/Loader';
import Zoom from 'components/Zoom/Zoom';
import useSaint from '../../hooks/useSaint';
import ErrorMessage404 from 'components/ErrorMessage404/ErrorMessage404';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import RteText from 'components/RteText/RteText';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';

const Saint = () => {
    const { saintId } = useParams();
    const { data: saint, status } = useSaint(saintId);
    const theme = useTheme();

    return (
        <LayoutInner>
            {status === 'loading' ? (
                <Loader />
            ) : status === 'error' ? (
                <ErrorMessage500 />
            ) : !saint ? (
                <ErrorMessage404 />
            ) : (
                <>
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
                </>
            )}
        </LayoutInner>
    );
};
export default Saint;
