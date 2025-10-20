module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
    ignorePatterns: ['dist', '.eslintrc.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-key': 'warn',
    'react/display-name': 'warn',
  },
};