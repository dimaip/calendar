import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import { useHistory, useParams } from 'react-router-dom';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import useSermonFacets from 'hooks/useSermonFacets';
import SelectBox from 'components/SelectBox/SelectBox';
import { SermonList } from 'components/SermonList/SermonList';

const SermonListContainer = () => {
    const theme = useTheme();
    const history = useHistory();
    const { authorId } = useParams();
    const [themeId, setThemeId] = useState<string | undefined>();

    const setAuthorId = (authorId: string) => {
        history.push(`/sermons/${authorId}`);
    };

    const { data: facets } = useSermonFacets();

    useDocumentTitle('Проповеди - Православное богослужение на русском языке');

    return (
        <LayoutInner backLink="/">
            <div
                className={css`
                    position: stickey;
                    top: 50px;
                `}
            >
                <h3
                    className={css`
                        color: ${theme.colours.primary};
                        margin-bottom: 12px;
                        font-size: 30px;
                    `}
                >
                    Проповеди
                </h3>

                <div
                    className={css`
                        display: flex;
                        gap: 12px;
                        margin-bottom: 18px;
                        justify-content: flex-start;
                    `}
                >
                    <SelectBox
                        items={[{ title: 'Все авторы', id: undefined }, ...(facets?.authors || [])].map((author) => ({
                            label: `${author.title} ${typeof author.count === 'number' ? `(${author.count})` : ''}`,
                            value: author.id,
                        }))}
                        value={authorId}
                        onChange={setAuthorId}
                    />

                    <SelectBox
                        items={[{ title: 'Все темы', id: undefined }, ...(facets?.themes || [])].map((theme) => ({
                            label: `${theme.title} ${typeof theme.count === 'number' ? `(${theme.count})` : ''}`,
                            value: theme.id,
                        }))}
                        value={themeId}
                        onChange={setThemeId}
                    />
                </div>
            </div>

            <SermonList authorId={authorId} themeId={themeId} />
        </LayoutInner>
    );
};

export default SermonListContainer;
