// node core packages
import path from 'path';

// 3rd party packages
import { Sequelize } from 'sequelize';
import Umzug from 'umzug';
import { isEmpty, forEach } from 'lodash';

// db models
import sequelize from './models';

// utils
import { successLastMessage, successMessage, errorMessage } from '../utils/console-messages';

// global variables
const { NODE_ENV } = process.env;

export default async (force: boolean = false): Promise<Sequelize> | undefined => {
  try {
    await sequelize.sync();
    const msg = `${`${NODE_ENV} db`.yellow} synced...\nforce: ${`${force}`.red.inverse}`;
    console.log(successMessage(msg));

    // production seeds
    const umzugProdSeeds = new Umzug({
      storageOptions: {
        sequelize,
        modelName: 'SequelizeData',
      },
      storage: 'sequelize',
      migrations: {
        params: [sequelize.getQueryInterface()],
        path: path.resolve('src', 'db', 'seeders', 'production'),
        pattern: /.ts$/,
      },
    });
    const prodSeeds = await umzugProdSeeds.up();

    if (isEmpty(prodSeeds)) console.log(successLastMessage('No production seeds'.green.inverse));
    else {
      let msg = '';
      forEach(prodSeeds, (seed) => (msg += `== ${seed.file}: seeding =======\n`));
      msg += '\nProduction seed successfully created'.green.inverse;
      console.log(successLastMessage(msg));
    }
    return sequelize;
  } catch (err) {
    console.log(__dirname);

    console.log(errorMessage(err));
  }
};
