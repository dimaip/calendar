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
import BottomNav from 'components/BottomNav/BottomNav';

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
            left={
                <h3
                    className={css`
                        color: ${theme.colours.black};
                        font-size: 20px;
                    `}
                >
                    Проповеди
                </h3>
            }
        >
            <div style={{ flexGrow: 1 }}>
                <SolidSection paddingTop={18} noBorder paddingHorizontal={8} marginHorizontal={0}>
                    <div
                        className={css`
                            position: stickey;
                            top: 50px;
                        `}
                    >
                        <div
                            className={css`
                                display: flex;
                                gap: 6px;
                                justify-content: flex-start;
                            `}
                        >
                            <SelectBox
                                items={[{ title: 'Все авторы', id: undefined }, ...(facets?.authors || [])].map(
                                    (author) =>
                                        author.title !== 'null' && {
                                            label: `${author.title} ${
                                                typeof author.count === 'number' ? `(${author.count})` : ''
                                            }`,
                                            shortLabel: author.title
                                                .replace('Митрополит ', 'митр. ')
                                                .replace('Священник ', 'свящ. ')
                                                .replace('Архимандрит ', 'архим. ')
                                                .replace('Протопресвитер ', 'протопресв. ')
                                                .replace('Протоиерей ', 'прот. ')
                                                .replace('Игумен ', 'игум. ')
                                                .replace('Священномученик ', 'сщмч. ')
                                                .replace('Святой праведный ', 'свт. ')
                                                .replace('Святитель ', 'свт. ')
                                                .replace('Архиепископ ', 'архиеп. '),
                                            value: author.id,
                                        }
                                )}
                                value={authorId}
                                onChange={setAuthorId}
                                inverse
                                showChevron
                                heighlightActive
                                activeOnTop
                            />

                            <SelectBox
                                items={[{ title: 'Все темы', id: undefined }, ...(facets?.themes || [])].map(
                                    (theme) => ({
                                        label: `${theme.title} ${
                                            typeof theme.count === 'number' ? `(${theme.count})` : ''
                                        }`,
                                        shortLabel: theme.title,
                                        value: theme.id,
                                    })
                                )}
                                value={themeId}
                                onChange={setThemeId}
                                inverse
                                showChevron
                                heighlightActive
                                activeOnTop
                            />
                        </div>
                    </div>
                </SolidSection>

                <SermonList authorId={authorId} themeId={themeId} />
            </div>
            <BottomNav active="sermons" />
        </LayoutInner>
    );
};

export default SermonListContainer;
