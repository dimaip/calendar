import assert from 'node:assert/strict';
import test from 'node:test';
import { compareDependencyGraph, eraseTypes } from './verify-modernization-scope.mjs';

const manifest = { dependencies: { 'react-query': '^3.39.2' }, devDependencies: { eslint: '7.16.0' } };
const graph = {
    'react-query@^3.39.2': {
        version: '3.39.2',
        dependencies: { 'runtime-child': '^1' },
        optionalDependencies: { optional: '^1' },
    },
    'runtime-child@^1': { version: '1.0.0' },
    'optional@^1': { version: '1.0.0' },
};

test('quality tooling can change without changing the protected runtime closure', () => {
    assert.equal(
        compareDependencyGraph(manifest, { ...manifest, devDependencies: { eslint: '9.39.5' } }, graph, graph),
        3
    );
});
test('rejects direct query-library changes', () => {
    assert.throws(
        () => compareDependencyGraph(manifest, { dependencies: { 'react-query': '^5' } }, graph, graph),
        /Unapproved dependency/
    );
});
test('rejects changed or missing transitive and optional dependencies', () => {
    for (const name of ['runtime-child@^1', 'optional@^1']) {
        assert.throws(
            () => compareDependencyGraph(manifest, manifest, graph, { ...graph, [name]: { version: '2.0.0' } }),
            /resolution changed/
        );
        assert.throws(
            () => compareDependencyGraph(manifest, manifest, graph, { ...graph, [name]: undefined }),
            /Missing protected/
        );
    }
});
test('rejects new application dependencies rather than treating them as tooling', () => {
    assert.throws(
        () =>
            compareDependencyGraph(
                manifest,
                { ...manifest, dependencies: { ...manifest.dependencies, 'new-client': '1.0.0' } },
                graph,
                graph
            ),
        /Unapproved dependency/
    );
});
test('erases annotations but detects executable changes', () => {
    assert.equal(
        eraseTypes('export const a = (x: string) => x;', 'a.ts'),
        eraseTypes('export const a = (x) => x;', 'a.ts')
    );
    assert.notEqual(
        eraseTypes('export const a = (x: string) => x.trim();', 'a.ts'),
        eraseTypes('export const a = (x) => x;', 'a.ts')
    );
});
