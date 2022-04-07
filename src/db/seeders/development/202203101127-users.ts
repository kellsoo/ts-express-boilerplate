// 3rd party packages
import { hashSync, genSaltSync } from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { QueryInterface } from 'sequelize';

// Models
import { models } from '../../models';

// utils
import { errorMessage } from '../../../utils/console-messages';

const salt = genSaltSync(10);
const password = hashSync('Ab12345*', salt);

const userData: any[] = [];

for (let index = 0; index < 5; index++) {
  userData.push({
    email: faker.internet.email(),
    password,
    createdBy: 1,
  });
}

userData.push({
  email: 'test@user.sk',
  password,
  createdBy: 1,
});

userData.push({
  email: 'test@admin.sk',
  password,
  createdBy: 1,
});

export async function up() {
  try {
    const { User } = models;
    await User.bulkCreate(userData);
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.dropTable('users', { cascade: true });
    return Promise.resolve();
  } catch (err) {
    console.log(__dirname);
    console.log(errorMessage(err));
    return Promise.reject();
  }
}
