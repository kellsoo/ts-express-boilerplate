// Node core packages
import http from 'http';

// 3rd party packages
import 'dotenv/config';
import config from 'config';
import 'colors';

// types
import { IServerConfig } from './types/interfaces';

import connection from './db/';
(async () => {
  await connection();
})();

// utils
import { successMessage, successLastMessage } from './utils/console-messages';

// Importing express application
import app from './app';

// server config
const serverConfig: IServerConfig = config.get('server');

// create http server
const httpServer = http.createServer(app);

// Environment variables
const { NODE_ENV } = process.env;

httpServer.listen(serverConfig.port, serverConfig.host, () => {
  let msg = `Server started at ${serverConfig.host}:${serverConfig.port}\n`.yellow.inverse;
  msg += `NODE_ENV: ${NODE_ENV}`.green.inverse;
  console.log(successMessage(msg));
});
export default httpServer;
