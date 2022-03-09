// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { forOwn, result } from 'lodash';

// Classes
import ErrorWrapper from '../classes/ErrorWrapper';

// validation options
const options = {
  abortEarly: false,
};

export default (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let { query, body, params } = req;

    // retype of null values
    forOwn(query, (value, key) => {
      if (value === 'null') query[key] = null;
    });

    const validationResult = schema.validate({ query, body, params }, options);

    if (validationResult.error) {
      throw new ErrorWrapper(400, validationResult.error.details);
    }

    req.body = validationResult.value.body;
    req.query = validationResult.value.query;
    req.params = validationResult.value.params;

    return next();
  };
};
