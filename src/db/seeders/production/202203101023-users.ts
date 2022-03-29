// 3rd party packages
import { Sequelize, QueryInterface } from 'sequelize';

// Db models
import { models } from '../../models';

// Utils
import { errorMessage } from '../../../utils/console-messages';
import { SYSTEM_USER } from '../../../utils/global-variables';

const usersData = [
  {
    email: SYSTEM_USER,
    createdBy: 1,
  },
];

export async function up() {
  try {
    const { User } = models;
    await User.bulkCreate(usersData);
  } catch (err) {
    console.log(errorMessage(err));
    Promise.reject();
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.dropTable('users', { cascade: true });
    return Promise.resolve();
  } catch (err) {
    console.log(errorMessage(err));
    return Promise.reject();
  }
}
