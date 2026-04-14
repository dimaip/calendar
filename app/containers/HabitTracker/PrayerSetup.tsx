import React, { useState } from 'react';
import { css } from 'emotion';
import { useMutation, useQuery } from 'convex/react';

import { api } from '../../../convex/_generated/api';

interface PrayerSetupProps {
    onComplete: () => void;
    className?: string;
}

const GOLD = '#ae831a';
const DARK = '#201f24';
const TEXT = '#fffffd';

const PrayerSetup = ({ onComplete, className = '' }: PrayerSetupProps) => {
    const settings = useQuery(api.habitTracker.getSettings);
    const saveSettings = useMutation(api.habitTracker.saveSettings);

    const [trackMorning, setTrackMorning] = useState(settings?.habitTracker?.trackMorning ?? true);
    const [trackEvening, setTrackEvening] = useState(settings?.habitTracker?.trackEvening ?? true);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSettings({ trackMorning, trackEvening });
            onComplete();
        } finally {
            setSaving(false);
        }
    };

    const disabled = saving || (!trackMorning && !trackEvening);

    return (
        <div
            className={`${css`
                display: flex;
                min-height: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 28px 12px;
                color: ${TEXT};
            `} ${className}`}
        >
            <h2
                className={css`
                    max-width: 287px;
                    margin-bottom: 20px;
                    font-size: 25px;
                    font-weight: bold;
                    line-height: 1.2;
                    text-align: center;
                `}
            >
                В какое время
                <br />
                вы хотели бы молиться?
            </h2>

            <label
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-width: 165px;
                    padding: 3px 0;
                    font-size: 16px;
                    line-height: 1.2;
                    cursor: pointer;
                    user-select: none;
                `}
            >
                <input
                    type="checkbox"
                    checked={trackMorning}
                    onChange={(e) => setTrackMorning(e.target.checked)}
                    className={css`
                        width: 14px;
                        height: 14px;
                        flex-shrink: 0;
                        margin: 0;
                        appearance: none;
                        border: 1px solid ${GOLD};
                        border-radius: 1px;
                        background: transparent;
                        color: ${GOLD};
                        cursor: pointer;

                        &:checked::after {
                            content: '✓';
                            display: block;
                            margin-top: -4px;
                            font-size: 15px;
                            line-height: 14px;
                            text-align: center;
                        }
                    `}
                />
                Утренняя молитва
            </label>

            <label
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-width: 165px;
                    padding: 3px 0;
                    font-size: 16px;
                    line-height: 1.2;
                    cursor: pointer;
                    user-select: none;
                `}
            >
                <input
                    type="checkbox"
                    checked={trackEvening}
                    onChange={(e) => setTrackEvening(e.target.checked)}
                    className={css`
                        width: 14px;
                        height: 14px;
                        flex-shrink: 0;
                        margin: 0;
                        appearance: none;
                        border: 1px solid ${GOLD};
                        border-radius: 1px;
                        background: transparent;
                        color: ${GOLD};
                        cursor: pointer;

                        &:checked::after {
                            content: '✓';
                            display: block;
                            margin-top: -4px;
                            font-size: 15px;
                            line-height: 14px;
                            text-align: center;
                        }
                    `}
                />
                Вечерняя молитва
            </label>

            <button
                type="button"
                title="Сохранить"
                disabled={disabled}
                onClick={() => {
                    void handleSave();
                }}
                className={css`
                    width: 100%;
                    max-width: 350px;
                    height: 46px;
                    margin-top: 52px;
                    border-radius: 8px;
                    background-color: ${GOLD};
                    color: ${DARK};
                    font-size: 15px;
                    line-height: 46px;
                    text-align: center;
                    text-transform: uppercase;
                    cursor: pointer;
                    opacity: ${disabled ? 0.55 : 1};
                `}
            >
                {saving ? 'СОХРАНЕНИЕ...' : 'СОХРАНИТЬ'}
            </button>
        </div>
    );
};

export default PrayerSetup;
