import type { Sequelize } from "sequelize";
import { Benefit_Plans as _Benefit_Plans } from "./Benefit_Plans";
import type { Benefit_PlansAttributes, Benefit_PlansCreationAttributes } from "./Benefit_Plans";
import { Emergency_Contacts as _Emergency_Contacts } from "./Emergency_Contacts";
import type { Emergency_ContactsAttributes, Emergency_ContactsCreationAttributes } from "./Emergency_Contacts";
import { Employment as _Employment } from "./Employment";
import type { EmploymentAttributes, EmploymentCreationAttributes } from "./Employment";
import { Job_History as _Job_History } from "./Job_History";
import type { Job_HistoryAttributes, Job_HistoryCreationAttributes } from "./Job_History";
import { Personal as _Personal } from "./Personal";
import type { PersonalAttributes, PersonalCreationAttributes } from "./Personal";
import { __MigrationHistory as ___MigrationHistory } from "./__MigrationHistory";
import type { __MigrationHistoryAttributes, __MigrationHistoryCreationAttributes } from "./__MigrationHistory";

export {
  _Benefit_Plans as Benefit_Plans,
  _Emergency_Contacts as Emergency_Contacts,
  _Employment as Employment,
  _Job_History as Job_History,
  _Personal as Personal,
  ___MigrationHistory as __MigrationHistory,
};

export type {
  Benefit_PlansAttributes,
  Benefit_PlansCreationAttributes,
  Emergency_ContactsAttributes,
  Emergency_ContactsCreationAttributes,
  EmploymentAttributes,
  EmploymentCreationAttributes,
  Job_HistoryAttributes,
  Job_HistoryCreationAttributes,
  PersonalAttributes,
  PersonalCreationAttributes,
  __MigrationHistoryAttributes,
  __MigrationHistoryCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Benefit_Plans = _Benefit_Plans.initModel(sequelize);
  const Emergency_Contacts = _Emergency_Contacts.initModel(sequelize);
  const Employment = _Employment.initModel(sequelize);
  const Job_History = _Job_History.initModel(sequelize);
  const Personal = _Personal.initModel(sequelize);
  const __MigrationHistory = ___MigrationHistory.initModel(sequelize);

  Personal.belongsTo(Benefit_Plans, { as: "Benefit_Plans_Benefit_Plan", foreignKey: "Benefit_Plans"});
  Benefit_Plans.hasMany(Personal, { as: "Personals", foreignKey: "Benefit_Plans"});
  Emergency_Contacts.belongsTo(Personal, { as: "Employee", foreignKey: "Employee_ID"});
  Personal.hasOne(Emergency_Contacts, { as: "Emergency_Contact", foreignKey: "Employee_ID"});
  Employment.belongsTo(Personal, { as: "Employee", foreignKey: "Employee_ID"});
  Personal.hasOne(Employment, { as: "Employment", foreignKey: "Employee_ID"});
  Job_History.belongsTo(Personal, { as: "Employee", foreignKey: "Employee_ID"});
  Personal.hasMany(Job_History, { as: "Job_Histories", foreignKey: "Employee_ID"});

  return {
    Benefit_Plans: Benefit_Plans,
    Emergency_Contacts: Emergency_Contacts,
    Employment: Employment,
    Job_History: Job_History,
    Personal: Personal,
    __MigrationHistory: __MigrationHistory,
  };
}
