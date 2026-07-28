import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDirectory = path.join(repositoryRoot, 'www');
const buildDirectory = path.join(publicDirectory, 'built');
const indexPath = path.join(publicDirectory, 'index.html');
const serviceWorkerPath = path.join(publicDirectory, 'service-worker.js');
const outputArgumentIndex = process.argv.indexOf('--out');
const outputPath =
    outputArgumentIndex === -1 ? null : path.resolve(repositoryRoot, process.argv[outputArgumentIndex + 1] ?? '');

if (!fs.existsSync(indexPath) || !fs.existsSync(buildDirectory) || !fs.existsSync(serviceWorkerPath)) {
    console.error('Production artifacts are missing. Run "yarn build" before generating a bundle report.');
    process.exit(1);
}

if (outputArgumentIndex !== -1 && !process.argv[outputArgumentIndex + 1]) {
    console.error('"--out" requires a path.');
    process.exit(2);
}

const builtFiles = [];
const pendingDirectories = [buildDirectory];

while (pendingDirectories.length > 0) {
    const directory = pendingDirectories.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            pendingDirectories.push(entryPath);
        } else if (entry.isFile()) {
            builtFiles.push(entryPath);
        }
    }
}

builtFiles.sort();

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const initialUrls = [
    ...indexHtml.matchAll(/<(?:script|link)\b[^>]+(?:src|href)=["']([^"']+\.(?:js|css))["']/g),
].map((match) => match[1]);
const initialAssets = initialUrls
    .map((url) => {
        const filePath = path.join(publicDirectory, url.replace(/^https?:\/\/[^/]+/u, '').replace(/^\//u, ''));
        if (!fs.existsSync(filePath)) {
            return { url, missing: true };
        }

        const contents = fs.readFileSync(filePath);
        return {
            url,
            bytes: contents.byteLength,
            gzipBytes: gzipSync(contents, { level: 9 }).byteLength,
        };
    })
    .sort((left, right) => left.url.localeCompare(right.url));

const javascriptFiles = builtFiles.filter((filePath) => filePath.endsWith('.js'));
const initialJavaScript = initialAssets.filter((asset) => asset.url.endsWith('.js') && !asset.missing);
const serviceWorkerSource = fs.readFileSync(serviceWorkerPath, 'utf8');
const precacheUrls = [
    ...serviceWorkerSource.matchAll(/(?:["']url["']|\burl)\s*:\s*["']([^"']+)["']/g),
].map((match) => match[1]);
let precacheLocalBytes = 0;
let precacheLocalEntries = 0;

for (const url of precacheUrls) {
    const parsedUrl = new URL(url, 'https://local.invalid');
    let relativePath = parsedUrl.pathname.replace(/^\//u, '');
    if (!relativePath || relativePath === 'index.html') {
        relativePath = 'index.html';
    }
    const filePath = path.join(publicDirectory, relativePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        precacheLocalEntries += 1;
        precacheLocalBytes += fs.statSync(filePath).size;
    }
}

const report = {
    version: 1,
    build: {
        files: builtFiles.length,
        bytes: builtFiles.reduce((total, filePath) => total + fs.statSync(filePath).size, 0),
    },
    initialAssets,
    initialJavaScript: {
        files: initialJavaScript.length,
        bytes: initialJavaScript.reduce((total, asset) => total + asset.bytes, 0),
        gzipBytes: initialJavaScript.reduce((total, asset) => total + asset.gzipBytes, 0),
    },
    javascript: {
        files: javascriptFiles.length,
        bytes: javascriptFiles.reduce((total, filePath) => total + fs.statSync(filePath).size, 0),
    },
    precache: {
        entries: precacheUrls.length,
        localEntries: precacheLocalEntries,
        localBytes: precacheLocalBytes,
    },
};

const serializedReport = `${JSON.stringify(report, null, 2)}\n`;
if (outputPath) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, serializedReport);
}
process.stdout.write(serializedReport);
