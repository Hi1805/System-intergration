import express from 'express';
import { otpMiddleware } from '../../middlewares/otpMiddleware';
import UserController from './controller';
const userPrivateRoute = express.Router();
userPrivateRoute.post('/user/change-email', UserController.changeEmail);
userPrivateRoute.post(
  '/user/verify-email',
  otpMiddleware,
  UserController.verifyEmail
);
export { userPrivateRoute };
