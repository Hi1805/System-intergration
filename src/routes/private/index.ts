import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { authPrivate } from '../../modules/auth/privateRoute';
import { privatePostRoutes } from '../../modules/post/privateRoute';
import { userPrivateRoute } from '../../modules/user/route';
const privateRoute = express.Router();

privateRoute.use(
  '/api',
  authMiddleware,
  authPrivate,
  userPrivateRoute,
  privatePostRoutes
);

export { privateRoute };
