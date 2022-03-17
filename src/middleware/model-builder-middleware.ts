// 3rd party packages
import { Request, Response, NextFunction } from 'express';

// db
import { models } from '../db/models/index';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    req.models = models;
    next();
  } catch (err) {
    return next(err);
  }
};
