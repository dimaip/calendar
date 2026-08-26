import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const serviceRoot = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(serviceRoot, '../..');
const readAppFile = (relativePath) => readFileSync(path.join(appRoot, relativePath), 'utf8');

test('derives the top-level service module during render and marks only complete Suspense commits', () => {
    const serviceSource = readFileSync(path.join(serviceRoot, 'Service.tsx'), 'utf8');

    assert.match(serviceSource, /const TextComponent = useMemo\(/);
    assert.doesNotMatch(serviceSource, /setTextComponent/);
    assert.match(serviceSource, /performance\.clearMarks\?\.\('service_complete_commit'\)/);
    assert.match(serviceSource, /markPerformance\('service_complete_commit', \{ renderKey \}\)/);
    assert.match(
        serviceSource,
        /<Suspense[\s\S]*?<TextComponent[\s\S]*?<ServiceCommitMarker renderKey=\{serviceRenderKey\} \/>[\s\S]*?<\/Suspense>/
    );
});

test('keeps legacy script-editor storage identity while TOC labels become deterministic', () => {
    const typographySource = readAppFile('components/Typography/Typography.tsx');

    assert.match(typographySource, /ScriptEditorInput id=\{`\$\{window\.location\.href\}\$\{String\(children\)\}`\}/);
    assert.doesNotMatch(typographySource, /ScriptEditorInput id=\{`\$\{window\.location\.href\}\$\{label\}`\}/);
});

test('owns MDX audio enhancement at one provider root instead of every nested wrapper', () => {
    const providerSource = readFileSync(path.join(serviceRoot, 'MDXProvider.tsx'), 'utf8');

    assert.equal(providerSource.match(/\buseAudio\(/g)?.length, 1);
    assert.match(providerSource, /<div ref=\{ref\} data-audio-root>/);
    assert.match(providerSource, /wrapper: \(props\) => <div \{\.\.\.props\} \/>/);
});

test('does not schedule height work when swipeable views has no updater', () => {
    const heightUpdaterSource = readAppFile('components/HeightUpdate/HeightUpdater.tsx');
    const guardPosition = heightUpdaterSource.indexOf('if (!updateHeight)');
    const timerPosition = heightUpdaterSource.indexOf('window.setTimeout');

    assert.notEqual(guardPosition, -1);
    assert.equal(guardPosition < timerPosition, true);
    assert.match(heightUpdaterSource, /window\.clearTimeout\(timer\)/);
});

test('keeps editor-only UI and storage work out of the inactive heading path', () => {
    const inputSource = readAppFile('components/ScriptEditor/ScriptEditorInput.tsx');
    const activeInputSource = readAppFile('components/ScriptEditor/ActiveScriptEditorInput.tsx');
    const loaderSource = readFileSync(path.join(serviceRoot, 'Texts/MdxLoader.tsx'), 'utf8');
    const loaderRuntimeSource = readFileSync(path.join(serviceRoot, 'Texts/MdxLoaderRuntime.tsx'), 'utf8');

    assert.match(inputSource, /if \(!scriptEditorIsActive\) \{\s*return null;/);
    assert.match(inputSource, /React\.lazy\(/);
    assert.doesNotMatch(inputSource, /localStorage|useTheme|useState/);
    assert.match(activeInputSource, /localStorage/);
    assert.doesNotMatch(loaderSource, /useRecoil/);
    assert.match(loaderRuntimeSource, /MdxLoaderRuntimeProvider/);
});
