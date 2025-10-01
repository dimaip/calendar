import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { useRecoilState } from 'recoil';

import zoomState from '../../state/zoomState';

interface AppTheme {
    colours: {
        primary: string;
        primaryTint: string;
        lightGray: string;
        gray: string;
        darkGray: string;
        bgGrayLight: string;
        bgGray: string;
        lineGray: string;
        red: string;
        white: string;
        black: string;
        blue: string;
    };
}

/* slider styles are created inside the component to access theme */
const ZoomControl = (): JSX.Element | null => {
    const [zoom, setZoom] = useRecoilState(zoomState);
    const theme = useTheme<AppTheme>();
    const sliderClass = css`
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        max-width: 360px;
        height: 4px;
        border-radius: 2px;
        background: ${theme.colours.lineGray};
        margin: 12px 16px;
        display: block;

        &:focus {
            outline: none;
        }

        /* WebKit */
        &::-webkit-slider-runnable-track {
            height: 4px;
            border-radius: 2px;
            background: ${theme.colours.lineGray};
        }
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${theme.colours.white};
            border: 1px solid ${theme.colours.lineGray};
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
            margin-top: -10px; /* centers the thumb */
        }

        /* Firefox */
        &::-moz-range-track {
            height: 4px;
            border-radius: 2px;
            background: ${theme.colours.lineGray};
        }
        &::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${theme.colours.white};
            border: 1px solid ${theme.colours.lineGray};
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        /* focus ring for accessibility */
        &:focus::-webkit-slider-thumb {
            border-color: ${theme.colours.primary};
            box-shadow: 0 0 0 3px rgba(65, 105, 225, 0.2);
        }
        &:focus::-moz-range-thumb {
            border-color: ${theme.colours.primary};
            box-shadow: 0 0 0 3px rgba(65, 105, 225, 0.2);
        }
    `;

    const rafRef = React.useRef<number | null>(null);
    const pendingValueRef = React.useRef<number>(zoom);

    const scheduleZoomUpdate = (nextValue: number) => {
        pendingValueRef.current = nextValue;
        if (rafRef.current !== null) {
            return;
        }
        rafRef.current = window.requestAnimationFrame(() => {
            rafRef.current = null;
            setZoom(pendingValueRef.current);
        });
    };

    React.useEffect(() => {
        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div
                className={css`
                    text-align: center;
                    font-size: 24px;
                `}
            >
                {zoom >= 1 ? (zoom * 100).toPrecision(3) : (zoom * 100).toPrecision(2)}%
            </div>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 4px;
                `}
            >
                <span
                    aria-hidden="true"
                    className={css`
                        font-size: 14px;
                        color: ${theme.colours.gray};
                        width: 24px;
                        text-align: center;
                        user-select: none;
                    `}
                >
                    A
                </span>
                <input
                    type="range"
                    min={0.5}
                    max={3}
                    step={0.05}
                    value={zoom}
                    onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!Number.isNaN(value)) {
                            const clamped = Math.min(3, Math.max(0.5, parseFloat(value.toFixed(2))));
                            if (clamped !== zoom) {
                                scheduleZoomUpdate(clamped);
                            }
                        }
                    }}
                    className={sliderClass}
                    aria-label="Размер текста"
                />
                <span
                    aria-hidden="true"
                    className={css`
                        font-size: 22px;
                        color: ${theme.colours.gray};
                        width: 24px;
                        text-align: center;
                        user-select: none;
                    `}
                >
                    A
                </span>
            </div>
        </div>
    );
};
export default ZoomControl;
