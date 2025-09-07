import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  // Общие правила стилистики
  stylistic.configs.recommended,

  // Базовые правила JS от eslint
  js.configs.recommended,

  // Конфиг для обычных файлов
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  // Конфиг для браузерных файлов
  {
    files: ['**/*.browser.{js,mjs,cjs}', '**/public/**/*.{js,mjs,cjs}', '**/src/**/*.{js,mjs,cjs}'], // укажите ваши пути
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },

  // Конфиг для тестов (jest)
  {
    files: ['**/*.test.{js,mjs,cjs}', '**/__tests__/**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest, // добавляем jest-глобалы: describe, it, test, expect и т.д.
      },
    },
    rules: {
      // можно включить/усилить правила для тестов отдельно
      'no-unused-expressions': 'off', // чтобы chai-like/expect.toBeTruthy() не ругался
    },
  },
])
