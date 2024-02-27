import { selectorFamily } from 'recoil';

import scriptVersionsState from './scriptVersionsState';
import currentScriptVersionState from './currentScriptVersion';

export const currentScriptSelector = selectorFamily({
    key: 'currentScript',
    get: (serviceId) => ({ get }) => {
        const scriptVersions = get(scriptVersionsState(serviceId));
        const currentScriptVersion = get(currentScriptVersionState(serviceId));

        return scriptVersions?.find((v) => v.id === currentScriptVersion);
    },
});
