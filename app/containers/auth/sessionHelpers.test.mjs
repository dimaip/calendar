import assert from 'node:assert/strict';
import test from 'node:test';

import {
    buildLogoutUrl,
    getUserToken,
    hasCodeInUrl,
    isTerminalRenewError,
    resolveSessionToken,
} from './sessionHelpers.ts';

test('hasCodeInUrl detects callback params in search and hash', () => {
    assert.equal(hasCodeInUrl({ search: '?code=abc', hash: '' }), true);
    assert.equal(hasCodeInUrl({ search: '', hash: '#session_state=123' }), true);
    assert.equal(hasCodeInUrl({ search: '', hash: '#/profile' }), false);
});

test('getUserToken only returns non-expired id tokens', () => {
    assert.equal(getUserToken(null), null);
    assert.equal(getUserToken({ expired: true, id_token: 'expired' }), null);
    assert.equal(getUserToken({ expired: false, id_token: 'live' }), 'live');
});

test('isTerminalRenewError recognises invalid_grant shapes', () => {
    assert.equal(isTerminalRenewError({ error: 'invalid_grant' }), true);
    assert.equal(isTerminalRenewError(new Error('token exchange failed: invalid_grant')), true);
    assert.equal(isTerminalRenewError({ error: 'server_error' }), false);
});

test('buildLogoutUrl includes id_token_hint when present', () => {
    assert.equal(
        buildLogoutUrl({
            authority: 'https://z.molitva.app',
            idToken: 'id-token',
            postLogoutRedirectUri: 'https://molitva.app',
        }),
        'https://z.molitva.app/oidc/v1/end_session?id_token_hint=id-token&post_logout_redirect_uri=https%3A%2F%2Fmolitva.app'
    );

    assert.equal(
        buildLogoutUrl({
            authority: undefined,
            idToken: 'id-token',
            postLogoutRedirectUri: 'https://molitva.app',
        }),
        null
    );
});

test('resolveSessionToken returns the current token when no refresh is needed', async () => {
    let renewCalls = 0;
    const token = await resolveSessionToken({
        currentUser: { expired: false, id_token: 'current' },
        mode: 'current',
        renewUser: async () => {
            renewCalls += 1;
            return { expired: false, id_token: 'renewed' };
        },
    });

    assert.equal(token, 'current');
    assert.equal(renewCalls, 0);
});

test('resolveSessionToken renews when explicitly requested', async () => {
    const token = await resolveSessionToken({
        currentUser: { expired: false, id_token: 'current' },
        mode: 'renew',
        renewUser: async () => ({ expired: false, id_token: 'renewed' }),
    });

    assert.equal(token, 'renewed');
});

test('resolveSessionToken renews when there is no current token yet', async () => {
    const token = await resolveSessionToken({
        currentUser: null,
        mode: 'current',
        renewUser: async () => ({ expired: false, id_token: 'renewed' }),
    });

    assert.equal(token, 'renewed');
});

test('resolveSessionToken falls back to the current token after a terminal renew failure', async () => {
    let terminalFailures = 0;
    const token = await resolveSessionToken({
        currentUser: { expired: false, id_token: 'current' },
        mode: 'renew',
        onTerminalFailure: () => {
            terminalFailures += 1;
        },
        renewUser: async () => {
            throw { error: 'invalid_grant' };
        },
    });

    assert.equal(token, 'current');
    assert.equal(terminalFailures, 1);
});

test('resolveSessionToken does not retry renew when reauth is already required', async () => {
    let renewCalls = 0;
    const token = await resolveSessionToken({
        currentUser: { expired: false, id_token: 'current' },
        mode: 'renew',
        reauthRequired: true,
        renewUser: async () => {
            renewCalls += 1;
            return { expired: false, id_token: 'renewed' };
        },
    });

    assert.equal(token, 'current');
    assert.equal(renewCalls, 0);
});

test('resolveSessionToken falls back to the current token after a transient renew failure', async () => {
    let terminalFailures = 0;
    const token = await resolveSessionToken({
        currentUser: { expired: false, id_token: 'current' },
        mode: 'renew',
        onTerminalFailure: () => {
            terminalFailures += 1;
        },
        renewUser: async () => {
            throw new Error('network timeout');
        },
    });

    assert.equal(token, 'current');
    assert.equal(terminalFailures, 0);
});

test('resolveSessionToken returns null when no token can be recovered', async () => {
    const token = await resolveSessionToken({
        currentUser: null,
        mode: 'renew',
        renewUser: async () => null,
    });

    assert.equal(token, null);
});

test('resolveSessionToken returns null without renewing when reauth is required and no token remains', async () => {
    let renewCalls = 0;
    const token = await resolveSessionToken({
        currentUser: null,
        mode: 'renew',
        reauthRequired: true,
        renewUser: async () => {
            renewCalls += 1;
            return { expired: false, id_token: 'renewed' };
        },
    });

    assert.equal(token, null);
    assert.equal(renewCalls, 0);
});
