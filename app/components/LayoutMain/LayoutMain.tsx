import React, { useState, useRef } from 'react';
import { css } from 'emotion';
import { useParams, useHistory } from 'react-router-dom';
import HeaderMain from 'containers/Main/HeaderMain';
import BottomNav from 'components/BottomNav/BottomNav';
import BurgerMenu from 'containers/Main/BurgerMenu';

const LayoutMain = React.memo(
    ({ services = false, children }: { services?: boolean; children: React.ReactNode }): JSX.Element => {
        const { date } = useParams();
        const [menuShown, setMenuShown] = useState(false);

        const calendarRef = useRef();

        const history = useHistory();
        const setNewDate = (dateString) => {
            history.push(`/date/${dateString}${services ? '/services' : ''}`);
        };

        return (
            <>
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
                        max-width: 640px;
                        margin: 0 auto;
                        padding: 24px 12px;
                        height: 100%;
                    `}
                >
                    {children}
                </div>

                <BurgerMenu menuShown={menuShown} setMenuShown={setMenuShown} />
                <BottomNav active={services ? 'services' : 'calendar'} />
            </>
        );
    }
);
export default LayoutMain;
