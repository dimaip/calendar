import { useQuery } from 'react-query';

export function fetchApp() {
    return fetch(`${process.env.API_HOST}/app`).then((res) => res.json());
}

const useApp = () =>
    useQuery<{
        notification: {
            id: string;
            title: string;
            subtitle: string;
            buttonText: string;
            backgroundColour?: string;
            buttonColour?: string;
            activeSince?: string;
            activeTill?: string;
        };
    }>(['app'], () => fetchApp(), { retry: false });

export default useApp;
