// dotenv
import 'dotenv/config';
import 'colors';

// 3rd party packages
import { Options } from 'sequelize';

// Env variables
const { POSTGRES_DEV_URL, POSTGRES_TEST_URL } = process.env;

const defDbOptions = <Options>{
  minifyAliases: true,
  logging: false,
  pool: { max: 4 },
  dialect: 'postgres',
};

export const development = {
  url: POSTGRES_DEV_URL,
  options: defDbOptions,
};

export const test = {
  url: POSTGRES_TEST_URL,
  options: defDbOptions,
};

export const production = {
  url: POSTGRES_DEV_URL,
  options: defDbOptions,
};
