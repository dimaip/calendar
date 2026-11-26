import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { InMemoryWebStorage, OidcClient, WebStorageStateStore } from 'oidc-client-ts';
import { getIosAuthReturnUrl, iosAuthState, parseIosAuthCallback } from './iosAuthCallback.ts';

const publicUrl = 'https://molitva.app';
const authority = 'https://login.example.test';

test('a native sign-in returns to the original OIDC client and redeems its code with the original PKCE verifier', async (t) => {
    const stateStore = new WebStorageStateStore({ store: new InMemoryWebStorage() });
    const client = new OidcClient({
        authority,
        client_id: 'mobile-test',
        redirect_uri: publicUrl,
        response_type: 'code',
        scope: 'profile',
        stateStore,
        metadata: {
            issuer: authority,
            authorization_endpoint: `${authority}/authorize`,
            token_endpoint: `${authority}/token`,
        },
    });
    const request = await client.createSigninRequest({ request_type: 'si:r', url_state: iosAuthState });
    const authorization = new URL(request.url).searchParams;
    assert.equal(authorization.get('redirect_uri'), publicUrl);
    assert.equal(authorization.get('code_challenge_method'), 'S256');

    const browserCallback = new URL(publicUrl);
    browserCallback.searchParams.set('code', 'fixture+code');
    browserCallback.searchParams.set('state', authorization.get('state'));
    browserCallback.searchParams.set('unrelated', 'discard');
    const deepLink = getIosAuthReturnUrl(browserCallback, publicUrl);
    const callback = parseIosAuthCallback(deepLink);
    assert.equal(callback.state, authorization.get('state'));
    assert.equal(new URL(callback.url).searchParams.has('unrelated'), false);
    assert.equal(new URL(callback.url).searchParams.get('code'), 'fixture+code');

    const exchanges = [];
    t.mock.method(globalThis, 'fetch', async (url, options) => {
        assert.equal(String(url), `${authority}/token`);
        exchanges.push(new URLSearchParams(options.body));
        return Response.json({ access_token: 'fixture-token', token_type: 'Bearer', expires_in: 60 });
    });
    const user = await client.processSigninResponse(callback.url);
    assert.equal(user.access_token, 'fixture-token');
    assert.equal(exchanges.length, 1);
    assert.equal(exchanges[0].get('code'), 'fixture+code');
    assert.equal(exchanges[0].get('redirect_uri'), publicUrl);
    assert.equal(
        createHash('sha256').update(exchanges[0].get('code_verifier')).digest('base64url'),
        authorization.get('code_challenge')
    );
    await assert.rejects(client.processSigninResponse(callback.url), /No matching state/);
    assert.equal(exchanges.length, 1);
});

test('standard web callbacks and URLs outside the configured HTTPS callback are kept out of the iOS handoff', () => {
    for (const url of [
        `${publicUrl}/?code=test&state=web-state`,
        `${publicUrl}/?code=test&state=a%3B${iosAuthState}&state=duplicate`,
        `${publicUrl}/?code=test&error=denied&state=a%3B${iosAuthState}`,
        `https://evil.example/?code=test&state=a%3B${iosAuthState}`,
        `${publicUrl}/another-path?code=test&state=a%3B${iosAuthState}`,
    ]) {
        assert.equal(getIosAuthReturnUrl(new URL(url), publicUrl), null);
    }
});

test('the app consumes only the designated callback route and can receive a sign-in error', () => {
    const browser = new URL(`${publicUrl}/?error=access_denied&state=a%3B${iosAuthState}`);
    const deepLink = getIosAuthReturnUrl(browser, publicUrl);
    assert.equal(new URL(parseIosAuthCallback(deepLink).url).searchParams.get('error'), 'access_denied');
    assert.equal(parseIosAuthCallback(deepLink.replace('molitva-auth', 'unrelated')), null);
    assert.equal(parseIosAuthCallback(deepLink.replace('capacitor:', 'https:')), null);
    assert.equal(parseIosAuthCallback('not a URL'), null);
});
