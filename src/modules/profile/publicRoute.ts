import express from 'express';
import PublicController from './PublicController';
const profileRoute = express.Router();
profileRoute.get('/v2/api/profile/:uid', PublicController.getProfile);
export { profileRoute };
