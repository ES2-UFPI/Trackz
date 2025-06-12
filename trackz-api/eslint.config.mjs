// trackz-api/eslint.config.mjs
// @ts-check

import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Estende as configurações recomendadas E as que exigem informação de tipo
  ...tseslint.configs.recommendedTypeChecked,
  {
    // Aplica configurações específicas para arquivos TypeScript
    languageOptions: {
      parserOptions: {
        project: true,
        // A linha abaixo garante que o linter encontre seu tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Relaxa a regra de 'variáveis não usadas' apenas para argumentos de função
      // que começam com um underscore (_), o que é útil em NestJS.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // Ignora o próprio arquivo de configuração da análise de lint
    ignores: ['eslint.config.mjs'],
  }
);