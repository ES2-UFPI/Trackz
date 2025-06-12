// trackz-api/eslint.config.mjs
// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // Use a configuração recomendada com tipos
  {
    languageOptions: {
      parserOptions: {
        project: true, // Diz ao linter para usar seu tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Ignora a regra de variáveis não utilizadas para arquivos de configuração
    files: ['eslint.config.mjs'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
);