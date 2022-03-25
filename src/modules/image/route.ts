import express from 'express';
import ImageController from './controller';
import multer from 'multer';
const upload = multer();
const imageRoute = express.Router();

imageRoute.post(
  '/image/upload',
  upload.single('file'),
  ImageController.getUrlImage
);
export { imageRoute };
