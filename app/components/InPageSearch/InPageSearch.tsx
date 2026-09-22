import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

import Button from 'components/Button/Button';

const HIGHLIGHT_CLASS = 'inpage-find-highlight';
const ACTIVE_CLASS = 'inpage-find-active';

const useHighlights = (containerRef: React.RefObject<HTMLElement>) => {
    const clearHighlights = () => {
        const container = containerRef.current;
        if (!container) return;
        const highlighted = Array.from(container.querySelectorAll(`span.${HIGHLIGHT_CLASS}`));
        highlighted.forEach((span) => {
            const parent = span.parentNode;
            if (!parent) return;
            while (span.firstChild) parent.insertBefore(span.firstChild, span);
            parent.removeChild(span);
            parent.normalize();
        });
    };

    const createHighlights = (query: string) => {
        const container = containerRef.current;
        if (!container) return [] as HTMLElement[];
        const matches: HTMLElement[] = [];
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
            acceptNode: (node: any) => {
                if (!node || !node.data) {
                    return NodeFilter.FILTER_REJECT;
                }
                // Skip text nodes that are inside script/style or already highlighted
                const parentElement = node.parentElement || null;
                if (!parentElement) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (parentElement.closest('script, style')) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (parentElement.classList?.contains(HIGHLIGHT_CLASS)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            },
        } as any);

        const q = query;
        if (!q) {
            return matches;
        }
        const lowerQ = q.toLocaleLowerCase();

        const toProcess: Text[] = [];
        let current: Node | null = walker.nextNode();
        while (current) {
            toProcess.push(current as Text);
            current = walker.nextNode();
        }

        toProcess.forEach((textNode) => {
            const text = textNode.data;
            const textLower = text.toLocaleLowerCase();
            let startIndex = 0;
            let containerFragment: DocumentFragment | null = null;
            let hasMatch = false;

            // Collect all match ranges first
            const ranges: Array<{ start: number; end: number }> = [];
            let idx = textLower.indexOf(lowerQ, startIndex);
            while (idx !== -1) {
                ranges.push({ start: idx, end: idx + lowerQ.length });
                startIndex = idx + lowerQ.length;
                idx = textLower.indexOf(lowerQ, startIndex);
            }

            if (!ranges.length) {
                return;
            }

            containerFragment = document.createDocumentFragment();
            let lastIndex = 0;
            ranges.forEach((r) => {
                if (r.start > lastIndex) {
                    containerFragment!.appendChild(document.createTextNode(text.slice(lastIndex, r.start)));
                }
                const span = document.createElement('span');
                span.className = HIGHLIGHT_CLASS;
                span.textContent = text.slice(r.start, r.end);
                containerFragment!.appendChild(span);
                matches.push(span);
                lastIndex = r.end;
                hasMatch = true;
            });
            if (lastIndex < text.length) {
                containerFragment.appendChild(document.createTextNode(text.slice(lastIndex)));
            }

            if (hasMatch && containerFragment) {
                textNode.replaceWith(containerFragment);
            }
        });

        return matches;
    };

    return { clearHighlights, createHighlights };
};

interface InPageSearchProps {
    containerRef: React.RefObject<HTMLElement>;
    onClose: () => void;
}
const InPageSearch = ({ containerRef, onClose }: InPageSearchProps) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [query, setQuery] = useState<string>('');
    const [matches, setMatches] = useState<HTMLElement[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const { clearHighlights, createHighlights } = useHighlights(containerRef);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                handleClose();
            }
        };
        document.addEventListener('keydown', onKey, true);
        return () => {
            document.removeEventListener('keydown', onKey, true);
        };
    }, []);

    // Update highlights when query changes
    useEffect(() => {
        clearHighlights();
        if (!query || query.length === 0) {
            setMatches([]);
            setActiveIndex(0);
            return;
        }
        const newMatches = createHighlights(query);
        setMatches(newMatches);
        setActiveIndex(newMatches.length ? 0 : 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // Ensure only active match has active class and is scrolled into view
    useEffect(() => {
        const total = matches.length;
        matches.forEach((el, i) => {
            if (i === activeIndex % (total || 1)) {
                el.classList.add(ACTIVE_CLASS);
                // Scroll into view, centering if possible
                el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
            } else {
                el.classList.remove(ACTIVE_CLASS);
            }
        });
    }, [activeIndex, matches]);

    const handleClose = () => {
        clearHighlights();
        onClose();
    };

    const gotoNext = () => {
        if (!matches.length) {
            return;
        }
        setActiveIndex((prev) => (prev + 1) % matches.length);
    };

    const gotoPrev = () => {
        if (!matches.length) {
            return;
        }
        setActiveIndex((prev) => (prev - 1 + matches.length) % matches.length);
    };

    const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                gotoPrev();
            } else {
                gotoNext();
            }
        } else if (e.key === 'Escape') {
            handleClose();
        }
    };

    const ui = (
        <div
            className={css`
                position: fixed;
                top: 10px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 2000;
                background: ${theme.colours.white};
                color: inherit;
                border: 1px solid ${theme.colours.lineGray};
                border-radius: 8px;
                padding: 6px 8px;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
                max-width: 92vw;
            `}
        >
            <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDownInput}
                placeholder="Найти на странице"
                className={css`
                    border: 1px solid ${theme.colours.lineGray};
                    border-radius: 6px;
                    padding: 6px 8px;
                    min-width: 40vw;
                    max-width: 70vw;
                    outline: none;
                    font-size: 14px;
                    background: ${theme.colours.white};
                    color: inherit;
                `}
            />
            <span
                className={css`
                    font-size: 12px;
                    color: ${theme.colours.gray};
                    min-width: 52px;
                    text-align: right;
                `}
            >
                {matches.length ? `${(activeIndex % (matches.length || 1)) + 1}/${matches.length}` : '0/0'}
            </span>
            <Button
                title="Предыдущий"
                onClick={gotoPrev}
                className={css`
                    padding: 6px 8px !important;
                `}
            >
                ↑
            </Button>
            <Button
                title="Следующий"
                onClick={gotoNext}
                className={css`
                    padding: 6px 8px !important;
                `}
            >
                ↓
            </Button>
            <Button
                title="Закрыть"
                onClick={handleClose}
                className={css`
                    padding: 6px 8px !important;
                `}
            >
                ✕
            </Button>
            <style>
                {`
                .${HIGHLIGHT_CLASS} {
                    background-color: #ffea88;
                    color: inherit;
                }
                .${ACTIVE_CLASS} {
                    outline: 2px solid ${theme.colours.primary};
                    background-color: #ffe066;
                }
            `}
            </style>
        </div>
    );

    return ReactDOM.createPortal(ui, document.getElementById('react-portal'));
};

export default InPageSearch;
