// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import { Transaction } from 'sequelize';

// classes
import ErrorWrapper from '../classes/ErrorWrapper';

export default (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  let transaction = 'test';
  try {
    await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};
//   Promise.resolve(fn(req, res, next)).catch((err) => next(err));
