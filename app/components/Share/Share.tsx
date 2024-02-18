import React, { useContext } from 'react';
import { css } from 'emotion';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';
import Button from 'components/Button/Button';
import ShareIcon from 'components/ShareIcon/ShareIcon';

const Share = ({ title, text, url }: { title: string; text: string; url: string }) => {
    const { toggleOpen } = useContext(DotsMenuContext);
    return (
        <Button
            onClick={() => {
                toggleOpen();
                if (navigator.share) {
                    navigator
                        .share({
                            title,
                            text,
                            url,
                        })
                        .catch((error) => console.log('Error sharing', error));
                }
            }}
            className={css`
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
            `}
        >
            <ShareIcon />{' '}
            <span
                className={css`
                    font-size: 13px;
                `}
            >
                Поделиться
            </span>
        </Button>
    );
};
export default Share;
