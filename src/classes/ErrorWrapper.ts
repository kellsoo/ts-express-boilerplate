// 3rd party packages
import { ValidationErrorItem } from 'joi';
import { map } from 'lodash';

// Types
import { IErrorWrapperItem } from '../types/interfaces';

// Utils
import { MESSAGE_TYPE } from '../utils/enums';

export default class ErrorWrapper extends Error {
  statusCode: number;
  isJoi?: boolean;
  items: IErrorWrapperItem[];

  constructor(statusCode: number, message: string | ValidationErrorItem[]) {
    super(JSON.stringify(message));
    this.statusCode = statusCode;
    this.isJoi = typeof message !== 'string';
    this.items = this.createErrorItems(message);
  }

  createErrorItems(message: string | ValidationErrorItem[]): IErrorWrapperItem[] {
    if (typeof message === 'string') return [{ type: MESSAGE_TYPE.ERROR, message }];
    return map(
      message,
      (item: ValidationErrorItem): IErrorWrapperItem => ({
        type: MESSAGE_TYPE.ERROR,
        path: item.path.join('.'),
        message: item.message,
      })
    );
  }
}
