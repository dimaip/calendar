import assert from 'node:assert/strict';
import test from 'node:test';

import { renewOidcUser } from './renewOidcUser.ts';

test('renewOidcUser de-duplicates concurrent silent renew calls', async () => {
    let calls = 0;
    const user = { expired: false, id_token: 'token' };
    const userManager = {
        signinSilent: async () => {
            calls += 1;
            await new Promise((resolve) => {
                setTimeout(resolve, 10);
            });
            return user;
        },
    };

    const [first, second] = await Promise.all([renewOidcUser(userManager), renewOidcUser(userManager)]);

    assert.equal(first, user);
    assert.equal(second, user);
    assert.equal(calls, 1);
});

test('renewOidcUser clears its pending state after failures', async () => {
    let calls = 0;
    const userManager = {
        signinSilent: async () => {
            calls += 1;
            throw new Error('invalid_grant');
        },
    };

    await assert.rejects(() => renewOidcUser(userManager), /invalid_grant/);
    await assert.rejects(() => renewOidcUser(userManager), /invalid_grant/);

    assert.equal(calls, 2);
});
