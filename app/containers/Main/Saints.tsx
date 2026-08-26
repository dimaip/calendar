import React, { useRef, useEffect } from 'react';
import { css } from '@emotion/css';
import { useLocation, useNavigate } from 'react-router-dom';
import RteText from 'components/RteText/RteText';

interface SaintsProps {
    saints: string;
    date: string;
}

const Saints = ({ saints, date }: SaintsProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const root = ref.current;
        if (!root) {
            return;
        }

        const handleClick = (ev: MouseEvent) => {
            if (!(ev.target instanceof Element)) {
                return;
            }

            const a = ev.target.closest<HTMLAnchorElement>('a');
            if (!a || !root.contains(a)) {
                return;
            }
            ev.preventDefault();
            const saintId = a.dataset.saint;
            if (ev.metaKey || ev.ctrlKey) {
                window.open(`${process.env.PUBLIC_URL}/#/date/${date}/saint/${saintId}`, '_blank');
            } else {
                void navigate(`/date/${date}/saint/${saintId}`, {
                    state: { backLink: location.pathname },
                });
            }
        };

        root.addEventListener('click', handleClick);
        return () => root.removeEventListener('click', handleClick);
    }, [date, location.pathname, navigate]);
    return (
        <RteText
            html={saints}
            ref={ref}
            className={css`
                margin-left: 22px;
                margin-bottom: 32px;
                & img {
                    margin-right: 8px;
                    margin-left: -22px;
                }

                @media (prefers-color-scheme: dark) {
                    .invert {
                        filter: invert(100%);
                    }
                }
            `}
        />
    );
};
export default Saints;
