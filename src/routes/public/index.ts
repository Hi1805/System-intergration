import express from 'express';
import { authPublicRoute } from '../../modules';
import { imageRoute } from '../../modules/image/route';
import { otpPublicRoute } from '../../modules/otp/route';
import { publicPostRoute } from '../../modules/post/publicRoute';

const publicRoute = express.Router();
publicRoute.use(
  '/',
  authPublicRoute,
  otpPublicRoute,
  publicPostRoute,
  imageRoute
);

export { publicRoute };
