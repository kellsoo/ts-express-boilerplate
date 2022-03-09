// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { find } from 'lodash';

// Classes
import ErrorWrapper from '../../../classes/ErrorWrapper';

// utils
import { examplesData } from '../../../utils/test-data';

export const schema = Joi.object({
  params: Joi.object({
    id: Joi.number().integer().min(1).required(),
  }),
  query: Joi.object(),
  body: Joi.object(),
});

export const responseSchema = Joi.object({
  example: Joi.object({
    id: Joi.number().integer().min(1).required(),
    example: Joi.string().required(),
  }),
});

export const workflow = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const example = find(examplesData, (example) => example.id === id);

  if (!example) throw new ErrorWrapper(404, 'Example not found');

  res.json({ example });
};
