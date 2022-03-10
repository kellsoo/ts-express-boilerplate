// 3rd party packages
import { Sequelize } from 'sequelize';
import pg from 'pg';
import {} from 'lodash';

// True because otherwise BIGINT return string instead of integer https://github.com/sequelize/sequelize/issues/1774
pg.defaults.parseInt8 = true;

// utils
import { ENV } from '../../utils/enums';
import { successMessage, errorMessage } from '../../utils/console-messages';

// models
import { modelsBuilder } from './init';

// Database config
import * as databaseConfig from '../../../config/database';

// Environment variables
const { NODE_ENV } = process.env;

// Setting of current db config
const env = <ENV>NODE_ENV || ENV.development;
const { url, options } = databaseConfig[env];

const sequelize = new Sequelize(url, options);
sequelize
  .authenticate()
  .then(() => {
    console.log(successMessage('Db connection established...'.yellow.inverse));
  })
  .catch((err) => {
    console.log(errorMessage(err));
  });

const buildModels = () => {
  const models = modelsBuilder(sequelize);
  return models;
};

const models = buildModels();
type ModelsType = typeof models;

export { models };
export type { ModelsType };
export default sequelize;
