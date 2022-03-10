// 3rd party packages
import { hashSync, genSaltSync } from 'bcrypt';
import { faker } from '@faker-js/faker';

// Models
import { models } from '../../models';

import { errorMessage } from '../../../utils/console-messages';

const salt = genSaltSync(10);
const password = hashSync('Ab12345*', salt);

const userData: any[] = [];

for (let index = 0; index < 100; index++) {
  userData.push({
    email: faker.internet.email(),
    password,
  });
}

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

export function down() {
  throw new Error('Not implemented function');
}
