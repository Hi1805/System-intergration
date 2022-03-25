import express from 'express';
import { authPublicRoute } from '../../modules';
import { otpPublicRoute } from '../../modules/otp/route';

const publicRoute = express.Router();
publicRoute.use('/', authPublicRoute, otpPublicRoute);

export { publicRoute };
