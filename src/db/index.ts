// node core packages
import path from 'path';

// 3rd party packages
import Umzug from 'umzug';
import { isEmpty, forEach } from 'lodash';

// db models
import sequelize from './models';

// utils
import { successLastMessage, successMessage, errorMessage } from '../utils/console-messages';

(async () => {
  try {
    await sequelize.sync();
    const msg = `sequelize synced`.blue.inverse;
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
      msg += 'Production seed successfully created'.green.inverse;
      console.log(successLastMessage(msg));
    }
  } catch (err) {
    console.log(errorMessage(err));
  }
})();
