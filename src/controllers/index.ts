import { Request, Response } from 'express';
import { hrModel } from '../database/hr';
import { payrollModel } from '../database/payroll';
class AppController {
  async getTotalEarning(req: Request, res: Response) {
    try {
      const persons = await hrModel.Job_History.findAll({
        include: [
          {
            model: hrModel.Personal,
            as: 'Employee',
          },
        ],
      });

      const list = await Promise.all(
        persons.map(async (person) => {
          const { Employee, Employee_ID } = person;
          const payRates = await payrollModel.pay_rates.findByPk(Employee_ID);
          if (payRates) {
            const { Pay_Amount, Value, Tax_Percentage } = payRates; // pay_rate is the hourly rate
            const earning = Pay_Amount * (Value - Tax_Percentage);
            return {
              ...Employee.toJSON(),
              earning,
              ...person.toJSON(),
            };
          }
          return {
            ...Employee.toJSON(),
            earning: 0,
          };
        })
      );
      return res.status(200).json({
        list,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Sever Internal Error',
      });
    }
  }
}

export default new AppController();
