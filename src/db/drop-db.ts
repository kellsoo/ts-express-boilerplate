// node core packages
import { resolve } from 'path';

// 3rd party packages
import Umzug from 'umzug';
import { isEmpty, forEach } from 'lodash';
import colors from 'colors';

// db
import sync from './index';

// utils
import { successMessage } from '../utils/console-messages';

(async () => {
  const sequelize = await sync();
  await sequelize.drop({ cascade: true });
  console.log('drop finish');
  await sync();

  if (process.argv[2] !== 'seed') process.exit();

  const umzugDevSeeds = new Umzug({
    storageOptions: {
      sequelize,
      modelName: 'SequelizeData',
    },
    storage: 'sequelize',
    migrations: {
      params: [sequelize.getQueryInterface()],
      path: resolve('src', 'db', 'seeders', 'development'),
      pattern: /.ts$/,
    },
  });

  const devSeeds = await umzugDevSeeds.up();
  if (isEmpty(devSeeds)) console.log(successMessage(`No dev seeds`.green.inverse));
  else {
    let msg = '';
    forEach(devSeeds, (seed) => (msg += `== ${seed.file}: seeding =======\n`));
    msg += `\nDev seeds successfully created`.green.inverse;
    console.log(successMessage(msg));
  }
  process.exit();
})();
