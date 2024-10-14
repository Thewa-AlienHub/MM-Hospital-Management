// jest.config.js
export default {
    transform: {
      '^.+\\.js$': 'babel-jest', // This tells Jest to use Babel to transform .js files
    },
    testEnvironment: 'node', // Use the Node environment
  };
  