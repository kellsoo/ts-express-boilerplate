// 3rd party packages
import config from 'config';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Transaction } from 'sequelize';

// Db
import sequelize from '../../../db/models';

// middleware
import controllerWrapper from '../../../middleware/middleware-wrapper';

// types
import { IPassportConfig } from '../../../types/interfaces';

// utils
import { createJwt } from '../../../utils/auth';
import { JWT_AUDIENCE } from '../../../utils/enums';

// Passport settings
const passportConfig: IPassportConfig = config.get('passport');

export const schema = Joi.object({
  body: Joi.object({
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
  }),
  query: Joi.object(),
  params: Joi.object(),
});

export const responseSchema = Joi.object({
  accessToken: Joi.string().required(),
  profile: Joi.object({
    id: Joi.number().integer().min(1).required(),
    email: Joi.string().required(),
  }),
}).required();

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
  let transaction: Transaction;
  try {
    const { user } = req;

    transaction = await sequelize.transaction();

    const [accessToken] = await Promise.all([
      createJwt({ uid: user.id }, { audience: JWT_AUDIENCE.API, expiresIn: passportConfig.jwt.api.exp }),
      user.update({ lastLoginAt: new Date() }, { transaction }),
    ]);

    transaction.commit();

    const resObj = {
      accessToken,
      profile: {
        id: user.id,
        email: user.email,
      },
    };

    res.json(resObj);
  } catch (error) {
    await transaction.rollback();
    return next(error);
  }
};
