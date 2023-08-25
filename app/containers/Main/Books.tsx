import React from 'react';
import { css } from 'emotion';
import TagManager from 'react-gtm-module';

const Books = (): JSX.Element => {
    return (
        <a
            href="https://books.sfi.ru/"
            target="_blank"
            title="На службу"
            className={css`
                display: block;
            `}
            onClick={() =>
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'BooksFollow',
                    },
                })
            }
        >
            <img
                src="/assets/books.svg"
                className={css`
                    display: block;
                    border-radius: 8px;
                `}
            />
        </a>
    );
};
export default Books;
