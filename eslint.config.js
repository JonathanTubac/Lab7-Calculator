// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'node_modules',
    '**/*.stories.js',
    '.storybook/**',
    'src/stories/Button.jsx',
    'src/stories/Header.jsx',
    'src/stories/Page.jsx',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Standard JS style
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-in-parens': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': ['error', 'always'],
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-spacing': 'error',

      // Reglas custom requeridas por el lab
      'semi': ['error', 'never'],
      'max-len': ['error', { code: 120 }],
    },
  },
  ...storybook.configs['flat/recommended'],
])
