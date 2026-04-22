export type SessionStatus = 'loading' | 'authenticated' | 'expired' | 'signedOut';

export interface SessionUserLike {
    expired: boolean;
    id_token?: string | null;
}

export interface LocationLike {
    search: string;
    hash: string;
}

export const hasCodeInUrl = (location: LocationLike) => {
    const searchParams = new URLSearchParams(location.search);
    const hashParams = new URLSearchParams(location.hash.replace('#', '?'));
    return Boolean(
        searchParams.get('code') ||
            searchParams.get('id_token') ||
            searchParams.get('session_state') ||
            hashParams.get('code') ||
            hashParams.get('id_token') ||
            hashParams.get('session_state')
    );
};

export const getUserToken = <TUser extends SessionUserLike>(user: TUser | null | undefined) =>
    user && !user.expired ? user.id_token ?? null : null;

export const isTerminalRenewError = (error: unknown) => {
    if (typeof error === 'object' && error !== null && 'error' in error) {
        return error.error === 'invalid_grant';
    }

    return error instanceof Error && error.message.includes('invalid_grant');
};

export const buildLogoutUrl = ({
    authority,
    idToken,
    postLogoutRedirectUri,
}: {
    authority?: string;
    idToken: string | null;
    postLogoutRedirectUri?: string;
}) => {
    if (!authority || !postLogoutRedirectUri) {
        return null;
    }

    const logoutUrl = new URL('/oidc/v1/end_session', authority);
    if (idToken) {
        logoutUrl.searchParams.set('id_token_hint', idToken);
    }
    logoutUrl.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);
    return logoutUrl.toString();
};

export const resolveSessionToken = async <TUser extends SessionUserLike>({
    currentUser,
    mode,
    reauthRequired = false,
    onTerminalFailure,
    renewUser,
}: {
    currentUser: TUser | null;
    mode: 'current' | 'renew';
    reauthRequired?: boolean;
    onTerminalFailure?: () => void;
    renewUser: () => Promise<TUser | null>;
}) => {
    const currentToken = getUserToken(currentUser);
    if (mode === 'current' && currentToken) {
        return currentToken;
    }

    if (reauthRequired) {
        return currentToken;
    }

    try {
        const renewedUser = await renewUser();
        return getUserToken(renewedUser) ?? currentToken;
    } catch (error) {
        if (isTerminalRenewError(error)) {
            onTerminalFailure?.();
        }
        return currentToken;
    }
};
