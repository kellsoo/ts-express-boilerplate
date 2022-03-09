// 3rd party packages
import Joi from 'joi';
import { forEach } from 'lodash';

// Utils
import { MESSAGE_TYPE } from './enums';

// single success message
export const successMessageSchema = Joi.object({
  messages: Joi.array()
    .items(
      Joi.object({
        message: Joi.string().required(),
        type: Joi.string().valid(MESSAGE_TYPE.SUCCESS).required(),
      })
    )
    .required(),
});

export const paginationSchema = Joi.object({
  limit: Joi.number().integer().required(),
  page: Joi.number().integer().required(),
  totalPages: Joi.number().integer().min(0).required(),
  totalCount: Joi.number().integer().min(0).required(),
});
