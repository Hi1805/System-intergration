import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Personal, PersonalId } from './Personal';

export interface EmploymentAttributes {
  Employee_ID: number;
  Employment_Status?: string;
  Hire_Date?: Date;
  Workers_Comp_Code?: string;
  Termination_Date?: Date;
  Rehire_Date?: Date;
  Last_Review_Date?: Date;
}

export type EmploymentPk = "Employee_ID";
export type EmploymentId = Employment[EmploymentPk];
export type EmploymentOptionalAttributes = "Employment_Status" | "Hire_Date" | "Workers_Comp_Code" | "Termination_Date" | "Rehire_Date" | "Last_Review_Date";
export type EmploymentCreationAttributes = Optional<EmploymentAttributes, EmploymentOptionalAttributes>;

export class Employment extends Model<EmploymentAttributes, EmploymentCreationAttributes> implements EmploymentAttributes {
  Employee_ID!: number;
  Employment_Status?: string;
  Hire_Date?: Date;
  Workers_Comp_Code?: string;
  Termination_Date?: Date;
  Rehire_Date?: Date;
  Last_Review_Date?: Date;

  // Employment belongsTo Personal via Employee_ID
  Employee!: Personal;
  getEmployee!: Sequelize.BelongsToGetAssociationMixin<Personal>;
  setEmployee!: Sequelize.BelongsToSetAssociationMixin<Personal, PersonalId>;
  createEmployee!: Sequelize.BelongsToCreateAssociationMixin<Personal>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Employment {
    return Employment.init({
    Employee_ID: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Personal',
        key: 'Employee_ID'
      }
    },
    Employment_Status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Hire_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Workers_Comp_Code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Termination_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Rehire_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Last_Review_Date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Employment',
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
        name: "PK_dbo.Employment",
        unique: true,
        fields: [
          { name: "Employee_ID" },
        ]
      },
    ]
  });
  }
}
