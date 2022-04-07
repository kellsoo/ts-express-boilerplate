// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import { isEmpty } from 'lodash';

// Environment variables
const { NODE_ENV } = process.env;

// Classes
import ErrorWrapper from '../classes/ErrorWrapper';

// Util
import { ENV, MESSAGE_TYPE } from '../utils/enums';
import { errorMessage } from '../utils/console-messages';

export default (err: ErrorWrapper, req: Request, res: Response, next: NextFunction) => {
  if (NODE_ENV === ENV.development) {
    // console.log(errorMessage(err));
  }

  const statusCode = err.statusCode || 500;

  let messages;
  if (statusCode < 500) {
    if (err.isJoi || !isEmpty(err.items)) messages = err.items;
    else messages = [err.message];
  } else messages = [{ type: MESSAGE_TYPE.ERROR, message: 'Something went wrong' }];

  res.status(statusCode).json({ messages });
};
