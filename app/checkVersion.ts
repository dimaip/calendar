let version: null | string = null;
let cacheTime: number | null = null;

const getVersion = async (): Promise<typeof version> =>
    fetch(`${process.env.PUBLIC_URL}/built/version.json`).then((response) => {
        if (!response.ok) {
            return null;
        }
        return (response.json() as unknown) as string;
    });

const getVersionThrottled = async (): Promise<typeof version> => {
    const now = new Date().getTime();
    if (!cacheTime || now - cacheTime > 60 * 1000) {
        cacheTime = now;
        version = await getVersion();
    }
    return version;
};

// Returns a promise that resolves to the new version id in case of update
const checkVersion = async (): Promise<typeof version> => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const version = await getVersionThrottled();

        // VERSION is a global constant injected by webpack
        if (version && version !== VERSION) {
            console.log('New version, reloading: ', VERSION, version);
            try {
                const registation = await navigator.serviceWorker.getRegistration();
                if (registation) {
                    await registation.update();
                    console.log('Registration update successul');
                    return version;
                }
            } catch (e) {
                console.log('Failed updating SW, reloading', e);
                location.reload();
            }
        }
    }
    return null;
};

export default checkVersion;
