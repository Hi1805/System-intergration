import express from 'express';
import { authPublicRoute } from './publicRoute';

const authRouter = express.Router();
authRouter.use('/auth', authPublicRoute);

export { authRouter };
