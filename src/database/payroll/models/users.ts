import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { employee, employeeId } from './employee';

export interface usersAttributes {
  User_ID: number;
  User_Name: string;
  Password: string;
  Email: string;
  Active: number;
}

export type usersPk = "User_ID";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "Active";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  User_ID!: number;
  User_Name!: string;
  Password!: string;
  Email!: string;
  Active!: number;

  // users belongsTo employee via User_ID
  User!: employee;
  getUser!: Sequelize.BelongsToGetAssociationMixin<employee>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<employee, employeeId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<employee>;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    User_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employee',
        key: 'Employee_Number'
      }
    },
    User_Name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_ID" },
        ]
      },
    ]
  });
  }
}
