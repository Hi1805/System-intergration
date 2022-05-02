import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pay_rates, pay_ratesId } from './pay_rates';
import type { users, usersCreationAttributes, usersId } from './users';

export interface employeeAttributes {
  Employee_Number: number;
  idEmployee: number;
  Last_Name: string;
  First_Name: string;
  SSN: number;
  Pay_Rate?: string;
  PayRates_id?: number;
  Vacation_Days?: number;
  Paid_To_Date?: number;
  Paid_Last_Year?: number;
}

export type employeePk = "Employee_Number";
export type employeeId = employee[employeePk];
export type employeeOptionalAttributes = "Pay_Rate" | "PayRates_id" | "Vacation_Days" | "Paid_To_Date" | "Paid_Last_Year";
export type employeeCreationAttributes = Optional<employeeAttributes, employeeOptionalAttributes>;

export class employee extends Model<employeeAttributes, employeeCreationAttributes> implements employeeAttributes {
  Employee_Number!: number;
  idEmployee!: number;
  Last_Name!: string;
  First_Name!: string;
  SSN!: number;
  Pay_Rate?: string;
  PayRates_id?: number;
  Vacation_Days?: number;
  Paid_To_Date?: number;
  Paid_Last_Year?: number;

  // employee hasOne users via User_ID
  user!: users;
  getUser!: Sequelize.HasOneGetAssociationMixin<users>;
  setUser!: Sequelize.HasOneSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.HasOneCreateAssociationMixin<users>;
  // employee belongsTo pay_rates via PayRates_id
  PayRate!: pay_rates;
  getPayRate!: Sequelize.BelongsToGetAssociationMixin<pay_rates>;
  setPayRate!: Sequelize.BelongsToSetAssociationMixin<pay_rates, pay_ratesId>;
  createPayRate!: Sequelize.BelongsToCreateAssociationMixin<pay_rates>;

  static initModel(sequelize: Sequelize.Sequelize): typeof employee {
    return employee.init({
    Employee_Number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idEmployee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Last_Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    First_Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    SSN: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    Pay_Rate: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    PayRates_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pay_rates',
        key: 'idPay_Rates'
      }
    },
    Vacation_Days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Paid_To_Date: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: true
    },
    Paid_Last_Year: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Employee_Number" },
        ]
      },
      {
        name: "Employee Number_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Employee_Number" },
        ]
      },
      {
        name: "PayRates_id_idx",
        using: "BTREE",
        fields: [
          { name: "PayRates_id" },
        ]
      },
    ]
  });
  }
}
