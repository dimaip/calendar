import { useAuth } from 'oidc-react';
import React from 'react';
import { RecoilSync } from 'recoil-sync';

export const SyncWithDB = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const auth = useAuth();
    const token = auth?.userData?.id_token;
    // const connection = useMyDB();
    return (
        <RecoilSync
            storeKey="pb"
            read={(itemKey) => {
                return [];
                if (token) {
                    return fetch(`http://localhost:9999/getSetting/${itemKey}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                }
                return undefined;
            }}
            write={({ diff }) => {
                console.log(diff);
                if (token) {
                    diff.forEach((value, key) => {
                        void fetch(`http://localhost:9999/setSetting`, {
                            headers: { Authorization: `Bearer ${token}` },
                            method: 'POST',
                            body: JSON.stringify({ key, value }),
                        });
                    });
                }
                return undefined;
            }}
            listen={({ updateItem }) => {
                if (token) {
                    void fetch(`http://localhost:9999/getSettings`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                        .then(async (res) => res.json())
                        .then((settings) => {
                            Object.keys(settings).forEach((key) => updateItem(key, settings[key]));
                        });
                }
            }}
        >
            {children}
        </RecoilSync>
    );
};
