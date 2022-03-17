// Db models
import { models } from '../../models';

// Utils
import { errorMessage } from '../../../utils/console-messages';
import { SYSTEM_USER } from '../../../utils/global-variables';

const usersData = [
  {
    email: SYSTEM_USER,
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
