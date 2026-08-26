import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

import Button from 'components/Button/Button';

const HIGHLIGHT_CLASS = 'inpage-find-highlight';
const ACTIVE_CLASS = 'inpage-find-active';
const SEARCH_DEBOUNCE_MS = 180;
const MINIMUM_QUERY_LENGTH = 2;

const useHighlights = (containerRef: React.RefObject<HTMLElement>) => {
    const clearHighlights = useCallback(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        const highlighted = Array.from(container.querySelectorAll(`span.${HIGHLIGHT_CLASS}`));
        highlighted.forEach((span) => {
            const parent = span.parentNode;
            if (!parent) {
                return;
            }
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
            parent.normalize();
        });
    }, [containerRef]);

    const createHighlights = useCallback(
        (query: string) => {
            const container = containerRef.current;
            if (!container) {
                return [];
            }
            const matches: HTMLElement[] = [];
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
                acceptNode: (node: Node) => {
                    if (!node.textContent) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    const parentElement = node.parentElement;
                    if (
                        !parentElement ||
                        parentElement.closest('script, style') ||
                        parentElement.classList.contains(HIGHLIGHT_CLASS)
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                },
            });
            const lowerQuery = query.toLocaleLowerCase();
            const toProcess: Text[] = [];
            let current = walker.nextNode();
            while (current) {
                toProcess.push(current as Text);
                current = walker.nextNode();
            }

            toProcess.forEach((textNode) => {
                const text = textNode.data;
                const textLower = text.toLocaleLowerCase();
                let startIndex = 0;
                const ranges: Array<{ start: number; end: number }> = [];
                let matchIndex = textLower.indexOf(lowerQuery, startIndex);
                while (matchIndex !== -1) {
                    ranges.push({ start: matchIndex, end: matchIndex + lowerQuery.length });
                    startIndex = matchIndex + lowerQuery.length;
                    matchIndex = textLower.indexOf(lowerQuery, startIndex);
                }

                if (!ranges.length) {
                    return;
                }

                const containerFragment = document.createDocumentFragment();
                let lastIndex = 0;
                ranges.forEach((range) => {
                    if (range.start > lastIndex) {
                        containerFragment.appendChild(document.createTextNode(text.slice(lastIndex, range.start)));
                    }
                    const span = document.createElement('span');
                    span.className = HIGHLIGHT_CLASS;
                    span.textContent = text.slice(range.start, range.end);
                    containerFragment.appendChild(span);
                    matches.push(span);
                    lastIndex = range.end;
                });
                if (lastIndex < text.length) {
                    containerFragment.appendChild(document.createTextNode(text.slice(lastIndex)));
                }
                textNode.replaceWith(containerFragment);
            });

            return matches;
        },
        [containerRef]
    );

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
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [matches, setMatches] = useState<HTMLElement[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const { clearHighlights, createHighlights } = useHighlights(containerRef);
    const handleClose = useCallback(() => {
        clearHighlights();
        onClose();
    }, [clearHighlights, onClose]);

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
            clearHighlights();
        };
    }, [clearHighlights, handleClose]);

    useEffect(() => {
        if (query.length < MINIMUM_QUERY_LENGTH) {
            setSearchQuery('');
            return undefined;
        }

        const timeoutId = window.setTimeout(() => setSearchQuery(query), SEARCH_DEBOUNCE_MS);
        return () => window.clearTimeout(timeoutId);
    }, [query]);

    // Updating the long service DOM is deliberately delayed until typing pauses.
    useEffect(() => {
        clearHighlights();
        if (!searchQuery) {
            setMatches([]);
            setActiveIndex(0);
            return;
        }
        const newMatches = createHighlights(searchQuery);
        setMatches(newMatches);
        setActiveIndex(0);
    }, [clearHighlights, createHighlights, searchQuery]);

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
                placeholder="Найти (от 2 букв)"
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
