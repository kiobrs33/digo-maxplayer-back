// eslint.config.js
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['src/**/*.ts'], // Aplica estas reglas a los archivos TypeScript.
    languageOptions: {
      parser: tsParser, // Usa el parser de TypeScript.
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin, // Agrega el plugin de Prettier.
    },
    rules: {
      // Aquí puedes agregar reglas personalizadas.
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'warn',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto', // Ignora los caracteres de fin de línea.
        },
      ], // Habilita las reglas de Prettier.
    },
  },
  eslintConfigPrettier, // Asegúrate de que Prettier sea compatible con ESLint.
];
