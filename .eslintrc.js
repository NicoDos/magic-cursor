/* eslint-env node */

module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  plugins: ['@typescript-eslint', 'react', 'no-relative-import-paths'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': ['error', { allow: ['error'] }],
    'react/react-in-jsx-scope': 'off',
    'no-extra-semi': 'off',
    'no-relative-import-paths/no-relative-import-paths': [
      'warn',
      { allowSameFolder: true, rootDir: 'lib', prefix: '@' },
    ],
    'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
  },
  settings: {
    react: {
      version: '18.2.0',
    },
    'import/resolver': {
      node: {
        paths: ['./'],
      },
    },
  },
  ignorePatterns: ['temp.js', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    requireConfigFile: false,
    plugins: ['@typescript-eslint'],
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
  globals: {
    grecaptcha: 'readonly',
  },
};
