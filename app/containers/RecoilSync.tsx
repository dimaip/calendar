import React, { useCallback, useRef } from 'react';
import { RecoilSync } from 'recoil-sync';
import { useSession } from 'containers/AuthProvider';
import { useAuthorisedFetch } from 'utils/useAuthorisedFetch';

const parseState = (state: string): Record<string, unknown> => {
    if (state === undefined) {
        return {};
    }
    try {
        return JSON.parse(state) as Record<string, unknown>;
    } catch (e) {
        console.error(e);
        return {};
    }
};

const getState = (): Record<string, unknown> => {
    const toParse = window.localStorage.getItem('recoil-persist');
    if (toParse === null || toParse === undefined) {
        return {};
    }
    if (typeof toParse === 'string') {
        return parseState(toParse);
    }

    return {};
};

const setState = (key: string, value: unknown): void => {
    const state = getState();
    state[key] = value;
    window.localStorage.setItem('recoil-persist', JSON.stringify(state));
};

export const SyncWithDB = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const authorisedFetch = useAuthorisedFetch();
    const session = useSession();
    const canSyncRef = useRef(session.isAuthenticated);
    const authorisedFetchRef = useRef(authorisedFetch);
    canSyncRef.current = session.isAuthenticated;
    authorisedFetchRef.current = authorisedFetch;

    const read = useCallback((itemKey) => {
        const state = getState();
        return state[itemKey];
    }, []);

    const write = useCallback(({ diff }) => {
        diff.forEach((value, key) => {
            setState(key, value);
            if (canSyncRef.current) {
                console.debug('Uploading a setting to the server', key, value);
                void authorisedFetchRef.current({
                    url: `/setSetting`,
                    method: 'POST',
                    body: { key, value },
                });
            }
        });
        return undefined;
    }, []);

    const listen = useCallback(({ updateItem }) => {
        if (canSyncRef.current) {
            void authorisedFetchRef
                .current<Record<string, string>>({ url: `/getSettings` })
                .then((settings) => {
                    if (!settings) {
                        return;
                    }
                    const localState = getState();
                    const localKeys = Object.keys(localState);
                    const serverKeys = Object.keys(settings);
                    localKeys
                        .filter((key) => !serverKeys.includes(key))
                        .forEach((key) => {
                            const value = localState[key];
                            console.debug('Uploading settings to the server', key, value);
                            void authorisedFetchRef.current({
                                url: `/setSetting`,
                                method: 'POST',
                                body: { key, value },
                            });
                        });
                    Object.keys(settings).forEach((key) => {
                        console.debug('Downloaded a setting from the server', key, settings[key]);
                        setState(key, settings[key]);
                        updateItem(key, settings[key]);
                    });
                });
        }
    }, []);

    return (
        <RecoilSync storeKey="pb" read={read} write={write} listen={listen}>
            {children}
        </RecoilSync>
    );
};
