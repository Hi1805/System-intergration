import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface report_usersAttributes {
  report_id: number;
  uid_report: string;
  notes?: string;
  user_id: number;
  reason_id: number;
  org_id: number;
}

export type report_usersPk = "report_id" | "uid_report" | "user_id";
export type report_usersId = report_users[report_usersPk];
export type report_usersOptionalAttributes = "report_id" | "notes";
export type report_usersCreationAttributes = Optional<report_usersAttributes, report_usersOptionalAttributes>;

export class report_users extends Model<report_usersAttributes, report_usersCreationAttributes> implements report_usersAttributes {
  report_id!: number;
  uid_report!: string;
  notes?: string;
  user_id!: number;
  reason_id!: number;
  org_id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof report_users {
    return report_users.init({
    report_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid_report: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    notes: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reason_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    org_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'report_users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "report_id" },
          { name: "uid_report" },
          { name: "user_id" },
        ]
      },
      {
        name: "org_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "org_id" },
          { name: "uid_report" },
        ]
      },
      {
        name: "report_users",
        using: "BTREE",
        fields: [
          { name: "uid_report" },
        ]
      },
      {
        name: "report_users_reasons_report",
        using: "BTREE",
        fields: [
          { name: "reason_id" },
        ]
      },
      {
        name: "report_users_users",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
