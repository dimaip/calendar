import React from 'react';

import SettingsButton from 'components/SettingsButton/SettingsButton';
import { FindInPageButton } from 'components/FindInPageButton/FindInPageButton';
import Share from 'components/Share/Share';

const LayoutOverflowMenuItems = ({ dayTitle, onFindOpen }: { dayTitle: string; onFindOpen: () => void }) => (
    <>
        <SettingsButton />
        <FindInPageButton onOpen={onFindOpen} />
        <Share title="Православное богослужение на русском языке" text={dayTitle} url={window.location.href} />
    </>
);

export default LayoutOverflowMenuItems;
