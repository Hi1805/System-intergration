import { Request, Response } from 'express';
import { toNumber, toString } from 'lodash';
import { hrModel } from '../database/hr';
import { payrollModel } from '../database/payroll';
class AppController {
  async getDepartmentEarning(req: Request, res: Response) {
    try {
      const persons = await hrModel.Job_History.findAll();
      const StatisticDepartment: Array<{
        [key: string]: number;
      }> = [];

      await Promise.all(
        persons.map(async (person) => {
          const { Employee_ID, Department } = person;
          const employee = await payrollModel.employee.findOne({
            where: {
              idEmployee: Employee_ID,
            },
          });
          const pay_rates = await payrollModel.pay_rates.findOne({
            where: {
              idPay_Rates: employee?.PayRates_id,
            },
          });
          const statistic = StatisticDepartment.find(
            (department) =>
              department[toString(Department).toLowerCase()] !== undefined
          );
          let earning = 0;

          if (pay_rates) {
            const { Pay_Amount, Value, Tax_Percentage } = pay_rates; // pay_rate is the hourly rate
            earning = Pay_Amount * (Value - Tax_Percentage);
          }

          if (!statistic) {
            StatisticDepartment.push({
              [toString(Department).toLowerCase()]: earning,
            });
          } else statistic[toString(Department).toLowerCase()] += earning;
        })
      );

      return res.status(200).json({
        data: StatisticDepartment,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Sever Internal Error',
      });
    }
  }

  async getGenderEarning(req: Request, res: Response) {
    try {
      const persons = await hrModel.Personal.findAll();
      const StatisticGender: Array<{
        [key: string]: number;
      }> = [];

      for (const person of persons) {
        const { Employee_ID, Gender } = person;
        const employee = await payrollModel.employee.findOne({
          where: {
            idEmployee: Employee_ID,
          },
        });
        const pay_rates = await payrollModel.pay_rates.findOne({
          where: {
            idPay_Rates: employee?.PayRates_id,
          },
        });
        const statistic = StatisticGender.find(
          (department) =>
            department[toString(Gender).toLowerCase()] !== undefined
        );
        let earning = 0;

        if (pay_rates) {
          const { Pay_Amount, Value, Tax_Percentage } = pay_rates; // pay_rate is the hourly rate
          earning = Pay_Amount * (Value - Tax_Percentage);
        }

        if (!statistic) {
          StatisticGender.push({
            [toString(Gender).toLowerCase()]: earning,
          });
        } else statistic[toString(Gender).toLowerCase()] += earning;
      }

      return res.status(200).json({
        data: StatisticGender,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Sever Internal Error',
      });
    }
  }

  async getTotalVacationGender(req: Request, res: Response) {
    try {
      const persons = await hrModel.Personal.findAll();
      const StatisticGender: Array<{
        [key: string]: number;
      }> = [];

      for (const person of persons) {
        const { Employee_ID, Gender } = person;
        const employee = await payrollModel.employee.findOne({
          where: {
            idEmployee: Employee_ID,
          },
        });
        const statistic = StatisticGender.find(
          (department) =>
            department[toString(Gender).toLowerCase()] !== undefined
        );

        if (!statistic) {
          StatisticGender.push({
            [toString(Gender).toLowerCase()]: employee?.Vacation_Days ?? 0,
          });
        } else
          statistic[toString(Gender).toLowerCase()] +=
            employee?.Vacation_Days || 0;
      }

      return res.status(200).json({
        data: StatisticGender,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Sever Internal Error',
      });
    }
  }

  async getPayRate(req: Request, res: Response) {
    try {
      const pay_rates = await payrollModel.pay_rates.findAll();
      return res.status(200).json({
        data: pay_rates,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Sever Internal Error',
      });
    }
  }

  async addEmployee(req: Request, res: Response) {
    try {
      const {
        First_Name,
        Last_Name,
        SSN,
        City,
        Shareholder_Status,
        Gender,
        Department,
        pay_rate,
        vacation,
      } = req.body;

      const totalEmployee = await payrollModel.employee.count();

      const Employee_ID = totalEmployee + 1;
      const employee_payroll = await payrollModel.employee.create({
        Employee_Number: totalEmployee + 1,
        First_Name: toString(First_Name),
        Last_Name: toString(Last_Name),
        SSN: toNumber(SSN),
        idEmployee: totalEmployee + 1,
        PayRates_id: toNumber(pay_rate),
        Vacation_Days: toNumber(vacation),
      });

      const employee_hr = await hrModel.Personal.create({
        Employee_ID: totalEmployee + 1,
        City: toString(City),
        State: toString('active'),
        Shareholder_Status: Boolean(Shareholder_Status),
        Gender: Boolean(Gender),
        First_Name,
        Last_Name,
      });

      await hrModel.Employment.create({
        Employee_ID,
        Employment_Status: 'active',
      });

      await hrModel.Job_History.create({
        Employee_ID,
        Department,
      });

      return res.status(200).json({
        message: 'Success',
        data: {
          ...employee_payroll.toJSON(),
          ...employee_hr.toJSON(),
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Sever Internal Error',
      });
    }
  }
}

export default new AppController();
