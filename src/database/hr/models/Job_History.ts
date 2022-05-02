import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Personal, PersonalId } from './Personal';

export interface Job_HistoryAttributes {
  ID: number;
  Employee_ID: number;
  Department?: string;
  Division?: string;
  Start_Date?: Date;
  End_Date?: Date;
  Job_Title?: string;
  Supervisor?: number;
  Job_Category?: string;
  Location?: string;
  Departmen_Code?: number;
  Salary_Type?: number;
  Pay_Period?: string;
  Hours_per_Week?: number;
  Hazardous_Training?: boolean;
}

export type Job_HistoryPk = "ID";
export type Job_HistoryId = Job_History[Job_HistoryPk];
export type Job_HistoryOptionalAttributes = "ID" | "Department" | "Division" | "Start_Date" | "End_Date" | "Job_Title" | "Supervisor" | "Job_Category" | "Location" | "Departmen_Code" | "Salary_Type" | "Pay_Period" | "Hours_per_Week" | "Hazardous_Training";
export type Job_HistoryCreationAttributes = Optional<Job_HistoryAttributes, Job_HistoryOptionalAttributes>;

export class Job_History extends Model<Job_HistoryAttributes, Job_HistoryCreationAttributes> implements Job_HistoryAttributes {
  ID!: number;
  Employee_ID!: number;
  Department?: string;
  Division?: string;
  Start_Date?: Date;
  End_Date?: Date;
  Job_Title?: string;
  Supervisor?: number;
  Job_Category?: string;
  Location?: string;
  Departmen_Code?: number;
  Salary_Type?: number;
  Pay_Period?: string;
  Hours_per_Week?: number;
  Hazardous_Training?: boolean;

  // Job_History belongsTo Personal via Employee_ID
  Employee!: Personal;
  getEmployee!: Sequelize.BelongsToGetAssociationMixin<Personal>;
  setEmployee!: Sequelize.BelongsToSetAssociationMixin<Personal, PersonalId>;
  createEmployee!: Sequelize.BelongsToCreateAssociationMixin<Personal>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Job_History {
    return Job_History.init({
    ID: {
      autoIncrement: true,
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true
    },
    Employee_ID: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      references: {
        model: 'Personal',
        key: 'Employee_ID'
      }
    },
    Department: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Division: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Start_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    End_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Job_Title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Supervisor: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    Job_Category: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Departmen_Code: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    Salary_Type: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    Pay_Period: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Hours_per_Week: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    Hazardous_Training: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Job_History',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_Employee_ID",
        fields: [
          { name: "Employee_ID" },
        ]
      },
      {
        name: "PK_dbo.Job_History",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
  }
}
