import { useAddNewVersion } from 'components/ScriptVersionSelector/useAddNewVersion';
import { useTheme } from 'emotion-theming';
import React, { useEffect, useState } from 'react';
import ReactJoyride, { EVENTS } from 'react-joyride';
import { useRecoilState } from 'recoil';
import scriptVersionSelectorIsActiveState from 'state/scriptVersionSelectorIsActiveState';
import tourDismissedState from 'state/tourPromptDismissedState';

export const Tour = ({ serviceId }: { serviceId: string }): JSX.Element | null => {
    const theme = useTheme();
    const [run, setRun] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRun(true);
        }, 1000);
    }, []);

    const [stepIndex, setStepIndex] = useState(0);

    const [_, setScriptVersionSelectorIsActive] = useRecoilState(scriptVersionSelectorIsActiveState);

    const addNewVersion = useAddNewVersion(serviceId);

    const [tourDismissed, setTourDismissed] = useRecoilState(tourDismissedState);

    if (tourDismissed) {
        return null;
    }

    return (
        <ReactJoyride
            stepIndex={stepIndex}
            debug
            run={run}
            continuous
            showSkipButton
            showProgress
            styles={{
                options: {
                    zIndex: 1300,
                    arrowColor: theme.colours.blue,
                    backgroundColor: theme.colours.blue,
                    primaryColor: theme.colours.blue,
                    textColor: '#ffffff',
                },
            }}
            locale={{ last: 'На этом всё!', next: 'Дальше', open: 'Редактор чинов', skip: 'Закрыть' }}
            callback={({ action, index, status, type }) => {
                if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
                    setTimeout(() => {
                        setStepIndex(index + 1);
                    }, 0);
                    if (index === 0) {
                        setScriptVersionSelectorIsActive(true);
                    }
                    if (index === 1) {
                        addNewVersion('Личное правило');
                    }
                    if (index === 6) {
                        setScriptVersionSelectorIsActive(true);
                    }
                    if (index === 7) {
                        document.querySelector('.scriptVersionSelector-dotsMenu')?.click();
                    }
                }
                if (type === 'tour:end') {
                    setTourDismissed(true);
                }
                if (type === 'tooltip' && index === 3) {
                    setTimeout(() => {
                        window.scrollBy({ top: -100, behavior: 'smooth' });
                    }, 500);
                }
                if (type === 'tooltip' && index === 4) {
                    setTimeout(() => {
                        window.scrollBy({ top: -100, behavior: 'smooth' });
                    }, 500);
                }
            }}
            steps={[
                {
                    target: '.scriptVersionSelector',
                    content: 'Нажмите чтобы редактировать чин',
                    placementBeacon: 'right',
                    placement: 'bottom',
                    disableBeacon: false,
                },
                {
                    target: '.scriptVersionSelector-input',
                    content: 'Создайте свой вариант молитвенного правила',
                    placementBeacon: 'left',
                    placement: 'left',
                    disableBeacon: true,
                    offset: 0,
                },
                {
                    target: '.scriptEditorToggle',
                    content: 'Здесь👆🏻 отображается название чина, который вы только что создали',
                    disableBeacon: true,
                    offset: 0,
                    spotlightPadding: 0,
                },
                {
                    target: '.mdxLoader-hide',
                    content: 'Если вы не используете эту молитву, ее можно скрыть',
                    disableBeacon: true,
                },
                {
                    target: '.customPrayers',
                    content: 'А здесь – добавить молитву из предложенного списка или вставить свой текст молитвы',
                    disableBeacon: true,
                    offset: 0,
                },
                {
                    target: '.scriptEditorToggle-close',
                    content: 'Нажмите сюда чтобы вернуться в исходный вариант чина',
                    disableBeacon: true,
                    offset: 0,
                },
                {
                    target: '.scriptVersionSelector',
                    content:
                        'Чтобы поделиться своим молитвенным правилом, вернитесь в раздел меню с чинопоследованиями',
                    disableBeacon: true,
                    offset: 0,
                },
                {
                    target: '.scriptVersionSelector-dotsMenu',
                    content: 'Нажмите на три точки, чтобы попасть в меню управления чином',
                    disableBeacon: true,
                    offset: 0,
                },
                {
                    target: '.scriptVersionSelector-share',
                    content:
                        'Нажмите сюда и получите ссылку на чин. Вы можете поделиться ей с другими, чтобы молиться вместе',
                    disableBeacon: true,
                    offset: 0,
                },
            ]}
        />
    );
};
