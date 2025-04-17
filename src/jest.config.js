/** @type {import('jest').Config} */
const config = {
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom-sixteen',
    preset: 'js-test',
    transformIgnorePattern: [
        '<rootDir>/node_modules/(?!axios)/'
       ],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    }
};
  
module.exports = config;