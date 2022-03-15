// 3rd party packages
import { Router } from 'express';

// middleware
import validationMiddleware from '../../../middleware/validation-middleware';

// initialization of router
const router = Router();

// Auth routes
import * as postLogin from './post.login';

export default () => {
  router.post('/login', validationMiddleware(postLogin.schema), postLogin.workflow);
  return router;
};
