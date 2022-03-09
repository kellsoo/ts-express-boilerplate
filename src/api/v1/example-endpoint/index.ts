// 3rd party packages
import { Router } from 'express';

// initialization of router
const router = Router();

// Endpoint controllers
import * as getExamplesEndpoint from './get.examples';
import * as getExampleEndpoint from './get.example';
import * as postExampleEndpoint from './post.example';
import * as patchExampleEndpoint from './patch.example';
import * as deleteExampleEndpoint from './delete.example';

export default () => {
  router.get('/', getExamplesEndpoint.workflow);
  router.get('/:id', getExampleEndpoint.workflow);
  router.post('/', postExampleEndpoint.workflow);
  router.patch('/:id', patchExampleEndpoint.workflow);
  router.delete('/:id', deleteExampleEndpoint.workflow);

  return router;
};
