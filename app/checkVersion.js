const getVersion = () =>
    fetch(`${process.env.PUBLIC_URL}/built/version.json`).then((response) => {
        if (!response.ok) {
            return;
        }
        return response.json();
    });

let version = null;
let cacheTime = null;
const getVersionThrottled = async () => {
    const now = new Date().getTime();
    if (!cacheTime || now - cacheTime > 60 * 1000) {
        cacheTime = now;
        version = await getVersion();
    }
    return version;
};

const checkVersion = async () => {
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
                }
            } catch (e) {
                console.log('Failed updating SW, reloading', e);
                location.reload();
            }
        }
    }
};

export default checkVersion;
