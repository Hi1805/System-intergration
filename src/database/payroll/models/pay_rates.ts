import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { employee, employeeId } from './employee';

export interface pay_ratesAttributes {
  idPay_Rates: number;
  Pay_Rate_Name: string;
  Value: number;
  Tax_Percentage: number;
  Pay_Type: number;
  Pay_Amount: number;
  PT_Level_C: number;
}

export type pay_ratesPk = "idPay_Rates";
export type pay_ratesId = pay_rates[pay_ratesPk];
export type pay_ratesCreationAttributes = pay_ratesAttributes;

export class pay_rates extends Model<pay_ratesAttributes, pay_ratesCreationAttributes> implements pay_ratesAttributes {
  idPay_Rates!: number;
  Pay_Rate_Name!: string;
  Value!: number;
  Tax_Percentage!: number;
  Pay_Type!: number;
  Pay_Amount!: number;
  PT_Level_C!: number;

  // pay_rates hasMany employee via PayRates_id
  employees!: employee[];
  getEmployees!: Sequelize.HasManyGetAssociationsMixin<employee>;
  setEmployees!: Sequelize.HasManySetAssociationsMixin<employee, employeeId>;
  addEmployee!: Sequelize.HasManyAddAssociationMixin<employee, employeeId>;
  addEmployees!: Sequelize.HasManyAddAssociationsMixin<employee, employeeId>;
  createEmployee!: Sequelize.HasManyCreateAssociationMixin<employee>;
  removeEmployee!: Sequelize.HasManyRemoveAssociationMixin<employee, employeeId>;
  removeEmployees!: Sequelize.HasManyRemoveAssociationsMixin<employee, employeeId>;
  hasEmployee!: Sequelize.HasManyHasAssociationMixin<employee, employeeId>;
  hasEmployees!: Sequelize.HasManyHasAssociationsMixin<employee, employeeId>;
  countEmployees!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof pay_rates {
    return pay_rates.init({
    idPay_Rates: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Pay_Rate_Name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Value: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    Tax_Percentage: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    Pay_Type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Pay_Amount: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    },
    PT_Level_C: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pay_rates',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPay_Rates" },
        ]
      },
    ]
  });
  }
}
