import express from 'express';
import { otpMiddleware } from '../../middlewares/otpMiddleware';
import AuthController from './controller';

const authPrivate = express.Router();
authPrivate.post(
  '/auth/register/otp',
  otpMiddleware,
  AuthController.checkAuthOtp
);
authPrivate.get('/auth/sessions', AuthController.getSession);
export { authPrivate };
