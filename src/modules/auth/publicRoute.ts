import express from 'express';
import { otpMiddleware } from '../../middlewares/otpMiddleware';
import AuthController from './controller';

const authPublicRoute = express.Router();
authPublicRoute.post('/auth/login', AuthController.login);
authPublicRoute.post('/auth/register', AuthController.register);
export { authPublicRoute };
