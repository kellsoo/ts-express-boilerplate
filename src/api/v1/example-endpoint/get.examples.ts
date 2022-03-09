// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { slice } from 'lodash';

// examples data
import { examplesData } from '../../../utils/test-data';
import { paginationSchema } from '../../../utils/joi-schemas';

export const schema = Joi.object({
  headers: Joi.object(),
  body: Joi.object(),
  query: Joi.object({
    limit: Joi.number().integer().valid(25, 50, 100).default(25).optional(),
    page: Joi.number().integer().min(1).default(1).optional(),
  }),
  params: Joi.object(),
});

const responseSchema = Joi.object({
  examples: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().min(0).required(),
        example: Joi.string().required(),
      })
    )
    .required(),
  pagination: paginationSchema,
});

export const workflow = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req;
  const { limit, page } = query;
  const offset = page * limit - limit;

  const filteredData = slice(examplesData, offset, offset + limit);
  console.log(examplesData);

  res.json({ examples: filteredData });
};
