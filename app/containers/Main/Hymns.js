import React from 'react';
import RteText from 'components/RteText/RteText';
import { css } from 'emotion';
import BorderedSection from './BorderedSection';
import SectionHeading from './SectionHeading';
import LanguageSwitcher from 'containers/Service/LanguageSwitcher';
import Parts from 'components/Parts/Parts';

const Layout = ({ children }) => (
    <div
        className={css`
            margin-top: -24px;
            margin-bottom: 24px;
        `}
    >
        <BorderedSection>
            <div
                className={css`
                    overflow: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                `}
            >
                <SectionHeading>Песнопения</SectionHeading>
                <div>
                    <LanguageSwitcher />
                </div>
            </div>
            {children}
        </BorderedSection>
    </div>
);

const Hymns = ({ date }) => (
    <Parts Layout={Layout} date={date} partNames={['shared.Тропари', 'shared.Кондаки', 'shared.Величания']} />
);
export default Hymns;
