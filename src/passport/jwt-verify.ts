// 3rd party packages
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { VerifiedCallback } from 'passport-jwt';
import config from 'config';

// classes
import ErrorWrapper from '../classes/ErrorWrapper';

// types
import { IJwtPayload } from '../types/interfaces';

export const jwtVerifyUserApi = async (req: Request, payload: IJwtPayload, done: VerifiedCallback) => {
  try {
    const { User } = req.models;
    const user = await User.findOne({ where: { id: payload.uid } });
    if (!user) throw new ErrorWrapper(401, 'User not found');
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};
