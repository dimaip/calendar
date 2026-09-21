export const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
export const REVALIDATE_CACHE_CONTROL = 'no-cache';

const CONTENT_HASH = /(?:^|\.)([a-f0-9]{16,})(?:\.|$)/iu;
const COMPRESSIBLE_EXTENSIONS = new Set([
    '.css',
    '.html',
    '.js',
    '.json',
    '.map',
    '.svg',
    '.txt',
    '.webmanifest',
    '.xml',
]);

export const normalizeStaticPath = (filePath) => filePath.replaceAll('\\', '/').replace(/^\/+/u, '');

export const isImmutableBuiltAsset = (filePath) => {
    const normalizedPath = normalizeStaticPath(filePath);
    const fileName = normalizedPath.slice(normalizedPath.lastIndexOf('/') + 1);
    return normalizedPath.startsWith('built/') && CONTENT_HASH.test(fileName);
};

export const isCompressibleStaticAsset = (filePath) => {
    const normalizedPath = normalizeStaticPath(filePath);
    const extensionStart = normalizedPath.lastIndexOf('.');
    return extensionStart >= 0 && COMPRESSIBLE_EXTENSIONS.has(normalizedPath.slice(extensionStart).toLowerCase());
};

export const cacheControlForStaticPath = (filePath) =>
    isImmutableBuiltAsset(filePath) ? IMMUTABLE_CACHE_CONTROL : REVALIDATE_CACHE_CONTROL;
