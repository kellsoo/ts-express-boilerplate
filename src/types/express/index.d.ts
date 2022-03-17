// Express types
import { Request as OriginalRequest } from 'express/index';

// model type
import { ModelType } from '../../db/models';
import { UserModel } from '../../db/models/user';

declare module 'express' {
  export interface Request extends Omit<OriginalRequest, 'query'> {
    models: ModelType;
    user: UserModel;
    query: any;
  }
}
