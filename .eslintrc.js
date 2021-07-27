module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
  ],
  rules: {
  },
  overrides: [
    {
      files: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
      ],
      extends: [
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ]
    },
  ],
};
