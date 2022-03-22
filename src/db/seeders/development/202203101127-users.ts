// 3rd party packages
import { hashSync, genSaltSync } from 'bcryptjs';
import { faker } from '@faker-js/faker';

// Models
import { models } from '../../models';

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
