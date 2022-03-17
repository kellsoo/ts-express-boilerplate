// 3rd party packages
import { sign, SignOptions } from 'jsonwebtoken';
import config from 'config';

// classes
import ErrorWrapper from '../classes/ErrorWrapper';

// types
import { IPassportConfig } from '../types/interfaces';

// passport setup
const passportConfig: IPassportConfig = config.get('passport');

export const createJwt = async (payload: any, options: SignOptions, secret?: string): Promise<string> | never => {
  secret = secret || passportConfig.jwt.secretOrKey;
  return sign(payload, secret, options);
};
