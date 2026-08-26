export const loadServiceRoute = async () =>
    await import(/* webpackChunkName: "route-service" */ 'containers/Service/Service');

export const preloadServiceRoute = () => {
    void loadServiceRoute();
};
