import dotenv from 'dotenv';
dotenv.config();
export const mySQLConfig = {
  host: process.env.DB_PAYROLL_HOST,
  user: process.env.DB_PAYROLL_USER,
  password: process.env.DB_PAYROLL_PASSWORD,
  database: 'payroll',
  port: process.env.DB_PAYROLL_PORT || 3306,
};
