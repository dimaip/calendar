import { markPerformance } from 'utils/performanceMarks';

let serviceRouteLoaded = false;

export const loadServiceRoute = async () => {
    const serviceRoute = await import(/* webpackChunkName: "route-service" */ 'containers/Service/Service');
    if (!serviceRouteLoaded) {
        serviceRouteLoaded = true;
        markPerformance('route_chunk_loaded', { route: 'service' });
    }

    return serviceRoute;
};

export const preloadServiceRoute = () => {
    void loadServiceRoute();
};
