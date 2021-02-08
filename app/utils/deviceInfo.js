export const isCapacitor = () => window.origin?.includes?.('capacitor://');

export const isIphone = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipod/.test(userAgent);
};

// Detects if device is in standalone mode
// @ts-ignore
export const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;
