import React from 'react';
import Parts from 'components/Parts/Parts';
import MdxLoader from 'containers/Service/Texts/MdxLoader';
import { H3 } from 'components/Typography/Typography';

const DefatulStihiriAfterPsalm50 = ({ date }) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0) {
        return <MdxLoader src="Matins/StihiriAfterPsalm50/Sunday" />;
    }
    return null;
};

const StihiriAfterPsalm50 = ({ date }): JSX.Element => (
    <>
        <H3>Стихиры после 50 псалма</H3>
        <Parts
            date={date}
            partNames={['matins.Стихиры после 50 псалма']}
            alwaysShowFallback
            serviceType="Утреня"
            fallback={<DefatulStihiriAfterPsalm50 date={date} />}
        />
    </>
);

export default StihiriAfterPsalm50;
