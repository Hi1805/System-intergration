import express from 'express';
import { otpMiddleware } from '../../middlewares/otpMiddleware';
import AuthController from './controller';

const authPrivate = express.Router();

authPrivate.get('/auth/sessions', AuthController.getSession);
authPrivate.post(
  '/auth/reset-password',
  otpMiddleware,
  AuthController.resetPassword
);

export { authPrivate };
