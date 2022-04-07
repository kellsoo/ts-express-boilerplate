import generator from '@goodrequest/express-joi-to-swagger';
import { join } from 'path';
import config from 'config';

import { name, version, author, license } from '../package.json';

import app from '../src/app';

export default (async () => {
  try {
    await generator(app, {
      businessLogicName: 'workflow',
      generateUI: true,
      outputPath: join(process.cwd(), 'apidoc'),
      requestSchemaName: 'schema',
      responseSchemaName: 'responseSchema',
      swaggerInitInfo: {
        // servers: [{ url: 'http://localhost:3001' }],
        info: {
          title: name,
          version,
          description: 'ts-express boilerplate project',
          contact: { email: author },
          license: { name: license, url: '' },
        },
      },
    });
  } catch (err) {}
})();
