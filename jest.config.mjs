export default {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'json'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.test.{js,mjs,cjs}',
    '**/?(*.)+(test).{js,mjs,cjs}',
  ],
}
