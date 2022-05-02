import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Benefit_Plans, Benefit_PlansId } from './Benefit_Plans';
import type { Emergency_Contacts, Emergency_ContactsCreationAttributes, Emergency_ContactsId } from './Emergency_Contacts';
import type { Employment, EmploymentCreationAttributes, EmploymentId } from './Employment';
import type { Job_History, Job_HistoryId } from './Job_History';

export interface PersonalAttributes {
  Employee_ID: number;
  First_Name?: string;
  Last_Name?: string;
  Middle_Initial?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  Zip?: number;
  Email?: string;
  Phone_Number?: string;
  Social_Security_Number?: string;
  Drivers_License?: string;
  Marital_Status?: string;
  Gender?: boolean;
  Shareholder_Status: boolean;
  Benefit_Plans?: number;
  Ethnicity?: string;
}

export type PersonalPk = "Employee_ID";
export type PersonalId = Personal[PersonalPk];
export type PersonalOptionalAttributes = "First_Name" | "Last_Name" | "Middle_Initial" | "Address1" | "Address2" | "City" | "State" | "Zip" | "Email" | "Phone_Number" | "Social_Security_Number" | "Drivers_License" | "Marital_Status" | "Gender" | "Benefit_Plans" | "Ethnicity";
export type PersonalCreationAttributes = Optional<PersonalAttributes, PersonalOptionalAttributes>;

export class Personal extends Model<PersonalAttributes, PersonalCreationAttributes> implements PersonalAttributes {
  Employee_ID!: number;
  First_Name?: string;
  Last_Name?: string;
  Middle_Initial?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  Zip?: number;
  Email?: string;
  Phone_Number?: string;
  Social_Security_Number?: string;
  Drivers_License?: string;
  Marital_Status?: string;
  Gender?: boolean;
  Shareholder_Status!: boolean;
  Benefit_Plans?: number;
  Ethnicity?: string;

  // Personal belongsTo Benefit_Plans via Benefit_Plans
  Benefit_Plans_Benefit_Plan!: Benefit_Plans;
  getBenefit_Plans_Benefit_Plan!: Sequelize.BelongsToGetAssociationMixin<Benefit_Plans>;
  setBenefit_Plans_Benefit_Plan!: Sequelize.BelongsToSetAssociationMixin<Benefit_Plans, Benefit_PlansId>;
  createBenefit_Plans_Benefit_Plan!: Sequelize.BelongsToCreateAssociationMixin<Benefit_Plans>;
  // Personal hasOne Emergency_Contacts via Employee_ID
  Emergency_Contact!: Emergency_Contacts;
  getEmergency_Contact!: Sequelize.HasOneGetAssociationMixin<Emergency_Contacts>;
  setEmergency_Contact!: Sequelize.HasOneSetAssociationMixin<Emergency_Contacts, Emergency_ContactsId>;
  createEmergency_Contact!: Sequelize.HasOneCreateAssociationMixin<Emergency_Contacts>;
  // Personal hasOne Employment via Employee_ID
  Employment!: Employment;
  getEmployment!: Sequelize.HasOneGetAssociationMixin<Employment>;
  setEmployment!: Sequelize.HasOneSetAssociationMixin<Employment, EmploymentId>;
  createEmployment!: Sequelize.HasOneCreateAssociationMixin<Employment>;
  // Personal hasMany Job_History via Employee_ID
  Job_Histories!: Job_History[];
  getJob_Histories!: Sequelize.HasManyGetAssociationsMixin<Job_History>;
  setJob_Histories!: Sequelize.HasManySetAssociationsMixin<Job_History, Job_HistoryId>;
  addJob_History!: Sequelize.HasManyAddAssociationMixin<Job_History, Job_HistoryId>;
  addJob_Histories!: Sequelize.HasManyAddAssociationsMixin<Job_History, Job_HistoryId>;
  createJob_History!: Sequelize.HasManyCreateAssociationMixin<Job_History>;
  removeJob_History!: Sequelize.HasManyRemoveAssociationMixin<Job_History, Job_HistoryId>;
  removeJob_Histories!: Sequelize.HasManyRemoveAssociationsMixin<Job_History, Job_HistoryId>;
  hasJob_History!: Sequelize.HasManyHasAssociationMixin<Job_History, Job_HistoryId>;
  hasJob_Histories!: Sequelize.HasManyHasAssociationsMixin<Job_History, Job_HistoryId>;
  countJob_Histories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Personal {
    return Personal.init({
    Employee_ID: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true
    },
    First_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Last_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Middle_Initial: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Address1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Address2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    State: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Zip: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Phone_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Social_Security_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Drivers_License: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Marital_Status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Gender: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Shareholder_Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Benefit_Plans: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true,
      references: {
        model: 'Benefit_Plans',
        key: 'Benefit_Plan_ID'
      }
    },
    Ethnicity: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Personal',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_Benefit_Plans",
        fields: [
          { name: "Benefit_Plans" },
        ]
      },
      {
        name: "PK_dbo.Personal",
        unique: true,
        fields: [
          { name: "Employee_ID" },
        ]
      },
    ]
  });
  }
}
