const js = require('@eslint/js');

module.exports = [
    {
        ignores: ['coverage/**', 'node_modules/**'],
    },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'script',
            globals: {
                module: 'writable',
                exports: 'writable',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {},
        rules: {
            'no-console': 'warn',
            'no-unused-vars': 'warn',
            eqeqeq: 'error',
            quotes: [2, 'single', { avoidEscape: true }],
        },
    },
    {
        files: ['**/*.test.js', '**/*.spec.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'script',
            globals: {
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                module: 'writable',
                exports: 'writable',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                console: 'readonly',
            },
        },
    },
];
