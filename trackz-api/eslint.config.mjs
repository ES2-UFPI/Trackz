// trackz-api/eslint.config.mjs
// @ts-check

import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';

// Esta é a configuração base para todos os arquivos TypeScript.
// Ela define o parser e as regras de tipo.
const tsBaseConfig = tseslint.config({
  files: ['**/*.ts'],
  extends: [...tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
    ],
  },
});

// Esta é a configuração específica para os arquivos de teste Jest.
const jestConfig = {
  files: ['**/*.spec.ts', 'test/**/*.ts'],
  ...jestPlugin.configs['flat/recommended'],
  rules: {
    ...jestPlugin.configs['flat/recommended'].rules,
  },
};

// Exportamos um array com todas as configurações.
// O ESLint irá mesclá-las corretamente.
export default [
  {
    ignores: ['node_modules/', 'dist/', 'eslint.config.mjs'],
  },
  ...tsBaseConfig, // Aplica a configuração base de TS a todos os arquivos .ts
  jestConfig,     // Aplica a configuração do Jest por cima para os arquivos de teste
];