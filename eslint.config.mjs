import eslint from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // === JS / TS Base Rules ===
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extra-semi': 'error',
      'no-unreachable': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-multi-spaces': 'error',
      'no-with': 'error',
      yoda: ['error', 'never'],
      'no-unused-vars': 'off', // use TS version
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-undef': 'off',
      'camelcase': ['warn', { properties: 'never' }],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'warn',

      // === Stylistic Rules ===
      'array-bracket-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', 'only-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'max-len': ['warn', { code: 100 }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      'arrow-spacing': ['error', { before: true, after: true }],

      // === Prettier Integration ===
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          semi: true,
          arrowParens: 'avoid',
        },
      ],
    },
    extends: [
      eslint.configs.recommended,
      prettierConfig, // disables ESLint rules that conflict with Prettier
    ],
  },
];
