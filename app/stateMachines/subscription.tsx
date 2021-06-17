import React, { createContext, useContext } from 'react';
import { Route } from 'react-router-dom';
import { Machine, assign } from 'xstate';
import { useService } from '@xstate/react';
import Paying from 'containers/Checkout/Paying';
import PaymentSuccess from 'containers/Checkout/PaymentSuccess';
import PaymentFailure from 'containers/Checkout/PaymentFailure';
import Paywall from 'containers/Checkout/Paywall';
import NoSubscription from 'containers/Checkout/NoSubscription';
import Compare from 'containers/Checkout/Compare';
import Service from 'containers/Service/Service';
import Profile from 'containers/Profile/Profile';

export const SubscriptionMachineContext = createContext(null);

export const useSubscriptionService = () => {
    const service = useContext(SubscriptionMachineContext);
    if (!service) {
        return [];
    }
    return useService(service);
};

const authenticationState = {
    initial: 'authenticate',
    states: {
        authenticate: {
            entry: 'authenticateUser',
            on: {
                BOOT: 'authenticated',
            },
            meta: { authRedirect: true, component: () => <div>Loading...</div> },
        },
        authenticated: {
            type: 'final',
        },
    },
};
const paymentState = {
    initial: 'paying',
    states: {
        paying: {
            on: {
                PAYMENT_SUCCESS: 'paymentSuccess',
                PAYMENT_FAILURE: 'paymentFailure',
            },
            meta: {
                component: Paying,
            },
        },
        paymentSuccess: {
            on: {
                OK: {
                    target: 'done',
                },
            },
            meta: {
                component: PaymentSuccess,
            },
        },
        paymentFailure: {
            on: {
                RETRY: {
                    target: 'paying',
                },
            },
            meta: {
                component: PaymentFailure,
            },
        },
        done: {
            type: 'final',
        },
    },
};

const protectedItemAccessUnauthenticated = {
    initial: 'paywall',
    states: {
        paywall: {
            on: {
                SUBSCRIBE: {
                    target: 'authentication',
                },
                ALREADY_SUBSCRIBED: {
                    target: 'authentication',
                    actions: assign({
                        alreadySubscribedChosen: () => true,
                    }),
                },
                CLOSE: {
                    target: '#outside',
                },
            },
            meta: {
                component: Paywall,
            },
        },
        authentication: {
            ...authenticationState,
            onDone: 'hasSubscription',
        },
        hasSubscription: {
            always: [
                {
                    target: 'done',
                    cond: 'subscribed',
                },
                {
                    target: 'noSubscription',
                    cond: 'alreadySubscribedChosen',
                },
                {
                    target: 'done',
                },
            ],
        },
        noSubscription: {
            on: {
                SUBSCRIBE: 'done',
                CLOSE: {
                    target: '#outside',
                },
            },
            meta: { component: NoSubscription },
        },
        done: {
            type: 'final',
        },
    },
};
const protectedItemAccessAuthenticated = {
    initial: 'hasSubscription',
    onDone: '',
    states: {
        hasSubscription: {
            always: [
                {
                    target: '#bookView',
                    cond: 'subscribed',
                },
                {
                    target: 'paywall',
                },
            ],
        },
        paywall: {
            on: {
                SUBSCRIBE: {
                    target: 'done',
                },
                CLOSE: {
                    target: '#outside',
                },
            },
            meta: {
                component: () => <Paywall authenticated />,
            },
        },
        done: {
            type: 'final',
        },
    },
};

const profileAccess = {
    id: 'profileAccess',
    initial: 'hasAuthenticated',
    states: {
        hasAuthenticated: {
            always: [{ target: 'hasSubscription', cond: 'isAuthenticated' }, { target: 'authentication' }],
        },
        authentication: {
            ...authenticationState,
            onDone: 'hasSubscription',
        },
        hasSubscription: {
            always: [
                {
                    target: 'profile',
                    cond: 'subscribed',
                },
                {
                    target: 'compare',
                },
            ],
        },
        compare: {
            on: {
                STAY_FREE: {
                    target: 'profile',
                },
                SUBSCRIBE: {
                    target: 'paywall',
                },
            },
            meta: {
                component: Compare,
            },
        },
        paywall: {
            on: {
                SUBSCRIBE: {
                    target: 'payment',
                },
                CLOSE: {
                    target: '#outside',
                },
            },
            meta: { component: () => <Paywall authenticated /> },
        },
        payment: {
            onDone: 'profile',
            ...paymentState,
        },
        profile: {
            type: 'final',
            on: {
                CLOSE: {
                    target: '#outside',
                },
            },
            meta: {
                component: Profile,
            },
        },
    },
};

export default Machine({
    id: 'main',
    initial: 'loading',
    context: {
        isAuthenticated: false,
        user: null,
        serviceId: null,
        initialLocation: null,
        alreadySubscribedChosen: false,
        subscriptionInfo: null,
    },
    type: 'compound',
    on: {
        AUTH_LOADED_DATA: {
            actions: assign({
                isAuthenticated: (c, e) => e.isAuthenticated,
                user: (c, e) => e.user,
                subscriptionInfo: (c, e) => e.subscriptionInfo,
            }),
        },
    },
    states: {
        loading: {
            type: 'compound',
            initial: 'idle',
            on: {
                AUTH_LOADED: {
                    target: 'loaded',
                },
                CHOOSE_BOOK: [
                    {
                        target: '#protectedItemAccessWaiting',
                        actions: assign({
                            serviceId: (c, e) => e.serviceId,
                        }),
                    },
                ],
                PROFILE_CLICK: [
                    {
                        target: '#profileAccessWaiting',
                        actions: assign({
                            serviceId: (c, e) => e.serviceId,
                        }),
                    },
                ],
            },
            states: {
                idle: {},
                protectedItemAccessWaiting: {
                    id: 'protectedItemAccessWaiting',
                    on: {
                        AUTH_LOADED: {
                            target: '#protectedItemAccess',
                        },
                    },
                },
                profileAccessWaiting: {
                    id: 'profileAccessWaiting',
                    on: {
                        AUTH_LOADED: {
                            target: '#profileAccess',
                        },
                    },
                },
            },
        },
        loaded: {
            type: 'compound',
            initial: 'outside',
            states: {
                outside: {
                    id: 'outside',
                    on: {
                        CHOOSE_BOOK: [
                            {
                                target: '#protectedItemAccess',
                                actions: assign({
                                    serviceId: (c, e) => e.serviceId,
                                }),
                            },
                        ],
                        PROFILE_CLICK: [
                            {
                                target: 'profileAccess',
                            },
                        ],
                    },
                },
                protectedItemAccess: {
                    id: 'protectedItemAccess',
                    initial: 'hasAuthenticated',
                    states: {
                        hasAuthenticated: {
                            always: [
                                { target: 'authenticated', cond: 'isAuthenticated' },
                                { target: 'unauthenticated' },
                            ],
                        },
                        unauthenticated: { ...protectedItemAccessUnauthenticated, onDone: 'payment' },
                        authenticated: { ...protectedItemAccessAuthenticated, onDone: 'payment' },
                        payment: {
                            onDone: 'bookView',
                            ...paymentState,
                        },
                        bookView: {
                            id: 'bookView',
                            on: {
                                CLOSE: '#outside',
                            },
                        },
                    },
                },
                profileAccess: { ...profileAccess },
            },
        },
    },
});
