import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { authPrivate } from '../../modules/auth/privateRoute';
import { inviteRoute } from '../../modules/invite-chat/route';
import { kycRoute } from '../../modules/kyc/route';
import { privatePostRoutes } from '../../modules/post/privateRoute';
import { userPrivateRoute } from '../../modules/user/route';
const privateRoute = express.Router();

privateRoute.use(
  authMiddleware,
  authPrivate,
  userPrivateRoute,
  privatePostRoutes,
  kycRoute,
  inviteRoute
);

export { privateRoute };
