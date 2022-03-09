// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { maxBy } from 'lodash';

// utils
import { examplesData } from '../../../utils/test-data';
import { MESSAGE_TYPE } from '../../../utils/enums';
import { successMessageArraySchema } from '../../../utils/joi-schemas';

export const schema = Joi.object({
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    example: Joi.string().min(3).required(),
  }),
});

export const responseSchema = Joi.object({
  example: Joi.object({
    id: Joi.number().integer().min(1).required(),
    example: Joi.string().required(),
  }),
  messages: successMessageArraySchema,
});

export const workflow = (req: Request, res: Response, next: NextFunction) => {
  const { example } = req.body;

  let { id } = maxBy(examplesData, (example) => example.id);
  id += 1;

  const newExample = { id, example };
  examplesData.push(newExample);

  const messages = [
    {
      type: MESSAGE_TYPE.SUCCESS,
      message: 'Example successfully created',
    },
  ];

  res.json({
    example: newExample,
    messages,
  });
};
