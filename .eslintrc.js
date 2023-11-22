module.exports = {
  root: true,
  ignorePatterns: ['node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: [
      '@typescript-eslint',
      'import',
      'jsx-a11y',
      'prettier',
  ],
  env: {
      browser: true,
      es6: true,
      node: true,
      commonjs: true,
      jest: true,
  },
  extends: [
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
  ],
  parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
  },
  rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/ban-ts-ignore': 0,
      '@typescript-eslint/no-namespace': 1,
      '@typescript-eslint/member-delimiter-style': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/camelcase': 0,
      '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/indent': 'off',

      'import/order': [
          'error',
          {
              groups: ['builtin', 'external', 'internal'],
              pathGroups: [
                  {
                      pattern: 'express',
                      group: 'external',
                      position: 'before',
                  },
              ],
              pathGroupsExcludedImportTypes: ['express'],
              'newlines-between': 'always',
              alphabetize: {
                  order: 'asc',
                  caseInsensitive: true,
              },
          },
      ],
      camelcase: 'off',
      semi: ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'computed-property-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],

      'prettier/prettier': [
          'error',
          {
              semi: false,
              singleQuote: true,
              trailingComma: 'es5',
              endOfLine: 'lf',
              printWidth: 80,
              overrides: [
                  {
                      files: '*.{ts,js}',
                      options: {
                          tabWidth: 4,
                      },
                  },
              ],
          },
      ],
  },
}
