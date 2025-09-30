import jsPlugin from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    name: 'TypeScript start',
    files: ['**/*.{ts,tsx}'],
    plugins: {
      js: jsPlugin,
      import: importPlugin,
      '@stylistic': stylistic,
      'unused-imports': unusedImports,
    },
    extends: [
      'js/recommended',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
      'object-shorthand': 'error',
      eqeqeq: 'error',
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    arrowParens: false,
    blockSpacing: true,
    braceStyle: 'stroustrup',
    commaDangle: 'always-multiline',
    quoteProps: 'as-needed',
  }),
  {
    name: 'TypeScript end',
    files: ['**/*.{ts,tsx}'],
    rules: {
      'unused-imports/no-unused-imports': 'error',
      '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: '*', next: 'function' },
      ],
      '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/jsx-self-closing-comp': 'error',
      '@stylistic/no-extra-parens': ['error', 'all', {
        nestedBinaryExpressions: false,
        conditionalAssign: false,
        returnAssign: true,
        enforceForSequenceExpressions: false,
        enforceForFunctionPrototypeMethods: false,
        ignoreJSX: 'all',
      }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
      'react/jsx-newline': ['error', { prevent: true }],
      'react/jsx-one-expression-per-line': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
          ],
          pathGroups: [
            {
              pattern: '~types',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~constants',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~app/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~firebase',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~logic/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~contexts/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~hooks/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~utils/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~data/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~router/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~routes/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~middleware/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '~database/*',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
