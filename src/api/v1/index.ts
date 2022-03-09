// 3rd party packages
import { Router } from 'express';

// initialization of router
const router = Router();

// Endpoints routers
import ExampleEndpointRouter from './example-endpoint';

export default () => {
  router.use('/examples', ExampleEndpointRouter());

  return router;
};
