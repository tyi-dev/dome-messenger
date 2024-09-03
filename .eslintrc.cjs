const prettier = require('./.prettierrc.cjs');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
  ],
  rules: {
    'prettier/prettier': ['warn', prettier],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    indent: 'off',
    semi: 'warn',
    'no-console': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': ['error', {
      'code': 120,
      'tabWidth': 2,
      'ignoreComments': true,
      'comments': 80,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
    }],
  },
}
