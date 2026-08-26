import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import TOCState from 'state/TOCState';

const POLL_INTERVAL_MS = 500;
const MAX_FOLLOW_UPDATES = 10;

export const useUpdateTOC = (): void => {
    const setTOC = useSetRecoilState(TOCState);

    useEffect(() => {
        let cancelled = false;
        let timeoutId: number | undefined;
        let tocLength = 0;
        let updatesCount = 0;
        let pageHeight = 0;

        const updateTOC = () => {
            if (cancelled) {
                return;
            }

            const values = Object.values(window.TOC || {});
            if (pageHeight < document.body.scrollHeight || values.length !== tocLength) {
                pageHeight = document.body.scrollHeight;
                const sortedTOC = values
                    .map((item) => ({
                        item,
                        offsetTop: document.getElementById(item.value)?.offsetTop ?? Number.POSITIVE_INFINITY,
                    }))
                    .sort((a, b) => a.offsetTop - b.offsetTop);

                setTOC(sortedTOC.map(({ item }) => item));
                tocLength = values.length;
            }

            // Keep on re-running 10 times every half a second, to make sure no updates are skipped.
            if (updatesCount < MAX_FOLLOW_UPDATES) {
                timeoutId = window.setTimeout(updateTOC, POLL_INTERVAL_MS);
                updatesCount += 1;
            }
        };

        timeoutId = window.setTimeout(updateTOC, POLL_INTERVAL_MS);

        return () => {
            cancelled = true;
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [setTOC]);
};
