import express from 'express';
import OTPController from './controller';

const otpPrivateRoute = express.Router();
otpPrivateRoute.get('/otp/generate', OTPController.generateOtp);
export { otpPrivateRoute };
