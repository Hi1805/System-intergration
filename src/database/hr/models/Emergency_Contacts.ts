import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Personal, PersonalId } from './Personal';

export interface Emergency_ContactsAttributes {
  Employee_ID: number;
  Emergency_Contact_Name?: string;
  Phone_Number?: string;
  Relationship?: string;
}

export type Emergency_ContactsPk = "Employee_ID";
export type Emergency_ContactsId = Emergency_Contacts[Emergency_ContactsPk];
export type Emergency_ContactsOptionalAttributes = "Emergency_Contact_Name" | "Phone_Number" | "Relationship";
export type Emergency_ContactsCreationAttributes = Optional<Emergency_ContactsAttributes, Emergency_ContactsOptionalAttributes>;

export class Emergency_Contacts extends Model<Emergency_ContactsAttributes, Emergency_ContactsCreationAttributes> implements Emergency_ContactsAttributes {
  Employee_ID!: number;
  Emergency_Contact_Name?: string;
  Phone_Number?: string;
  Relationship?: string;

  // Emergency_Contacts belongsTo Personal via Employee_ID
  Employee!: Personal;
  getEmployee!: Sequelize.BelongsToGetAssociationMixin<Personal>;
  setEmployee!: Sequelize.BelongsToSetAssociationMixin<Personal, PersonalId>;
  createEmployee!: Sequelize.BelongsToCreateAssociationMixin<Personal>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Emergency_Contacts {
    return Emergency_Contacts.init({
    Employee_ID: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Personal',
        key: 'Employee_ID'
      }
    },
    Emergency_Contact_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Phone_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Relationship: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Emergency_Contacts',
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
        name: "PK_dbo.Emergency_Contacts",
        unique: true,
        fields: [
          { name: "Employee_ID" },
        ]
      },
    ]
  });
  }
}
