import assert from 'node:assert/strict';
import test from 'node:test';

import {
    IMMUTABLE_CACHE_CONTROL,
    REVALIDATE_CACHE_CONTROL,
    cacheControlForStaticPath,
    isCompressibleStaticAsset,
    isImmutableBuiltAsset,
    normalizeStaticPath,
} from './staticDelivery.mjs';
import { createDeploymentPlan } from '../../scripts/deploy-static.mjs';

const createPlan = (versionFiles = ['version', 'version.json']) =>
    createDeploymentPlan({
        deploymentBucket: 's3://example-bucket',
        immutableRoot: '/tmp/deploy/immutable',
        revalidateRoot: '/tmp/deploy/revalidate',
        sourceRoot: '/repo/www',
        versionFiles,
    });

test('recognises content-hashed build assets without treating mutable build metadata as immutable', () => {
    assert.equal(isImmutableBuiltAsset('built/vendor.807c1869148f94d91589.js'), true);
    assert.equal(isImmutableBuiltAsset('built/605d5b6a7bdf8b7ddc75.woff2'), true);
    assert.equal(isImmutableBuiltAsset('built/7521.0740774f0703f0663272.js.map'), true);
    assert.equal(isImmutableBuiltAsset('built/version.json'), false);
    assert.equal(isImmutableBuiltAsset('service-worker.js'), false);
    assert.equal(isImmutableBuiltAsset('assets/icons/ascension.svg'), false);
});

test('assigns immutable caching only to content-addressed build output', () => {
    assert.equal(cacheControlForStaticPath('built/main.a5c5bec4e24084239c5d.js'), IMMUTABLE_CACHE_CONTROL);
    assert.equal(cacheControlForStaticPath('built/version.json'), REVALIDATE_CACHE_CONTROL);
    assert.equal(cacheControlForStaticPath('index.html'), REVALIDATE_CACHE_CONTROL);
    assert.equal(cacheControlForStaticPath('service-worker.js'), REVALIDATE_CACHE_CONTROL);
});

test('selects text-based assets for transport compression and normalizes platform paths', () => {
    assert.equal(isCompressibleStaticAsset('built/main.js'), true);
    assert.equal(isCompressibleStaticAsset('index.html'), true);
    assert.equal(isCompressibleStaticAsset('image.png'), false);
    assert.equal(isCompressibleStaticAsset('font.woff2'), false);
    assert.equal(normalizeStaticPath('built\\nested\\main.js'), 'built/nested/main.js');
    assert.equal(normalizeStaticPath('/built/main.js'), 'built/main.js');
});

test('uploads every immutable representation before mutable rollout references', () => {
    const plan = createPlan();

    assert.deepEqual(
        plan.map(({ phase }) => phase),
        [
            'immutable-uncompressed',
            'immutable-gzip',
            'mutable-shell',
            'mutable-version:version',
            'mutable-version:version.json',
            'mutable-gzip',
        ]
    );

    assert.deepEqual(plan[0].commandArguments.slice(0, 3), ['sync', '/repo/www/built/', 's3://example-bucket/built/']);
    assert.ok(plan[0].commandArguments.includes('--exclude=version'));
    assert.ok(plan[0].commandArguments.includes('--exclude=version.json'));
    assert.deepEqual(plan[1].commandArguments.slice(0, 3), ['sync', '/tmp/deploy/immutable/', 's3://example-bucket/']);
    assert.ok(plan[1].commandArguments.includes('--add-header=Content-Encoding:gzip'));

    const firstMutableStep = plan.findIndex(({ phase }) => phase.startsWith('mutable-'));
    const lastImmutableStep = plan.findLastIndex(({ phase }) => phase.startsWith('immutable-'));
    assert.ok(lastImmutableStep < firstMutableStep);
});

test('retains old content hashes and includes only version files present in the build', () => {
    const plan = createPlan(['version.json']);

    assert.deepEqual(
        plan.filter(({ phase }) => phase.startsWith('mutable-version:')).map(({ phase }) => phase),
        ['mutable-version:version.json']
    );
    assert.equal(
        plan.some(({ commandArguments }) => commandArguments.some((argument) => argument.startsWith('--delete'))),
        false
    );
});
