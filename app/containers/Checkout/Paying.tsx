import React, { useEffect } from 'react';
import { css } from 'emotion';
import Button from 'components/Button/Button';
import { useSubscriptionService } from 'stateMachines/subscription';
import useScript from 'react-script-hook';
import { useAuth0 } from '@auth0/auth0-react';

const Paying = (): null => {
    const [_, send] = useSubscriptionService();
    const { isLoading: auth0Loading, isAuthenticated, user } = useAuth0();

    const [scriptLoading, scriptError] = useScript({ src: 'https://widget.cloudpayments.ru/bundles/cloudpayments' });

    const isLoading = auth0Loading || scriptLoading;
    const isError = scriptError;
    useEffect(() => {
        if (!isLoading && !isError) {
            const widget = new cp.CloudPayments();
            widget.pay(
                'auth', // или 'charge'
                {
                    // options
                    publicId: 'pk_784e70d8eb2029ad3a297f7221f4c',
                    description: 'Подписка molitva.app',
                    amount: 59,
                    currency: 'RUB',
                    accountId: user.email,
                    skin: 'mini',
                    data: {
                        myProp: 'myProp value',
                    },
                },
                {
                    onSuccess: function (options) {
                        send('PAYMENT_SUCCESS');
                    },
                    onFail: function (reason, options) {
                        send('PAYMENT_FAILURE');
                    },
                }
            );
        }
    }, [isLoading, isError]);

    return null;
};

export default Paying;
