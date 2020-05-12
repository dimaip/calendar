import React, { useEffect, useState } from 'react';
import SelectBox from '../../components/SelectBox/SelectBox';
import { css } from 'emotion';

const TOCSwitcher = ({ service }) => {
    const data = service?.TOC;
    const items = Object.keys(data).map(item => ({
        value: item,
        label: data[item],
    }));
    const [activeItem, setActiveItem] = useState('');
    if ('IntersectionObserver' in window) {
        useEffect(() => {
            let observer = null;
            if (data) {
                observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && entry.target.id) {
                                if (observer) {
                                    setActiveItem(entry.target.id);
                                }
                            }
                        });
                    },
                    {
                        rootMargin: '-50px 0px -250px 0px',
                        threshold: 0.3,
                    }
                );

                // @TODO: any better way to do it without timeout?
                // We keep on polling for dom nodes, till all nodes are found
                const observeOrCue = nodeId => {
                    if (!observer) {
                        return;
                    }
                    const node = document.getElementById(nodeId);
                    if (node) {
                        observer.observe(node);
                    } else {
                        setTimeout(() => {
                            observeOrCue(nodeId);
                        }, 500);
                    }
                };

                Object.keys(data).map(nodeId => {
                    observeOrCue(nodeId);
                });
                setTimeout(() => {}, 0);
            }
            return () => {
                if (observer) {
                    observer.disconnect();
                    observer = null;
                }
            };
        }, []);
    }
    if (!data) {
        return null;
    }
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
            items={items}
            value={activeItem}
            onChange={anchorID => {
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
