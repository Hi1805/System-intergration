import express from 'express';
import privatePostController from './PrivateController';
const privatePostRoutes = express.Router();
privatePostRoutes.post('/post/create',privatePostController.createPost)
export { privatePostRoutes };
