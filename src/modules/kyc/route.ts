import express from 'express';
import KYCController from './kyc.user.controller';
const kycRoute = express.Router();

kycRoute.post('/kyc/submit', KYCController.submitForm);
export { kycRoute };
