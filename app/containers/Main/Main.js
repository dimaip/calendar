import React, { useState, useRef } from 'react';
import { css } from 'emotion';
import { ThemeProvider, useTheme } from 'emotion-theming';
import { useParams, useHistory } from 'react-router-dom';
import ReadingList from './ReadingList';
import HeaderMain from 'containers/Main/HeaderMain';
import Nav from 'components/Nav/Nav';
import HeadingBar from './HeadingBar';
import Loader from 'components/Loader/Loader';
import getTheme from 'styles/theme';
import useDay from 'hooks/useDay';
import BottomNav from 'components/BottomNav/BottomNav';
import Saints from './Saints';
import SectionHeading from './SectionHeading';
import Links from './Links';
import Zoom from 'components/Zoom/Zoom';
import SolidSection from 'components/SolidSection/SolidSection';
import Hymns from './Hymns';
import Sermons from './Sermons';
import ThisDays from './ThisDays';
import useExternalDay from 'hooks/useExternalDay';
import Services from './Services';
import { parseISO, formatISO, subDays, addDays } from 'date-fns';
import useReadings from 'hooks/useReadings';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import BurgerMenu from './BurgerMenu';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import IosPrompt from './IosPrompt';
import PropTypes from 'prop-types';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const BorderedSection = ({ children }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                border-bottom: 0.5px solid ${theme.colours.lineGray};
                margin: 0 -18px 18px -18px;
                padding: 0 18px 1px 18px;
                background-color: white;
            `}
        >
            {children}
        </div>
    );
};

// In order to work with old legacy context API, it can't use hooks
class HeighetUpdater extends React.Component {
    componentDidMount() {
        this.context.swipeableViews.slideUpdateHeight();
    }
    componentDidUpdate() {
        this.context.swipeableViews.slideUpdateHeight();
    }
    render() {
        return this.props.children;
    }
}
HeighetUpdater.contextTypes = {
    swipeableViews: PropTypes.shape({
        slideUpdateHeight: PropTypes.func,
    }),
};

const SwipeableContainer = React.memo(({ date, handleToggleClick, makeHandleClickShift, services }) => {
    const dayQuery = useDay(date);
    const day = dayQuery.data;

    const themeColour = useRef();
    if (day) {
        themeColour.current = day.colour;
    }

    const theme = getTheme(themeColour.current);
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Nav date={date} handleToggleClick={handleToggleClick} handleClickShift={makeHandleClickShift} />
                <div>
                    {dayQuery.status === 'loading' && <Loader />}
                    {dayQuery.status === 'error' && <ErrorMessage500 />}
                    {dayQuery.status === 'success' && (
                        <div>
                            <HeadingBar
                                title={day.title}
                                glas={day.glas}
                                fastName={day.fastName}
                                fastingLevelName={day.fastingLevelName}
                                icon={day.icon}
                            />
                            <InnerContent date={date} services={services} />
                        </div>
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
});

const InnerContent = ({ date, services }) => {
    const dayQuery = useDay(date);
    const day = dayQuery.data;
    const externalDayQuery = useExternalDay(date);
    const { sermons, thisDays } = externalDayQuery.data || {};

    return (
        <HeighetUpdater>
            <div>
                {dayQuery.status === 'loading' && <Loader />}
                {dayQuery.status === 'error' && <ErrorMessage500 />}
                {dayQuery.status === 'success' && (
                    <div>
                        <Zoom>
                            <div
                                className={css`
                                    padding: 0 18px;
                                `}
                            >
                                <SolidSection>
                                    {services ? (
                                        <Services date={date} readings={day.readings || {}} />
                                    ) : (
                                        <>
                                            <SectionHeading>Богослужебные чтения</SectionHeading>
                                            <ReadingList readings={day.readings || {}} />

                                            <BorderedSection>
                                                <SectionHeading>Святые дня</SectionHeading>
                                                <Saints saints={day.saints} date={date} />
                                            </BorderedSection>

                                            <ThisDays thisDays={thisDays} date={date} />
                                            {(day.troparions || day.kondacs || day.velichanija) && (
                                                <BorderedSection>
                                                    <div
                                                        className={css`
                                                            overflow: auto;
                                                        `}
                                                    >
                                                        <SectionHeading>Песнопения</SectionHeading>
                                                    </div>
                                                    <Hymns
                                                        hymns={
                                                            (day.troparions || '') +
                                                            (day.kondacs || '') +
                                                            (day.velichanija || '')
                                                        }
                                                    />
                                                </BorderedSection>
                                            )}
                                            {day.bReadings && Object.keys(day.bReadings).length > 0 && (
                                                <>
                                                    <SectionHeading
                                                        className={css`
                                                            padding-top: 0 !important;
                                                        `}
                                                    >
                                                        Душеполезные чтения
                                                    </SectionHeading>
                                                    <ReadingList brother readings={day.bReadings} />
                                                </>
                                            )}
                                            <Sermons date={date} sermons={sermons} />
                                        </>
                                    )}
                                </SolidSection>
                            </div>
                        </Zoom>
                        {!services && <Links />}
                    </div>
                )}
            </div>
        </HeighetUpdater>
    );
};

const Main = ({ services = false }) => {
    const { date } = useParams();
    // pre-fetch readings
    useReadings(date);
    const [menuShown, setMenuShown] = useState(false);

    const calendarRef = useRef();

    const history = useHistory();
    const setNewDate = dateString => {
        history.push(`/date/${dateString}${services ? '/services' : ''}`);
    };
    const makeHandleClickShift = direction => () => {
        switch (direction) {
            case 'left':
                setNewDate(formatISO(subDays(parseISO(date), 1), { representation: 'date' }));
                break;
            case 'right':
                setNewDate(formatISO(addDays(parseISO(date), 1), { representation: 'date' }));
                break;
        }
    };
    const handleToggleClick = () => {
        calendarRef?.current?.toggleCalendarShown(true);
    };

    const goLeft = makeHandleClickShift('left');
    const goRight = makeHandleClickShift('right');

    const [activeIndex, setActiveIndex] = useState(0);

    const slideRenderer = ({ key, index }) => {
        const indexOffset = index - activeIndex;
        const effectiveDate = formatISO(addDays(parseISO(date), indexOffset), { representation: 'date' });
        return (
            <SwipeableContainer
                key={key}
                date={effectiveDate}
                services={services}
                handleToggleClick={handleToggleClick}
                makeHandleClickShift={makeHandleClickShift}
            />
        );
    };
    return (
        <div>
            <HeaderMain
                calendarRef={calendarRef}
                menuShown={menuShown}
                setMenuShown={setMenuShown}
                setNewDate={setNewDate}
                date={date}
            />
            <div
                className={css`
                    flex-grow: 1;
                `}
            >
                <VirtualizeSwipeableViews
                    index={activeIndex}
                    slideRenderer={slideRenderer}
                    overscanSlideAfter={1}
                    overscanSlideBefore={1}
                    animateHeight
                    onChangeIndex={(index, indexLatest) => {
                        if (index < indexLatest) {
                            setActiveIndex(index);
                            goLeft();
                        } else {
                            setActiveIndex(index);
                            goRight();
                        }
                    }}
                />
            </div>

            <BurgerMenu menuShown={menuShown} setMenuShown={setMenuShown} />
            <BottomNav active={services ? 'services' : 'calendar'} />
            <IosPrompt />
        </div>
    );
};

export default Main;
