// 3rd party packages
import { Router } from 'express';

// Middleware
import validationMiddleware from '../../../middleware/validation-middleware';

// Endpoint controllers
import * as getExamples from './get.examples';
import * as getExample from './get.example';
import * as postExample from './post.example';
import * as patchExampleEndpoint from './patch.example';
import * as deleteExample from './delete.example';

// initialization of router
const router = Router();

export default () => {
  router.get('/', validationMiddleware(getExamples.schema), getExamples.workflow);
  router.get('/:id', validationMiddleware(getExample.schema), getExample.workflow);
  router.post('/', postExample.workflow);
  router.patch('/:id', patchExampleEndpoint.workflow);
  router.delete('/:id', validationMiddleware(deleteExample.schema), deleteExample.workflow);

  return router;
};
