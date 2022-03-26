import express from 'express';
import ImageController from './controller';
const imageRoute = express.Router();

imageRoute.post('/image/upload', ImageController.getUrlImage);
export { imageRoute };
