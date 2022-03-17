// 3rd party packages
import { Sequelize } from 'sequelize';
import { forEach } from 'lodash';

// utils
import { errorMessage } from '../src/utils/console-messages';

// db
import syncDb from '../src/db/index';
import devSeeds from '../src/db/seeders/development';

let connection: Sequelize;

// global setup
export async function mochaGlobalSetup() {
  try {
    connection = await syncDb(true);
    forEach(devSeeds, async (seed: Function) => {
      await seed(connection.getQueryInterface());
    });
    console.clear();
  } catch (err) {
    console.log(errorMessage(err));
  }
}

// After all tests
export async function mochaGlobalTeardown() {
  try {
    await connection.sync({ force: true });
    connection.close();
  } catch (err) {
    console.log(errorMessage(err));
  }
}

// Global hooks
export async function mochaHooks() {
  return {
    beforeAll: () => {},
    afterAll: () => {},
  };
}
