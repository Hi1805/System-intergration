import express from 'express';
import { privateRoute } from './private/index';
import { publicRoute } from './public/index';
const apiRouter = express.Router();

apiRouter.use(privateRoute, publicRoute);

export default apiRouter;
