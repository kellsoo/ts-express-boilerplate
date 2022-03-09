// interfaces
import { IConfig } from '../src/types/interfaces';

// Env variables
const { HOST, PORT } = process.env;

export default <IConfig>{
  server: {
    port: PORT || 3001,
    host: HOST || '127.0.0.1',
  },
};
