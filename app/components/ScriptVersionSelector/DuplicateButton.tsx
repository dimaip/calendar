import React, { useContext } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Button from 'components/Button/Button';
import { Version } from 'state/scriptVersionsState';
import Duplicate from 'components/svgs/Duplicate';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';

import { useDuplicateVersion } from './useDuplicateVersion';

export const DuplicateButton = ({ serviceId, version }: { serviceId: string; version: Version }) => {
    const theme = useTheme();
    const { setIsOpen } = useContext(DotsMenuContext);
    const duplicateVersion = useDuplicateVersion(serviceId);
    return (
        <Button
            className={css`
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
            `}
            onClick={(e: Event) => {
                e.stopPropagation();
                setIsOpen(false);
                duplicateVersion(version);
            }}
        >
            <span
                className={css`
                    font-size: 13px;
                    vertical-align: text-bottom;
                `}
            >
                <Duplicate
                    size={20}
                    colour={theme.colours.gray}
                    style={{ verticalAlign: 'text-bottom', marginRight: 3 }}
                />{' '}
                Дублировать
            </span>
        </Button>
    );
};
