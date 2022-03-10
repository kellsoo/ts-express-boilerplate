// 3rd party packages
import { Sequelize } from 'sequelize';

// Define models
import defineUser from './user';

export const modelsBuilder = (sequelize: Sequelize) => ({
  User: defineUser(sequelize, 'user'),
});
