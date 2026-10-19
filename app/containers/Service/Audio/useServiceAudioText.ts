import { useTheme } from 'emotion-theming';
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

import { findSpokenWord, serviceTextTokens } from 'domain/serviceAudioTimings';
import type { ServiceAudioTimings } from 'domain/serviceAudioTimings';
import type { AppTheme } from 'styles/AppTheme';

interface TimedTextWord {
    start: number;
    end: number;
    range: Range;
    paragraph: HTMLParagraphElement;
    section: string;
}

export const useServiceAudioText = (
    timings: ServiceAudioTimings | null,
    mediaRef: RefObject<HTMLAudioElement>,
    enabled: boolean,
    started: boolean,
    expanded: boolean
) => {
    const theme = useTheme<AppTheme>();
    const [target, setTarget] = useState<TimedTextWord | null>(null);
    const [following, setFollowing] = useState(true);
    const [ready, setReady] = useState(false);
    const [unrecorded, setUnrecorded] = useState(false);
    const followingRef = useRef(true);
    const followRequestRef = useRef<((position?: number) => void) | null>(null);

    useEffect(() => {
        const root = document.getElementById('service-text');
        const audio = mediaRef.current;
        if (!root || !audio || !enabled || !timings) {
            setReady(false);
            setTarget(null);
            followingRef.current = true;
            setFollowing(true);
            setUnrecorded(false);
            return;
        }
        let words: TimedTextWord[] = [];
        let paragraphs: HTMLParagraphElement[] = [];
        let current: TimedTextWord | null = null;
        let frame = 0;
        let scrollFrame = 0;
        let scrollTimer = 0;
        let alignOnNextWord = !audio.paused;
        // Route restoration and smooth scrolling can emit scroll events over many frames.
        let autoScrollUntil = performance.now() + 800;
        let lastScrollY = window.scrollY;
        const nativeHighlight = typeof Highlight !== 'undefined' && 'highlights' in CSS;
        const highlight = nativeHighlight ? new Highlight() : null;
        if (highlight) CSS.highlights.set('service-audio-current', highlight);
        const overlay = document.createElement('div');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.style.cssText = 'position:fixed;pointer-events:none;z-index:3;border-radius:3px;display:none';
        overlay.style.backgroundColor = theme.colours.readingHighlightOverlay;
        if (!nativeHighlight) document.body.appendChild(overlay);

        const clearHighlight = () => {
            // Clear while still registered so WebKit repaints the previous word,
            // including at line breaks: https://bugs.webkit.org/show_bug.cgi?id=297125
            highlight?.clear();
            overlay.style.display = 'none';
        };
        const readingBounds = () => ({
            top: (document.querySelector('header')?.getBoundingClientRect().bottom ?? 50) + 12,
            bottom:
                document.querySelector('[data-service-audio-player]')?.getBoundingClientRect().top ??
                window.innerHeight - 80,
        });
        const updateReadingPosition = () => {
            scrollFrame = 0;
            const { top, bottom } = readingBounds();
            const paragraph = paragraphs.find((element) => {
                const rect = element.getBoundingClientRect();
                return rect.bottom > top + 12 && rect.top < bottom;
            });
            if (!paragraph) {
                setTarget(null);
                setUnrecorded(false);
                return;
            }
            const candidates = words.filter((word) => word.paragraph === paragraph);
            const word =
                candidates.find((candidate) => {
                    const rect = candidate.range.getBoundingClientRect();
                    return rect.top >= top - 2 && rect.bottom <= bottom;
                }) ?? null;
            setTarget(word);
            setUnrecorded(candidates.length === 0);
        };
        const queueReadingPosition = () => {
            if (scrollTimer || scrollFrame) return;
            // Read the latest viewport at most five times per second, including
            // one final update after scrolling stops.
            scrollTimer = window.setTimeout(() => {
                scrollTimer = 0;
                scrollFrame = window.requestAnimationFrame(updateReadingPosition);
            }, 200);
        };
        const paint = () => {
            const word = started && audio.readyState > 0 ? findSpokenWord(words, audio.currentTime) : null;
            if (word !== current) {
                current = word;
                clearHighlight();
                if (word) {
                    if (highlight) highlight.add(word.range);
                    else {
                        const rect = word.range.getBoundingClientRect();
                        Object.assign(overlay.style, {
                            display: 'block',
                            left: `${rect.left}px`,
                            top: `${rect.top}px`,
                            width: `${rect.width}px`,
                            height: `${rect.height}px`,
                        });
                    }
                }
            }
            if (word && followingRef.current && !expanded && !audio.paused) {
                const rect = word.range.getBoundingClientRect();
                const { top, bottom } = readingBounds();
                const readingLine = top + (bottom - top) * 0.3;
                // Advance with each new line, before the spoken text reaches the
                // player. A line-sized tolerance avoids chasing every word.
                if (
                    alignOnNextWord ||
                    (performance.now() > autoScrollUntil &&
                        (rect.top < top || rect.top > readingLine + Math.max(12, rect.height * 0.7)))
                ) {
                    alignOnNextWord = false;
                    autoScrollUntil = performance.now() + 800;
                    const distance = rect.top - readingLine;
                    window.scrollBy({
                        top: distance,
                        behavior:
                            Math.abs(distance) > window.innerHeight ||
                            window.matchMedia('(prefers-reduced-motion: reduce)').matches
                                ? 'auto'
                                : 'smooth',
                    });
                }
            }
        };
        const tick = () => {
            paint();
            frame = audio.paused ? 0 : window.requestAnimationFrame(tick);
        };
        const onPlaying = () => {
            if (!frame) frame = window.requestAnimationFrame(tick);
        };
        const onPlay = () => {
            followingRef.current = true;
            setFollowing(true);
            alignOnNextWord = true;
        };
        const onPause = () => {
            window.cancelAnimationFrame(frame);
            frame = 0;
            paint();
        };
        const detach = (event: Event) => {
            if (
                event.target instanceof Element &&
                event.target.closest('button,input,select,[role="dialog"],[data-service-audio-player]')
            )
                return;
            followingRef.current = false;
            setFollowing(false);
            alignOnNextWord = false;
            queueReadingPosition();
        };
        const onKey = (event: KeyboardEvent) => {
            if (['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End', ' '].includes(event.key)) detach(event);
        };
        const onScroll = () => {
            const automatic = performance.now() < autoScrollUntil;
            if (automatic) autoScrollUntil = performance.now() + 200;
            if (!expanded && !automatic && Math.abs(window.scrollY - lastScrollY) > 4) {
                followingRef.current = false;
                setFollowing(false);
            }
            lastScrollY = window.scrollY;
            queueReadingPosition();
            if (!nativeHighlight) {
                current = null;
                paint();
            }
        };
        followRequestRef.current = (position) => {
            followingRef.current = true;
            setFollowing(true);
            alignOnNextWord = false;
            const seconds = position ?? audio.currentTime;
            const word =
                findSpokenWord(words, seconds) ?? words.find((candidate) => candidate.start >= seconds) ?? words[0];
            if (word) {
                const { top, bottom } = readingBounds();
                autoScrollUntil = performance.now() + 800;
                const distance = word.range.getBoundingClientRect().top - top - (bottom - top) * 0.3;
                window.scrollBy({
                    top: distance,
                    behavior:
                        Math.abs(distance) > window.innerHeight ||
                        window.matchMedia('(prefers-reduced-motion: reduce)').matches
                            ? 'auto'
                            : 'smooth',
                });
            }
            current = null;
            paint();
        };
        const rebuild = () => {
            clearHighlight();
            current = null;
            words = [];
            paragraphs = Array.from(root.querySelectorAll('p')).filter(
                (paragraph) => paragraph.getClientRects().length > 0
            );
            const available = new Map<string, ServiceAudioTimings['blocks']>();
            for (const block of timings.blocks) {
                const key = serviceTextTokens(block.text)
                    .map((token) => token.value)
                    .join(' ');
                const occurrences = available.get(key) ?? [];
                occurrences.push(block);
                available.set(key, occurrences);
            }
            for (const paragraph of paragraphs) {
                const tokens = serviceTextTokens(paragraph.textContent ?? '');
                const block = available.get(tokens.map((token) => token.value).join(' '))?.shift();
                if (!block) continue;
                const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
                const nodes: Array<{ node: Node; start: number; end: number }> = [];
                let node = walker.nextNode();
                let offset = 0;
                while (node) {
                    const length = node.textContent?.length ?? 0;
                    nodes.push({ node, start: offset, end: offset + length });
                    offset += length;
                    node = walker.nextNode();
                }
                for (const timing of block.words) {
                    const token = tokens[timing.index];
                    if (!token) continue;
                    const first = nodes.find((entry) => token.start >= entry.start && token.start < entry.end);
                    const last = nodes.find((entry) => token.end > entry.start && token.end <= entry.end);
                    if (!first || !last) continue;
                    const range = document.createRange();
                    range.setStart(first.node, token.start - first.start);
                    range.setEnd(last.node, token.end - last.start);
                    words.push({ range, paragraph, section: block.section, start: timing.start, end: timing.end });
                }
            }
            words.sort((a, b) => a.start - b.start);
            setReady(words.length > 0);
            updateReadingPosition();
            paint();
        };
        rebuild();
        const observer = new MutationObserver(rebuild);
        observer.observe(root, { childList: true, characterData: true, subtree: true });
        window.addEventListener('wheel', detach, { passive: true });
        window.addEventListener('touchmove', detach, { passive: true });
        window.addEventListener('keydown', onKey);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', queueReadingPosition);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('playing', onPlaying);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('timeupdate', paint);
        audio.addEventListener('seeked', paint);
        if (!audio.paused) onPlaying();
        return () => {
            observer.disconnect();
            clearHighlight();
            if (highlight) CSS.highlights.delete('service-audio-current');
            overlay.remove();
            window.cancelAnimationFrame(frame);
            window.cancelAnimationFrame(scrollFrame);
            window.clearTimeout(scrollTimer);
            window.removeEventListener('wheel', detach);
            window.removeEventListener('touchmove', detach);
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', queueReadingPosition);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('playing', onPlaying);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('timeupdate', paint);
            audio.removeEventListener('seeked', paint);
            followRequestRef.current = null;
        };
    }, [timings, mediaRef, enabled, started, expanded, theme.colours.readingHighlightOverlay]);

    const followAudio = (position?: number) => followRequestRef.current?.(position);
    return { target, following, ready, unrecorded, followAudio };
};
