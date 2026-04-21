export default {
    providers: [
        {
            type: 'customJwt' as const,
            issuer: 'https://z.molitva.app',
            jwks: 'https://z.molitva.app/oauth/v2/keys',
            algorithm: 'RS256' as const,
            applicationID: '229793417436135450@pb',
        },
    ],
};
