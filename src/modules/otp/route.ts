import express from 'express';
import OTPController from './controller';

const otpPrivateRoute = express.Router();
otpPrivateRoute.post('/otp/generate', OTPController.generateOtp);
export { otpPrivateRoute };
