import LayoutInner from 'components/LayoutInner/LayoutInner';
import Loader from 'components/Loader/Loader';
import ErrorMessage500 from 'components/ErrorMessage500/ErrorMessage500';
import useHymns from 'hooks/useHymns';
import React, { useState } from 'react';
import SolidSection from 'components/SolidSection/SolidSection';
import Input from 'components/Input/Input';
import Fuse from 'fuse.js';
import LanguageSwitcher from 'containers/Service/LanguageSwitcher';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

import { HymnButton } from './HymnButton';

export const Hymns = () => {
    const theme = useTheme();
    const { data: hymns, status } = useHymns();
    const [searchTerm, setSearchTerm] = useState('');
    const fuse = new Fuse(hymns || [], {
        keys: ['title', 'text'],
    });

    const searchResults = searchTerm.length > 0 ? fuse.search(searchTerm) : hymns || [];
    return (
        <LayoutInner backLink="/" left={<LanguageSwitcher />}>
            {status === 'loading' ? (
                <Loader />
            ) : status === 'error' ? (
                <ErrorMessage500 />
            ) : (
                <>
                    <h3
                        className={css`
                            color: ${theme.colours.primary};
                            margin-bottom: 12px;
                            font-size: 30px;
                        `}
                    >
                        Тропарион
                    </h3>
                    <div
                        className={css`
                            padding-bottom: 12px;
                        `}
                    >
                        <Input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            placeholder="Поиск…"
                            autoFocus
                        />
                    </div>
                    <SolidSection paddingTop={12}>
                        {searchResults.map((hymn) => (
                            <HymnButton
                                hymn={'item' in hymn ? hymn.item : hymn}
                                key={'item' in hymn ? hymn.item.id : hymn.id}
                            />
                        ))}
                    </SolidSection>
                </>
            )}
        </LayoutInner>
    );
};
