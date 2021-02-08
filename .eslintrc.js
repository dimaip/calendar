/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

// 0: off, 1: warn, 2: error

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'standard',
        'standard-jsx',
        'prettier',
        'prettier/react',
        'plugin:eslint-comments/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks', 'jsx-a11y', 'promise'],
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                'standard-with-typescript',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'prettier/@typescript-eslint',
            ],
            plugins: ['@typescript-eslint'],
            rules: {
                'no-extra-boolean-cast': 0,
                'comma-dangle': [2, 'only-multiline', { functions: 'never' }],
                'no-return-await': 0,
                '@typescript-eslint/interface-name-prefix': 0,
                '@typescript-eslint/member-ordering': 0,
                '@typescript-eslint/no-unused-vars': 2,
                '@typescript-eslint/naming-convention': 0,
                '@typescript-eslint/member-delimiter-style': 0,
                '@typescript-eslint/strict-boolean-expressions': 0,
                '@typescript-eslint/prefer-nullish-coalescing': 0,
                '@typescript-eslint/return-await': 0,
                '@typescript-eslint/restrict-template-expressions': 0,
            },
            parserOptions: {
                project: 'tsconfig.json',
                sourceType: 'module',
            },
        },
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        react: {
            version: 'detect',
        },
    },
    globals: {
        React: 'writable',
        JSX: 'writable',
    },
    rules: {
        'prettier/prettier': [2, prettierOptions],
        'no-underscore-dangle': 0,
        'arrow-body-style': [2, 'as-needed'],
        'class-methods-use-this': 0,
        'no-multiple-empty-lines': 2,
        'comma-dangle': [2, 'only-multiline', { functions: 'never' }],
        'import/no-unresolved': 2,
        'import/order': [
            2,
            {
                'newlines-between': 'always',
                pathGroups: [{ group: 'external', position: 'after' }],
                pathGroupsExcludedImportTypes: ['builtin'],
            },
        ],
        'jsx-a11y/aria-props': 2,
        'jsx-a11y/heading-has-content': 0,
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                // NOTE: If this error triggers, either disable it or add
                // your custom components, labels and attributes via these options
                // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
                controlComponents: ['Input'],
            },
        ],
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/mouse-events-have-key-events': 2,
        'jsx-a11y/role-has-required-aria-props': 2,
        'jsx-a11y/role-supports-aria-props': 2,
        'max-len': 0,
        'newline-per-chained-call': 0,
        'no-confusing-arrow': 0,
        'no-console': 1,
        'no-debugger': 1,
        'no-extra-boolean-cast': 0,
        'no-nested-ternary': 0,
        'no-param-reassign': 2,
        'no-shadow': 0,
        'no-var': 2,
        'no-void': [2, { allowAsStatement: true }],
        'no-empty': 2,
        'no-empty-function': 2,
        'no-unused-vars': [2, { argsIgnorePattern: '^_', args: 'after-used', ignoreRestSiblings: true }],
        'no-use-before-define': 0,
        'prefer-template': 2,
        quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: false }],
        'react/destructuring-assignment': 0,
        'react/jsx-closing-tag-location': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-boolean-value': 0,
        'react/jsx-first-prop-new-line': [2, 'multiline'],
        'react/jsx-filename-extension': 0,
        'react/jsx-handler-names': 0,
        'react/jsx-no-target-blank': 0,
        'react/jsx-uses-vars': 2,
        'react/require-default-props': 0,
        'react/require-extension': 0,
        'react/self-closing-comp': 0,
        'react/sort-comp': 0,
        'react/react-in-jsx-scope': 0,
        'require-yield': 0,
        'max-classes-per-file': 0,
        'react/static-property-placement': 0,
        'react/state-in-constructor': 0,
        'react/jsx-props-no-spreading': 0,
        'react/display-name': 0,
        'sort-keys': 0,
        'no-restricted-globals': 0,
        camelcase: [2, { allow: ['^UNSAFE_', '_UNSTABLE'] }],
        'eslint-comments/disable-enable-pair': 0,
        'node/no-exports-assign': 0,
    },
};
/* eslint-enable @typescript-eslint/no-var-requires */
