import express from 'express';
import OTPController from './controller';

const otpPublicRoute = express.Router();
otpPublicRoute.post('/otp/generate', OTPController.generateOtp);
export { otpPublicRoute };
