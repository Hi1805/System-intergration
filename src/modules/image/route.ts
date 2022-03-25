import express from 'express';
import ImageController from './controller';
import multer from 'multer';
const upload = multer();
const imageRoute = express.Router();

imageRoute.post(
  '/image/upload',
  upload.array('files', 15),
  ImageController.getUrlImage
);
export { imageRoute };
