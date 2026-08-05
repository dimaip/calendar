import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';

import SelectBox from '../../components/SelectBox/SelectBox';

import { useTOCItems } from 'components/TOC/TOCProvider';

const TOCSwitcher = (): JSX.Element => {
    const TOC = useTOCItems();
    const [activeItem, setActiveItem] = useState('');
    const observerRef = useRef<IntersectionObserver | null>(null);
    const observedNodesRef = useRef(new Map<string, Element>());

    useEffect(() => {
        if (typeof window.IntersectionObserver !== 'function') {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
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
        observerRef.current = observer;

        return () => {
            observer.disconnect();
            observerRef.current = null;
            observedNodesRef.current.clear();
        };
    }, []);

    useEffect(() => {
        const observer = observerRef.current;
        if (!observer) {
            return;
        }

        const nextNodes = new Map<string, Element>();
        TOC.forEach(({ value }) => {
            const node = document.getElementById(value);
            if (node) {
                nextNodes.set(value, node);
            }
        });

        observedNodesRef.current.forEach((node, id) => {
            if (nextNodes.get(id) !== node) {
                observer.unobserve(node);
            }
        });
        nextNodes.forEach((node, id) => {
            if (observedNodesRef.current.get(id) !== node) {
                observer.observe(node);
            }
        });
        observedNodesRef.current = nextNodes;
    }, [TOC]);

    useEffect(() => {
        if (activeItem && !TOC.some(({ value }) => value === activeItem)) {
            setActiveItem('');
        }
    }, [activeItem, TOC]);

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
                    } catch {
                        // fallback to prevent browser crashing
                        domNode.scrollIntoView();
                    }
                }
            }}
        />
    );
};
export default TOCSwitcher;
