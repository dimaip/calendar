import React, { useState } from 'react';
import { css } from 'emotion';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import ButtonBox from 'components/ButtonBox/ButtonBox';

interface PrayerSetupProps {
    onComplete: () => void;
}

const PrayerSetup = ({ onComplete }: PrayerSetupProps) => {
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

    return (
        <div
            className={css`
                padding: 16px 0;
            `}
        >
            <p
                className={css`
                    margin-bottom: 16px;
                    opacity: 0.7;
                    font-size: 14px;
                `}
            >
                По какому правилу вы хотите молиться каждый день?
            </p>

            <label
                className={css`
                    display: flex;
                    align-items: center;
                    padding: 12px 0;
                    cursor: pointer;
                    user-select: none;
                `}
            >
                <input
                    type="checkbox"
                    checked={trackMorning}
                    onChange={(e) => setTrackMorning(e.target.checked)}
                    className={css`
                        width: 20px;
                        height: 20px;
                        margin-right: 12px;
                    `}
                />
                Утреннее правило
            </label>

            <label
                className={css`
                    display: flex;
                    align-items: center;
                    padding: 12px 0;
                    cursor: pointer;
                    user-select: none;
                `}
            >
                <input
                    type="checkbox"
                    checked={trackEvening}
                    onChange={(e) => setTrackEvening(e.target.checked)}
                    className={css`
                        width: 20px;
                        height: 20px;
                        margin-right: 12px;
                    `}
                />
                Вечернее правило
            </label>

            <ButtonBox
                title="Сохранить"
                onClick={handleSave}
                className={css`
                    border-radius: 6px;
                    background-color: #4169e1 !important;
                    text-align: center;
                    margin-top: 16px !important;
                    cursor: pointer;
                    color: white;
                    opacity: ${saving ? 0.6 : 1};
                `}
            >
                {saving ? 'Сохранение...' : 'Сохранить'}
            </ButtonBox>
        </div>
    );
};

export default PrayerSetup;
