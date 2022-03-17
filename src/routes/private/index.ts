import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { authPrivate } from '../../modules/auth/privateRoute';
import { otpPrivateRoute } from '../../modules/otp/route';
const privateRoute = express.Router();

privateRoute.use(authMiddleware, authPrivate, otpPrivateRoute);

export { privateRoute };
