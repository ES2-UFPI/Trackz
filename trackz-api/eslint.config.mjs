// trackz-api/eslint.config.mjs
// @ts-check

import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Estende as configurações recomendadas E as que exigem informação de tipo
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        // A linha abaixo garante que o linter encontre seu tsconfig.json
        // Ele vai procurar por tsconfig.json a partir do diretório onde este config está.
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
      // Adicione outras regras customizadas aqui se precisar
    },
  },
  {
    // Ignora o próprio arquivo de configuração da análise de lint
    ignores: ['eslint.config.mjs'],
  }
);