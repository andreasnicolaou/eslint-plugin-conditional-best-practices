import conditionalBestPractices from '@andreasnicolaou/conditional-best-practices';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        es2021: 'readonly',
      },
    },
    plugins: {
      '@andreasnicolaou/conditional-best-practices': conditionalBestPractices,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    rules: {
      'no-console': 'warn',
      ...conditionalBestPractices.configs.recommended.rules,
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
    },
  },
];
