module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: false }],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};