// 3rd party packages
import { Router } from 'express';

// initialization of router
const router = Router();

// Endpoints routers
import AuthorizationRouter from './authorization';
import ExampleEndpointRouter from './example-endpoint';

export default () => {
  router.use('/auth', AuthorizationRouter());
  router.use('/examples', ExampleEndpointRouter());

  return router;
};
