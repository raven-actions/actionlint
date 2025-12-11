import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default defineConfig(
  // Global ignores - must be first
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.dev/**', 'tests/fixtures/**', '**/*.js', '**/*.mjs', '**/*.cjs', '*.config.ts', '*.config.mjs']
  },

  // Base configs
  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,

  // Main config for TypeScript files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname + '/../..'
      }
    },
    rules: {
      // Stricter than recommended
      'no-cond-assign': ['error', 'always'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-implicit-coercion': ['error', { allow: ['!!'] }],
      'no-empty': ['error', { allowEmptyCatch: true }],

      // Best practices not in recommended
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-proto': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-useless-call': 'error',
      'no-void': 'error',
      'no-caller': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-implied-eval': 'error',
      'no-constructor-return': 'error',
      'no-labels': 'error',

      // Stylistic (non-formatting, Prettier compatible)
      'no-lonely-if': 'error',
      camelcase: ['error', { properties: 'never' }],
      'no-nested-ternary': 'error',
      'one-var': ['error', 'never'],
      'no-unneeded-ternary': 'error',
      'default-case-last': 'error',
      'grouped-accessor-pairs': ['error', 'getBeforeSet'],

      // ES6+ preferences
      'prefer-template': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',

      // TypeScript - disable base rules handled by TS
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-array-constructor': 'off',

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn'
    }
  },

  // Test files - relaxed rules
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/setup.ts', 'tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off'
    }
  },

  // Prettier must be last to disable conflicting rules
  prettier
)
