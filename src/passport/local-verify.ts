// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { IVerifyOptions } from 'passport-local';
import passport from 'passport';
import { compare } from 'bcryptjs';

// classes
import ErrorWrapper from '../classes/ErrorWrapper';

// utils
import { SYSTEM_USER } from '../utils/global-variables';

export default async (
  req: Request,
  email: string,
  password: string,
  done: (error: any, userCallback?: any, options?: IVerifyOptions) => void
) => {
  try {
    const { User } = req.models;

    const user = await User.findOne({
      where: {
        [Op.and]: [
          {
            // eliminate SYSTEM_USER user
            email: { [Op.notIn]: [SYSTEM_USER] },
          },
          {
            email: { [Op.eq]: email },
          },
        ],
      },
    });

    let errorMessage;

    if (!user || !user.password) errorMessage = 'Wrong credentials';
    else if (user.password) {
      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) errorMessage = 'Wrong credentials';
    }

    if (errorMessage) return done(null, false, { message: errorMessage });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export const localVerificationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (error, user, message) => {
    try {
      if (error) return next(error);
      if (!user) throw new ErrorWrapper(401, message.message);
      req.user = user;
      return next();
    } catch (err) {
      return next(err);
    }
  })(req, res);
};
