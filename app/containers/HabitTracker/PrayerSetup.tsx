import React, { useState } from 'react';
import { css } from 'emotion';
import { useMutation, useQuery } from 'convex/react';
import { useTheme } from 'emotion-theming';
import type { AppTheme } from 'styles/AppTheme';

import { api } from '../../../convex/_generated/api';

interface PrayerSetupProps {
    onComplete: () => void;
    className?: string;
}

const PrayerSetup = ({ onComplete, className = '' }: PrayerSetupProps) => {
    const theme = useTheme<AppTheme>();
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
    const primary = theme.colours?.primary || '#ae831a';
    const text = theme.colours?.darkGray || '#201f24';
    const buttonText = theme.colours?.white === '#201f24' ? '#201f24' : '#ffffff';

    return (
        <div
            className={`${css`
                display: flex;
                min-height: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 28px 12px;
                background: ${theme.colours?.white || '#ffffff'};
                color: ${text};
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
                    gap: 12px;
                    min-width: 220px;
                    padding: 5px 0;
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
                        width: 18px;
                        height: 18px;
                        flex-shrink: 0;
                        margin: 0;
                        cursor: pointer;
                        accent-color: ${primary};
                    `}
                />
                <span
                    className={css`
                        color: ${text};
                    `}
                >
                    Утренняя молитва
                </span>
            </label>

            <label
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 220px;
                    padding: 5px 0;
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
                        width: 18px;
                        height: 18px;
                        flex-shrink: 0;
                        margin: 0;
                        cursor: pointer;
                        accent-color: ${primary};
                    `}
                />
                <span
                    className={css`
                        color: ${text};
                    `}
                >
                    Вечерняя молитва
                </span>
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
                    background-color: ${primary};
                    color: ${buttonText};
                    font-size: 15px;
                    line-height: 46px;
                    text-align: center;
                    cursor: pointer;
                    opacity: ${disabled ? 0.55 : 1};
                `}
            >
                {saving ? 'Сохранение…' : 'Сохранить'}
            </button>
        </div>
    );
};

export default PrayerSetup;
