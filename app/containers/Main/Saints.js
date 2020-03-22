import React, { useRef, useEffect } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { useHistory } from 'react-router-dom';

const Saints = ({ saints, date }) => {
    const theme = useTheme();
    const ref = useRef(null);
    const history = useHistory();
    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener('click', ev => {
                const a = ev.target.closest('a');
                if (!a || !ref.current.contains(a)) {
                    return null;
                }
                ev.preventDefault();
                const saintId = a.dataset.saint;
                history.push(`/date/${date}/saint/${saintId}`);
            });
        }
    }, []);
    return (
        <div
            dangerouslySetInnerHTML={{ __html: saints }}
            ref={ref}
            className={css`
                font-size: 18px;
                line-height: 1.5;
                color: ${theme.colours.darkGray};
                margin-left: 22px;
                margin-bottom: 24px;

                & a {
                    color: ${theme.colours.primary};
                    cursor: pointer;
                }

                & img {
                    margin-right: 8px;
                    margin-left: -22px;
                }
            `}
        />
    );
};
export default Saints;
