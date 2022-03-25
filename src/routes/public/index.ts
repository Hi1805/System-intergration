import express from 'express';
import { authPublicRoute } from '../../modules';
import { imageRoute } from '../../modules/image/route';
import { otpPublicRoute } from '../../modules/otp/route';

const publicRoute = express.Router();
publicRoute.use('/', authPublicRoute, otpPublicRoute, imageRoute);

export { publicRoute };
