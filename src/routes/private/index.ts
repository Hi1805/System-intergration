import express from 'express';
const privateRoute = express.Router();

privateRoute.use('/private', (req, res, next) => {
  next();
});

export { privateRoute };
