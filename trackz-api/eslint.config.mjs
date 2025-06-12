// trackz-api/eslint.config.mjs
// @ts-check

import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
  // === Bloco 1: Configuração para TODO o projeto TypeScript ===
  {
    // Aplica-se a todos os arquivos .ts
    files: ['**/*.ts'],
    // Usa as configurações recomendadas que precisam de informação de tipo
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
    ],
    // Informa ao ESLint como "ler" o TypeScript
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // Regras que se aplicam a todos os arquivos
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      // Adicione outras regras globais aqui se desejar
    },
  },

  // === Bloco 2: Configuração específica para arquivos de TESTE ===
  {
    files: ['**/*.spec.ts'], // Aplica-se SOMENTE a arquivos de teste
    // Usa as regras recomendadas do plugin do Jest
    extends: [jestPlugin.configs['flat/recommended']],
    rules: {
      // Você pode sobrescrever regras do Jest aqui se precisar
    },
  },

  // === Bloco 3: Arquivos a serem ignorados globalmente ===
  {
    ignores: ['dist/', 'node_modules/', 'eslint.config.mjs'],
  }
);