import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { authPrivate } from '../../modules/auth/privateRoute';
import { userPrivateRoute } from '../../modules/user/route';
const privateRoute = express.Router();

privateRoute.use(authMiddleware, authPrivate, userPrivateRoute);

export { privateRoute };
