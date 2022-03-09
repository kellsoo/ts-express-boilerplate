// 3rd party packages
import { Request, Response, NextFunction } from 'express';

export const workflow = (req: Request, res: Response, next: NextFunction) => {
  res.json({ example: 'create example' });
};
