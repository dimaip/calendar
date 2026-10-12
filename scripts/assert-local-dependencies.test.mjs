import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import { assertLocalDependencies } from './assert-local-dependencies.mjs';

test('production builds accept local dependencies and reject shared dependencies', (t) => {
    const root = mkdtempSync(join(tmpdir(), 'calendar-build-layout-'));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const normal = join(root, 'normal');
    const worktree = join(root, 'worktree');
    mkdirSync(join(normal, 'node_modules'), { recursive: true });
    mkdirSync(worktree);
    symlinkSync(join(normal, 'node_modules'), join(worktree, 'node_modules'), 'junction');
    assert.doesNotThrow(() => assertLocalDependencies(normal));
    assert.throws(() => assertLocalDependencies(worktree), /checkout-local node_modules/);

    // A symlink to the entire checkout doesn't change its dependency layout.
    const alias = join(root, 'alias');
    symlinkSync(normal, alias, 'junction');
    assert.doesNotThrow(() => assertLocalDependencies(alias));

    const fresh = join(root, 'fresh');
    mkdirSync(fresh);
    assert.doesNotThrow(() => assertLocalDependencies(fresh));
    symlinkSync(join(root, 'missing-dependencies'), join(fresh, 'node_modules'), 'junction');
    assert.throws(() => assertLocalDependencies(fresh), /checkout-local node_modules/);
});
