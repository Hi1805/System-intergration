import express from 'express';
import AppController from '../controllers';
const appRoute = express.Router();

appRoute.get('/department-earning', AppController.getDepartmentEarning);
appRoute.get('/pay-rate', AppController.getPayRate);
appRoute.get('/vacation', AppController.getTotalVacationGender);
appRoute.post('/add-employee', AppController.addEmployee);
appRoute.get('/gender-earning', AppController.getGenderEarning);
export default appRoute;
