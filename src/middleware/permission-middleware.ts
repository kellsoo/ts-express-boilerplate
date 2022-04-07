// 3rd party packages
import { Request, Response, NextFunction } from 'express';

// db
import { models } from '../db/models';

// classes
import ErrorWrapper from '../classes/ErrorWrapper';

// utils
import { errorMessage } from '../utils/console-messages';
import { PERMISSION } from '../utils/enums';

// env variables
const { NODE_ENV } = process.env;

export default (allowedPermissions: PERMISSION[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const err = new ErrorWrapper(401, 'Permission denied');
      if (!user) throw err;

      const { User, Permission, UserRole, Role } = models;

      // const usersPermissions = [];

      // const userRoles = await UserRole.findAll({
      //   where: { userId: user.id },
      //   include: [
      //     {
      //       model: Role,
      //       include: [{ model: Permission }],
      //     },
      //   ],
      // });

      return next();
    } catch (err) {
      if (NODE_ENV !== 'production') console.log(errorMessage(err));
      return next(err);
    }
  };
};
