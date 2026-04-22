import { User, UserManager } from 'oidc-client-ts';

const pendingRenewals = new WeakMap<UserManager, Promise<User | null>>();

export const renewOidcUser = async (userManager: UserManager): Promise<User | null> => {
    const existing = pendingRenewals.get(userManager);
    if (existing) {
        return existing;
    }

    const renewal = userManager.signinSilent().finally(() => {
        pendingRenewals.delete(userManager);
    });

    pendingRenewals.set(userManager, renewal);
    return renewal;
};
