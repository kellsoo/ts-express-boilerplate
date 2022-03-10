// Db models
import { models } from '../../models';

// Utils
import { errorMessage } from '../../../utils/console-messages';

const usersData = [
  {
    email: 'systemuser',
    password: '12322343456789',
  },
];

export async function up() {
  try {
    const { User } = models;
    await User.bulkCreate(usersData);
    return Promise.resolve();
  } catch (error) {
    console.log(errorMessage(error));
    Promise.reject();
  }
}

export async function down() {}
