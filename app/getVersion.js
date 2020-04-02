const getVersion = () =>
    fetch(`${process.env.PUBLIC_URL}/version`).then(response => {
        if (!response.ok) {
            return;
        }
        return response.text();
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

export default getVersionThrottled;
