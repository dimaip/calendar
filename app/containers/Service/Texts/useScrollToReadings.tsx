import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useScrollToReadings = () => {
    const history = useHistory();
    useEffect(() => {
        // @ts-ignore
        if (history.location.state?.scrollToReadings) {
            const domNode = document.getElementById('firstReading');
            if (domNode) {
                try {
                    domNode.scrollIntoView({ block: 'center' });
                } catch (error) {
                    // fallback to prevent browser crashing
                    domNode.scrollIntoView();
                }
            }
        }
    }, []);
};
export default useScrollToReadings;
