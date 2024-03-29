import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import TOCState from 'state/TOCState';

export const useUpdateTOC = () => {
    const setTOC = useSetRecoilState(TOCState);

    const TOClength = useRef(0);
    const TOCupdatesCount = useRef(0);
    const PageHeight = useRef(0);

    const updateTOC = () => {
        const values = Object.values(window.TOC || {});
        if (PageHeight.current < document.body.scrollHeight || values.length !== TOClength.current) {
            PageHeight.current = document.body.scrollHeight
            const sortedTOC = values
                .map((item) => ({ item, offsetTop: document.getElementById(item.value)?.offsetTop }))
                .sort((a, b) => a.offsetTop - b.offsetTop)

            setTOC(sortedTOC.map((i) => i.item));
            TOClength.current = values.length;
        }
        // Keep on re-running 10 times every half a second, to make sure no updates are skipped
        if (TOCupdatesCount.current < 10) {
            setTimeout(updateTOC, 500);
            TOCupdatesCount.current++;
        }
    };

    useEffect(() => {
        setTimeout(updateTOC, 500);
    }, []);
};
