import { useTheme } from 'emotion-theming';
import { useEffect } from 'react';
import { css } from 'emotion';

const formatTime = seconds => new Date(1000 * parseInt(seconds)).toISOString().substr(14, 5);

// Just a tiny little helper from back in the days
const el = (tagName, attributes, children) => {
    if (typeof tagName !== 'string') {
        throw new Error('tagName must be a string');
    }

    var element = document.createElement(tagName);

    if (attributes && typeof attributes === 'object') {
        Object.keys(attributes).forEach(function(i) {
            // Set event handlers
            if (/on[A-Z][a-z]/.test(i)) {
                element[i.toLowerCase()] = attributes[i];
            } else {
                // Set attributes
                element.setAttribute(i, attributes[i]);
            }
        });
    }

    if (typeof children === 'string') {
        element.innerHTML = children;
    } else if (children instanceof Array) {
        children.forEach(function(child) {
            element.appendChild(child);
        });
    }

    return element;
};

const augmentAudio = (audioElement, theme) => {
    let touching = false;
    if (!audioElement.hasAttribute('controls')) {
        return;
    }
    audioElement.removeAttribute('controls');

    const played = el('div', {
        class: css`
            position: absolute;
            width: 0%;
            height: 3px;
            top: 3px;
            background-color: ${theme.colours.primary};
        `,
    });
    const playhead = el('div', {
        class: css`
            position: absolute;
            left: calc(0% - 4px);
            width: 10px;
            height: 10px;
            border-radius: 5px;
            top: 0px;
            background-color: ${theme.colours.primary};
        `,
    });
    const timeline = el('div', {
        class: css`
            width: 100%;
            position: absolute;
            height: 3px;
            top: 3px;
            opacity: 0.4;
            background-color: ${theme.colours.primary};
        `,
    });
    const timelineWrapper = el(
        'div',
        {
            class: css`
                width: 100%;
                height: 10px;
                position: relative;
                cursor: pointer;
            `,
        },
        [timeline, played, playhead]
    );

    const play = el(
        'button',
        {
            class: css`
                line-height: 0;
                fill: ${theme.colours.darkGray};
                margin-left: -8px;
                cursor: pointer;
            `,
        },
        '<svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M152.443 136.417L359.557 255.99 152.443 375.583z"/></svg>'
    );
    const currentTime = document.createElement('span');
    const separator = document.createElement('span');
    separator.innerText = ' / ';
    const totalTime = document.createElement('span');
    const timer = el(
        'div',
        {
            class: css`
                color: ${theme.colours.gray};
                font-size: 12px;
                margin-top: -8px;
                text-align: right;
            `,
        },
        [currentTime, el('span', {}, ' / '), totalTime]
    );
    const ui = el('div', {}, [
        el(
            'div',
            {
                class: css`
                    display: flex;
                    align-items: center;
                `,
            },
            [play, timelineWrapper]
        ),
        timer,
    ]);
    audioElement.parentNode.insertBefore(ui, audioElement);

    const handlePlay = () => {
        play.innerHTML = audioElement.paused
            ? '<svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M162.642 148.337h56.034v215.317h-56.034V148.338zM293.356 148.337h56.002v215.317h-56.002V148.338z"/></svg>'
            : '<svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M152.443 136.417L359.557 255.99 152.443 375.583z"/></svg>';
        audioElement.paused ? audioElement.play() : audioElement.pause();
    };
    play.addEventListener('click', handlePlay);

    const updateUI = time => {
        requestAnimationFrame(() => {
            const effectiveTime = Math.max(
                0,
                Math.min(audioElement.duration, typeof time === 'number' ? time : audioElement.currentTime)
            );
            currentTime.innerText = formatTime(effectiveTime);
            totalTime.innerText = formatTime(audioElement.duration);
            const percentPlayed = (effectiveTime / audioElement.duration) * 100;
            played.style.width = `${percentPlayed}%`;
            playhead.style.left = `calc(${percentPlayed}% - 4px)`;
        });
    };

    const updateUIFromTime = () => {
        if (!touching) {
            updateUI();
        }
    };

    audioElement.addEventListener('canplaythrough', updateUIFromTime, false);
    audioElement.addEventListener('timeupdate', updateUIFromTime, false);
    audioElement.addEventListener('ended', () => {
        play.innerHTML =
            '<svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M152.443 136.417L359.557 255.99 152.443 375.583z"/></svg>';
    });

    const preventTouch = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    ui.addEventListener('touchmove', preventTouch);
    ui.addEventListener('mousemove', preventTouch);

    const startTouch = () => {
        touching = true;
    };
    timelineWrapper.addEventListener('touchstart', startTouch);
    timelineWrapper.addEventListener('mousedown', startTouch);

    const getTimeFromEvent = event => {
        const targetRatio =
            ((event.changedTouches ? event.changedTouches[0].clientX : event.clientX) -
                timelineWrapper.getBoundingClientRect().left) /
            timelineWrapper.getBoundingClientRect().width;

        return audioElement.duration * targetRatio;
    };

    const touchEnd = event => {
        touching = false;
        audioElement.currentTime = getTimeFromEvent(event);
    };
    timelineWrapper.addEventListener('touchend', touchEnd);
    timelineWrapper.addEventListener('touchcancel', touchEnd);
    timelineWrapper.addEventListener('mouseup', touchEnd);
    document.addEventListener('mouseup', () => {
        touching = false;
    });

    const touchMove = event => {
        if (touching) {
            updateUI(getTimeFromEvent(event));
        }
    };
    timelineWrapper.addEventListener('touchmove', touchMove);
    timelineWrapper.addEventListener('mousemove', touchMove);
};

const useAudio = ref => {
    const theme = useTheme();
    useEffect(() => {
        if (ref?.current) {
            ref.current.querySelectorAll('audio').forEach(audioElement => {
                augmentAudio(audioElement, theme);
            });
        }
    }, []);
};
export default useAudio;
