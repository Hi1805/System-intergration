import express from 'express';
import { privateRoute } from './private';
import { publicRoute } from './public';
const apiRouter = express.Router();

apiRouter.use(publicRoute, privateRoute);

export default apiRouter;
