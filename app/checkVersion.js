const getVersion = () =>
    fetch(`${process.env.PUBLIC_URL}/built/version.json`).then(response => {
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
    const version = await getVersionThrottled();

    // VERSION is a global constant injected by webpack
    if (version && version !== VERSION) {
        console.log('New version, reloading: ', VERSION, version);
        location.reload();
    }
};

export default checkVersion;
