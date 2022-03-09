// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { findIndex } from 'lodash';

// Classes
import ErrorWrapper from '../../../classes/ErrorWrapper';

// utils
import { successMessageSchema } from '../../../utils/joi-schemas';
import { examplesData } from '../../../utils/test-data';
import { MESSAGE_TYPE } from '../../../utils/enums';

export const schema = Joi.object({
  params: Joi.object({
    id: Joi.number().integer().min(1).required(),
  }),
  query: Joi.object(),
  body: Joi.object({
    example: Joi.string().min(3).required(),
  }),
});

export const responseSchema = successMessageSchema;

export const workflow = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { example: newExampleString } = req.body;
  const exampleIndex = findIndex(examplesData, (example) => example.id === id);

  if (exampleIndex === -1) throw new ErrorWrapper(404, 'Example not found');

  examplesData[exampleIndex].example = newExampleString;

  const messages = [
    {
      type: MESSAGE_TYPE.SUCCESS,
      message: `example with id: ${id} successfully updated`,
    },
  ];

  res.json({ messages });
};
