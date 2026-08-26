import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { useRecoilValue } from 'recoil';

import SelectBox from '../../components/SelectBox/SelectBox';

import TOCState from 'state/TOCState';

interface TOCSwitcherProps {
    lang: string;
    service?: unknown;
}

const TOCSwitcher = ({ lang }: TOCSwitcherProps): JSX.Element => {
    const TOC = useRecoilValue(TOCState);
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        if (typeof window.IntersectionObserver !== 'function' || !TOC.length) {
            return undefined;
        }

        let disposed = false;
        const pendingTimeouts = new Set<number>();
        const observer = new IntersectionObserver(
            (entries) => {
                if (disposed) {
                    return;
                }
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        setActiveItem(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-50px 0px -250px 0px',
                threshold: 0.3,
            }
        );

        // The MDX content can mount after the TOC data, so retry until each heading exists.
        const observeOrCue = (nodeId: string) => {
            if (disposed) {
                return;
            }
            const node = document.getElementById(nodeId);
            if (node) {
                observer.observe(node);
                return;
            }

            const timeoutId = window.setTimeout(() => {
                pendingTimeouts.delete(timeoutId);
                observeOrCue(nodeId);
            }, 500);
            pendingTimeouts.add(timeoutId);
        };

        TOC.forEach(({ value }) => observeOrCue(value));

        return () => {
            disposed = true;
            pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
            pendingTimeouts.clear();
            observer.disconnect();
        };
    }, [lang, TOC]);

    return (
        <SelectBox
            className={css`
                flex-shrink: 1;
                max-width: 70px;
                @media (min-width: 340px) {
                    max-width: 80px;
                }
                @media (min-width: 360px) {
                    max-width: 100px;
                }
                @media (min-width: 380px) {
                    max-width: 120px;
                }
                @media (min-width: 400px) {
                    max-width: 140px;
                }
            `}
            items={TOC}
            value={activeItem}
            onChange={(anchorID) => {
                const domNode = document.getElementById(anchorID);
                if (domNode) {
                    setActiveItem(anchorID);
                    try {
                        domNode.scrollIntoView({ block: 'center' });
                    } catch (error) {
                        // fallback to prevent browser crashing
                        domNode.scrollIntoView();
                    }
                }
            }}
        />
    );
};
export default TOCSwitcher;
