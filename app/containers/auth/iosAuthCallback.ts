export const iosAuthState = 'molitva-ios';

const iosCallback = 'capacitor://molitva-auth/callback';

function readCallbackParams(url: URL) {
    const params = url.searchParams;
    const state = params.get('state');
    const code = params.get('code');
    const error = params.get('error');
    if (
        params.getAll('state').length !== 1 ||
        !state ||
        !state.endsWith(`;${iosAuthState}`) ||
        params.getAll('code').length + params.getAll('error').length !== 1 ||
        (!code && !error)
    ) {
        return null;
    }

    // Forward only the OIDC response. Its state and PKCE verifier are checked in the app.
    const response = new URLSearchParams({ state });
    if (code) response.set('code', code);
    if (error) response.set('error', error);
    return { state, response };
}

export function getIosAuthReturnUrl(url: URL, publicUrl: string | undefined) {
    if (!publicUrl) return null;
    const expected = new URL(publicUrl);
    if (url.protocol !== 'https:' || url.origin !== expected.origin || url.pathname !== expected.pathname) return null;
    const params = readCallbackParams(url);
    return params ? `${iosCallback}?${params.response}` : null;
}

export function parseIosAuthCallback(value: string) {
    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return null;
    }
    if (`${url.protocol}//${url.host}${url.pathname}` !== iosCallback || url.username || url.password || url.hash) {
        return null;
    }
    const params = readCallbackParams(url);
    return params ? { url: `${iosCallback}?${params.response}`, state: params.state } : null;
}
