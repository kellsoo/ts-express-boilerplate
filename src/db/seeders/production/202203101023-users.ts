// Db models
import { models } from '../../models';

const usersData = [
  {
    email: 'systemuser',
    hash: '12322343456789',
  },
];

export async function up() {
  try {
    const { User } = models;
    await User.bulkCreate(usersData);
    return Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
}

export async function down() {}
