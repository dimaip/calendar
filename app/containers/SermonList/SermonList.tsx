import React, { useState } from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import LayoutInner from 'components/LayoutInner/LayoutInner';
import { useHistory, useParams } from 'react-router-dom';
import { useDocumentTitle } from 'utils/useDocumentTitle';
import useSermonFacets from 'hooks/useSermonFacets';
import SelectBox from 'components/SelectBox/SelectBox';
import { SermonList } from 'components/SermonList/SermonList';
import SolidSection from 'components/SolidSection/SolidSection';

const SermonListContainer = () => {
    const theme = useTheme();
    const history = useHistory();
    const { authorId } = useParams();
    const [themeId, setThemeId] = useState<string | undefined>();

    const setAuthorId = (authorId: string) => {
        if (authorId) {
            history.push(`/sermons/${authorId}`);
        } else {
            history.push('/sermons');
        }
    };

    const { data: facets } = useSermonFacets();

    useDocumentTitle('Проповеди - Православное богослужение на русском языке');

    return (
        <LayoutInner
            paddedContent={false}
            // backLink="/"
            left={
                <h3
                    className={css`
                        color: ${theme.colours.primary};
                        font-size: 20px;
                    `}
                >
                    Проповеди
                </h3>
            }
        >
            <SolidSection paddingTop={18} noBorder marginHorizontal={0}>
                <div
                    className={css`
                        position: stickey;
                        top: 50px;
                    `}
                >
                    <div
                        className={css`
                            display: flex;
                            gap: 12px;
                            justify-content: flex-start;
                        `}
                    >
                        <SelectBox
                            items={[{ title: 'Все авторы', id: undefined }, ...(facets?.authors || [])].map(
                                (author) => ({
                                    label: `${author.title} ${
                                        typeof author.count === 'number' ? `(${author.count})` : ''
                                    }`,
                                    value: author.id,
                                })
                            )}
                            value={authorId}
                            onChange={setAuthorId}
                            inverse
                            showChevron
                            heighlightActive
                        />

                        <SelectBox
                            items={[{ title: 'Все темы', id: undefined }, ...(facets?.themes || [])].map((theme) => ({
                                label: `${theme.title} ${typeof theme.count === 'number' ? `(${theme.count})` : ''}`,
                                value: theme.id,
                            }))}
                            value={themeId}
                            onChange={setThemeId}
                            inverse
                            showChevron
                            heighlightActive
                        />
                    </div>
                </div>
            </SolidSection>

            <SermonList authorId={authorId} themeId={themeId} />
        </LayoutInner>
    );
};

export default SermonListContainer;
