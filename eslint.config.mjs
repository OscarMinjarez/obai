import tsEslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default tsEslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/node_modules_bak/**',
      'libs/shared/src/components/ui/**',
      'apps/web/.nuxt/**',
      'apps/mobile/www/**',
    ],
  },
  ...tsEslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
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
      'vue/multi-word-component-names': 'off',
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
