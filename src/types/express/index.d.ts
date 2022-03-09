// Express types
import { Request as OriginalRequest } from 'express/index';

declare module 'express' {
  export interface Request extends Omit<OriginalRequest, 'query'> {
    query: any;
  }
}
