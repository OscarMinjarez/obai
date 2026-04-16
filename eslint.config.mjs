import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'padded-blocks': ['error', { 
        classes: 'always', 
        blocks: 'never', 
        switches: 'never' 
      }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'semi': ['error', 'always'],
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  }
);
