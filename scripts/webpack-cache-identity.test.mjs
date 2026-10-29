import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import test from 'node:test';
import webpack from 'webpack';

import config from '../webpack.base.js';

test('unrelated rules do not change existing loader identities or options', (t) => {
    const resources = ['example.js', 'example.tsx', 'example.mdx', 'example.worker.js'];
    const variants = [
        config.module.rules,
        [{ test: /\.unused-stability-probe$/, type: 'asset/source' }, ...config.module.rules],
    ];
    const resolved = variants.map((rules) => {
        const compiler = webpack({ ...config, mode: 'production', plugins: [], module: { ...config.module, rules } });
        t.after(() => new Promise((resolve, reject) => compiler.close((error) => (error ? reject(error) : resolve()))));
        const ruleSet = compiler.createNormalModuleFactory().ruleSet;
        return resources.map((file) => {
            const loaders = ruleSet
                .exec({ resource: resolve(config.context, file) })
                .filter(({ type }) => type === 'use');
            assert.ok(loaders.length > 0, `The probe must exercise loaders for ${file}`);
            return { file, loaders };
        });
    });
    assert.deepEqual(
        resolved[1],
        resolved[0],
        'Adding an unrelated rule must not invalidate existing module identities'
    );
});
