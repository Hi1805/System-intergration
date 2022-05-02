import express from 'express';
import AppController from '../controllers';
const appRoute = express.Router();

appRoute.get('/total-earning', AppController.getTotalEarning);

export default appRoute;
