// 3rd party packages
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { find, remove } from 'lodash';

// Classes
import ErrorWrapper from '../../../classes/ErrorWrapper';

// utils
import { examplesData } from '../../../utils/test-data';
import { successMessageSchema } from '../../../utils/joi-schemas';
import { MESSAGE_TYPE } from '../../../utils/enums';

export const schema = Joi.object({
  params: Joi.object({
    id: Joi.number().integer().min(1).required(),
  }),
  query: Joi.object(),
  body: Joi.object(),
});

export const responseSchema = successMessageSchema;

export const workflow = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const example = find(examplesData, (example) => example.id === id);
  if (!example) throw new ErrorWrapper(404, 'Example not found');

  remove(examplesData, (example) => example.id === id);

  const messages = [
    { type: MESSAGE_TYPE.SUCCESS, message: `example with id: ${id} successfully deleted` },
  ];
  res.json({ messages });
};
