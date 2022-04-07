// 3rd party packages
import { Router } from 'express';
import passport from 'passport';

// utils
import { PERMISSION } from '../../../utils/enums';

// Middleware
import validationMiddleware from '../../../middleware/validation-middleware';

// Endpoint controllers
import * as getExamples from './get.examples';
import * as getExample from './get.example';
import * as postExample from './post.example';
import * as patchExample from './patch.example';
import * as deleteExample from './delete.example';

// Permission middleware
import permissionMiddleware from '../../../middleware/permission-middleware';

// initialization of router
const router = Router();

export default () => {
  router.get(
    '/',
    validationMiddleware(getExamples.schema),
    passport.authenticate(['jwt-api']),
    permissionMiddleware([PERMISSION.EXAMPLE_READ]),
    getExamples.workflow
  );
  router.get('/:id', validationMiddleware(getExample.schema), getExample.workflow);
  router.post('/', validationMiddleware(postExample.schema), postExample.workflow);
  router.patch('/:id', validationMiddleware(patchExample.schema), patchExample.workflow);
  router.delete('/:id', validationMiddleware(deleteExample.schema), deleteExample.workflow);

  return router;
};
