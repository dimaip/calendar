import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from '@babel/core';
import lockfile from '@yarnpkg/lockfile';

export const baselineRef = '4b2db35575a80db33eb09ddf70a8ee4c440d0369';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// This gate belongs to the first, runtime-preserving slice. Expand it only in a
// separately reviewed work unit, never just to make a changed dependency pass.
const toolingRoots = new Set([
    'typescript',
    '@types/react',
    '@types/react-dom',
    '@types/lodash.memoize',
    '@types/react-gtm-module',
    '@types/react-router-dom',
    '@types/react-swipeable-views',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@eslint/js',
    'eslint',
    'eslint-config-prettier',
    'eslint-config-standard',
    'eslint-config-standard-jsx',
    'eslint-config-standard-with-typescript',
    'eslint-import-resolver-alias',
    'eslint-import-resolver-webpack',
    'eslint-plugin-eslint-comments',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-node',
    'eslint-plugin-prettier',
    'eslint-plugin-promise',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-standard',
    'babel-eslint',
    'standard',
    'prettier',
    'globals',
    '@yarnpkg/lockfile',
]);

export function compareDependencyGraph(beforePackage, afterPackage, beforeLock, afterLock) {
    const beforeRoots = { ...beforePackage.dependencies, ...beforePackage.devDependencies };
    const afterRoots = { ...afterPackage.dependencies, ...afterPackage.devDependencies };
    const pending = [];
    for (const name of new Set([...Object.keys(beforeRoots), ...Object.keys(afterRoots)])) {
        if (toolingRoots.has(name)) continue;
        assert.equal(afterRoots[name], beforeRoots[name], `Unapproved dependency change: ${name}`);
        pending.push([name, beforeRoots[name]]);
    }
    const visited = new Set();
    while (pending.length) {
        const [name, range] = pending.pop();
        // Type declarations have no runtime graph; React declarations are intentionally aligned.
        if (name.startsWith('@types/')) continue;
        const selector = `${name}@${range}`;
        if (visited.has(selector)) continue;
        visited.add(selector);
        const before = beforeLock[selector];
        const after = afterLock[selector];
        assert.ok(before && after, `Missing protected lock entry: ${selector}`);
        assert.deepEqual(after, before, `Protected dependency resolution changed: ${selector}`);
        pending.push(...Object.entries({ ...before.dependencies, ...before.optionalDependencies }));
    }
    return visited.size;
}

export function eraseTypes(source, filename) {
    return transformSync(source, {
        filename,
        configFile: false,
        babelrc: false,
        presets: ['@babel/preset-typescript'],
        generatorOpts: { comments: false, compact: true },
    }).code;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: 32 * 1024 * 1024 });
    const beforePackage = JSON.parse(git('show', `${baselineRef}:package.json`));
    const afterPackage = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
    const beforeLock = lockfile.parse(git('show', `${baselineRef}:yarn.lock`).toString());
    const afterLock = lockfile.parse(fs.readFileSync(path.join(root, 'yarn.lock'), 'utf8'));
    assert.equal(beforeLock.type, 'success');
    assert.equal(afterLock.type, 'success');
    const checked = compareDependencyGraph(beforePackage, afterPackage, beforeLock.object, afterLock.object);
    for (const [name, command] of Object.entries(beforePackage.scripts)) {
        if (/^(lint|test:auth)/.test(name)) continue;
        assert.equal(afterPackage.scripts[name], command, `Runtime/build/deploy script changed: ${name}`);
    }
    const protectedPaths = [
        'app',
        'www',
        '.babelrc',
        'webpack.base.js',
        'webpack.dev.js',
        'webpack.prod.js',
        'postcss.config.cjs',
        'server.js',
        'redirect.js',
        'Dockerfile',
        '.dockerignore',
        'docker-compose.yml',
        'capacitor.config.json',
        'TWA',
        'ios',
        'convex',
        'convex-proxy',
        'convertBibleQuote',
    ];
    const beforeFiles = git('ls-tree', '-r', '--name-only', baselineRef, '--', ...protectedPaths)
        .toString()
        .trim()
        .split('\n');
    const changedFiles = git('diff', '--name-only', baselineRef, '--', ...protectedPaths)
        .toString()
        .trim()
        .split('\n');
    const untrackedFiles = git('ls-files', '--others', '--exclude-standard', '--', ...protectedPaths)
        .toString()
        .trim()
        .split('\n');
    const typeOnlyFiles = new Set(['app/components/Button/Button.tsx', 'app/styles/getTheme.ts']);
    // Git compares unchanged tracked files in one operation; inspect changed bytes
    // and untracked additions without spawning thousands of git-show processes.
    for (const file of new Set([...changedFiles, ...untrackedFiles].filter(Boolean))) {
        if (file.endsWith('.test.mjs')) continue;
        assert.ok(
            beforeFiles.includes(file) && fs.existsSync(path.join(root, file)),
            `Runtime file added/deleted: ${file}`
        );
        const before = git('show', `${baselineRef}:${file}`);
        const after = fs.readFileSync(path.join(root, file));
        if (typeOnlyFiles.has(file)) {
            assert.equal(
                eraseTypes(after.toString(), file),
                eraseTypes(before.toString(), file),
                `Runtime change in type-only file: ${file}`
            );
        } else {
            assert.ok(before.equals(after), `Protected source changed: ${file}`);
        }
    }
    console.log(
        `Scope gate passed: ${checked} dependency selectors and ${beforeFiles.length} protected source files; only erased types differ.`
    );
}
