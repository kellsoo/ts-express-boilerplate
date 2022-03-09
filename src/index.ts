// Node core packages
import http from 'http';

// 3rd party packages
import 'dotenv/config';
import config from 'config';
import 'colors';

// types
import { IServerConfig } from './types/interfaces';

// utils
import { successMessage, successLastMessage } from './utils/console-messages';

// Importing express application
import app from './app';

// server config
const serverConfig: IServerConfig = config.get('server');

// create http server
const httpServer = http.createServer(app);

httpServer.listen(serverConfig.port, serverConfig.host, () => {
  const msg = `Server started at ${serverConfig.host}:${serverConfig.port}`
    .yellow.inverse;
  console.log(successLastMessage(msg));
});
export default httpServer;
