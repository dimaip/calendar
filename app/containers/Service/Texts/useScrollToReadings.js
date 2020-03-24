import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useScrollToReadings = () => {
    const history = useHistory();
    useEffect(() => {
        if (history.location.state?.scrollToReadings) {
            const domNode = document.getElementById('firstReading');
            if (domNode) {
                domNode.scrollIntoView({ block: 'center' });
            }
        }
    }, []);
};
export default useScrollToReadings;
