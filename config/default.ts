// interfaces
import { IConfig } from '../src/types/interfaces';
import { ExtractJwt } from 'passport-jwt';

// Env variables
const { HOST, PORT, JWT_SECRET } = process.env;

// utils
import { JWT_AUDIENCE } from '../src/utils/enums';

export default <IConfig>{
  server: {
    port: PORT || 3001,
    host: HOST || '127.0.0.1',
  },
  passport: {
    local: {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true, // passing request object to callback
    },
    jwt: {
      secretOrKey: JWT_SECRET || '9bf0fdd1db2ab694d994fc9ccadb3b7e8e27941a7876115f82803dec7510f08a',
      api: {
        audience: JWT_AUDIENCE.API,
        exp: '2h',
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
        passReqToCallback: true,
      },
    },
  },
};
