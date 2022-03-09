// 3rd party packages
import { Router } from 'express';

// Middleware
import validationMiddleware from '../../../middleware/validation-middleware';

// Endpoint controllers
import * as getExamples from './get.examples';
import * as getExample from './get.example';
import * as postExample from './post.example';
import * as patchExampleEndpoint from './patch.example';
import * as deleteExampleEndpoint from './delete.example';

// initialization of router
const router = Router();

export default () => {
  router.get('/', validationMiddleware(getExamples.schema), getExamples.workflow);
  router.get('/:id', getExample.workflow);
  router.post('/', postExample.workflow);
  router.patch('/:id', patchExampleEndpoint.workflow);
  router.delete('/:id', deleteExampleEndpoint.workflow);

  return router;
};
