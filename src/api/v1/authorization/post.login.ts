// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

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
  profile: Joi.string().required(),
}).required();

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    res.json(body);
  } catch (error) {
    return next(error);
  }
};
