import { SET_ZOOM, TOGGLE_ZOOM_CONTROL } from 'constants/actionTypes';

export function setZoom(zoom) {
    const constrainedZoom = Math.max(0.8, Math.min(1.5, zoom));
    return {
        type: SET_ZOOM,
        payload: { zoom: constrainedZoom },
    };
}

export function toggleZoomControl() {
    return {
        type: TOGGLE_ZOOM_CONTROL,
    };
}
