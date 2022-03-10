// Node core packages
import path from 'path';

// utils
import { errorMessage } from '../src/utils/console-messages';

// Sequelize instance
import sequelize from '../src/db/models';

// seeds
import prodSeeds from '../src/db/seeders/production';
import devSeeds from '../src/db/seeders/development';

export default (async () => {
  try {
    await [...prodSeeds, ...devSeeds].reduce(
      (promise: Promise<any>, seed: Function): Promise<any> =>
        promise.then(() => seed(sequelize.getQueryInterface())),
      Promise.resolve()
    );
  } catch (err) {
    console.log(errorMessage(err));
  }
})();
