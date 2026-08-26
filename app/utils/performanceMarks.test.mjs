import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

test('keeps keyed startup and navigation marks in chronological history', async () => {
    const originalPerformance = globalThis.performance;
    const marks = [];
    Object.defineProperty(globalThis, 'performance', {
        configurable: true,
        value: {
            mark: (name, options) => marks.push({ name, detail: options?.detail }),
        },
    });

    try {
        const { markNavigationIntent, markPerformance } = await import('./performanceMarks.ts');

        markPerformance('bundle_evaluated');
        markNavigationIntent({ initiator: 'link-click', target: '/first' });
        markPerformance('route_chunk_loaded', { route: 'service' });
        markNavigationIntent({ initiator: 'date-change', target: '/second' });

        assert.deepEqual(
            marks.map(({ name }) => name),
            ['bundle_evaluated', 'navigation_intent', 'route_chunk_loaded', 'navigation_intent']
        );
        assert.deepEqual(
            marks.map(({ detail }) => detail.navigationSequence),
            [1, 2, 2, 3]
        );
        assert.deepEqual(
            marks.map(({ detail }) => detail.navigationKey),
            ['startup-1', 'navigation-2', 'navigation-2', 'navigation-3']
        );
        assert.equal(marks[2].detail.route, 'service');
    } finally {
        Object.defineProperty(globalThis, 'performance', {
            configurable: true,
            value: originalPerformance,
        });
    }
});

test('places readiness marks at the intended application boundaries', () => {
    const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const readAppFile = (relativePath) => readFileSync(path.join(appRoot, relativePath), 'utf8');

    assert.match(readAppFile('client.tsx'), /markPerformance\('bundle_evaluated'\)/);
    assert.match(readAppFile('client.tsx'), /markPerformance\('react_render_requested'\);\s*root\.render/);
    assert.match(
        readAppFile('containers/App.tsx'),
        /reactRoot\.style\.display = 'block';\s*markPerformance\('inline_loader_hidden'\)/
    );
    assert.match(readAppFile('containers/Main/HeaderMain.tsx'), /markPerformance\('app_header_ready', \{ date \}\)/);
    assert.match(
        readAppFile('containers/Main/Main.tsx'),
        /markPerformance\('date_primary_content_ready', \{ date \}, navigation\)/
    );
    assert.match(readAppFile('containers/Main/Main.tsx'), /markPerformance\('above_fold_stable', \{ date \}/);
    assert.match(
        readAppFile('containers/Service/Service.tsx'),
        /markPerformance\('service_shell_ready', \{ renderKey \}\)/
    );
    assert.doesNotMatch(readAppFile('utils/performanceMarks.ts'), /clearMarks/);
});
