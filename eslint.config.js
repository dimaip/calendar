import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import eslint from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

const repositoryRoot = path.dirname(fileURLToPath(import.meta.url));
const prettierOptions = JSON.parse(fs.readFileSync(path.join(repositoryRoot, '.prettierrc'), 'utf8'));
const typescriptRecommendedRules = {
    ...typescriptPlugin.configs.recommended.rules,
    ...typescriptPlugin.configs['recommended-requiring-type-checking'].rules,
};

export default [
    {
        ignores: [
            '**/node_modules/**',
            'android/**',
            'convertBibleQuote/bible/**',
            'convertBibleQuote/new/**',
            'electron/app/**',
            'parse/cache/**',
            'parse/processed/**',
            'parse/raw/**',
            'TWA/app/**',
            'TWA/build/**',
            'www/built/**',
            'www/index.html',
            'www/service-worker.*',
            'www/version',
        ],
    },
    {
        files: ['app/**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
                JSX: 'writable',
                React: 'writable',
                VERSION: 'readonly',
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: 'module',
            },
            sourceType: 'module',
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'warn',
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            import: importPlugin,
            'jsx-a11y': jsxA11yPlugin,
            prettier: prettierPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            ...eslint.configs.recommended.rules,
            ...importPlugin.flatConfigs.recommended.rules,
            ...prettierConfig.rules,
            'array-callback-return': 'error',
            'arrow-body-style': 'off',
            'class-methods-use-this': 'off',
            'comma-dangle': [
                'error',
                {
                    arrays: 'only-multiline',
                    exports: 'only-multiline',
                    functions: 'never',
                    imports: 'only-multiline',
                    objects: 'only-multiline',
                },
            ],
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            'import/no-unresolved': 'error',
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    pathGroupsExcludedImportTypes: ['builtin'],
                },
            ],
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/heading-has-content': 'off',
            'jsx-a11y/label-has-associated-control': [
                'error',
                {
                    controlComponents: ['Input'],
                },
            ],
            'jsx-a11y/label-has-for': 'off',
            'jsx-a11y/mouse-events-have-key-events': 'error',
            'jsx-a11y/role-has-required-aria-props': 'error',
            'jsx-a11y/role-supports-aria-props': 'error',
            'max-classes-per-file': 'off',
            'max-len': 'off',
            'newline-per-chained-call': 'off',
            'no-confusing-arrow': 'off',
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-empty': 'error',
            'no-empty-function': 'error',
            'no-extra-boolean-cast': 'off',
            'no-multiple-empty-lines': 'error',
            'no-nested-ternary': 'off',
            'no-param-reassign': 'error',
            'no-restricted-globals': 'off',
            'no-shadow': 'off',
            'no-underscore-dangle': 'off',
            'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
            'no-use-before-define': 'off',
            'no-var': 'error',
            'no-void': ['error', { allowAsStatement: true }],
            'prefer-template': 'error',
            'prettier/prettier': ['error', prettierOptions],
            'react/destructuring-assignment': 'off',
            'react/display-name': 'off',
            'react/forbid-prop-types': 'off',
            'react/jsx-boolean-value': 'off',
            'react/jsx-closing-tag-location': 'off',
            'react/jsx-filename-extension': 'off',
            'react/jsx-first-prop-new-line': ['error', 'multiline'],
            'react/jsx-handler-names': 'off',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-target-blank': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/jsx-uses-vars': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/require-default-props': 'off',
            'react/self-closing-comp': 'off',
            'react/sort-comp': 'off',
            'react/state-in-constructor': 'off',
            'react/static-property-placement': 'off',
            'react-hooks/exhaustive-deps': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'require-yield': 'off',
            'sort-keys': 'off',
        },
        settings: {
            'import/resolver': {
                alias: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
                    map: [
                        ['assets', './app/assets'],
                        ['components', './app/components'],
                        ['containers', './app/containers'],
                        ['data', './app/data'],
                        ['domain', './app/domain'],
                        ['hooks', './app/hooks'],
                        ['state', './app/state'],
                        ['styles', './app/styles'],
                        ['utils', './app/utils'],
                        ['checkVersion', './app/checkVersion'],
                        ['precache', './app/precache'],
                        ['precache.ts', './app/precache.ts'],
                    ],
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
                },
            },
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['app/**/*.{ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
                sourceType: 'module',
                tsconfigRootDir: repositoryRoot,
            },
        },
        rules: {
            ...typescriptRecommendedRules,
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/member-ordering': 'off',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true },
            ],
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/require-await': 'error',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/return-await': 'off',
            'no-empty-function': 'off',
            'no-unused-vars': 'off',
        },
    },
];
