import type { Sequelize } from "sequelize";
import { employee as _employee } from "./employee";
import type { employeeAttributes, employeeCreationAttributes } from "./employee";
import { pay_rates as _pay_rates } from "./pay_rates";
import type { pay_ratesAttributes, pay_ratesCreationAttributes } from "./pay_rates";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _employee as employee,
  _pay_rates as pay_rates,
  _users as users,
};

export type {
  employeeAttributes,
  employeeCreationAttributes,
  pay_ratesAttributes,
  pay_ratesCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const employee = _employee.initModel(sequelize);
  const pay_rates = _pay_rates.initModel(sequelize);
  const users = _users.initModel(sequelize);

  users.belongsTo(employee, { as: "User", foreignKey: "User_ID"});
  employee.hasOne(users, { as: "user", foreignKey: "User_ID"});
  employee.belongsTo(pay_rates, { as: "PayRate", foreignKey: "PayRates_id"});
  pay_rates.hasMany(employee, { as: "employees", foreignKey: "PayRates_id"});

  return {
    employee: employee,
    pay_rates: pay_rates,
    users: users,
  };
}
