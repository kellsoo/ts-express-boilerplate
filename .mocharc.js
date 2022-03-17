require('dotenv').config();

module.exports = {
  require: ['./tests/global.ts'],
  // spec: ['./tests/**/*.test.ts'],
  spec: ['./tests/**/authorization/*.test.ts'],
};
