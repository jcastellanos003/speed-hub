import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      semi: ['error', 'always'],
      'react-hooks/rules-of-hooks': 'error', // Ensures hooks are used correctly
      'react-hooks/exhaustive-deps': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // Built-in and third-party libraries
            ['internal'], // Your own modules (e.g., "@/...")
            ['sibling', 'parent', 'index'], // Relative imports
            ['object'], // Object imports
            ['type'], // Type imports
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before', // Always place `react` imports at the top
            },
            {
              pattern: '{react-dom,react-native}',
              group: 'builtin',
              position: 'after', // Place similar React libraries after `react`
            },
            {
              pattern: '@/**', // Custom modules or aliases
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'error',

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
