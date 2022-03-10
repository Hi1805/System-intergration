import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { report_users, report_usersId } from './report_users';

export interface reasons_reportAttributes {
  description: string;
  reason_id: number;
}

export type reasons_reportPk = "reason_id";
export type reasons_reportId = reasons_report[reasons_reportPk];
export type reasons_reportCreationAttributes = reasons_reportAttributes;

export class reasons_report extends Model<reasons_reportAttributes, reasons_reportCreationAttributes> implements reasons_reportAttributes {
  description!: string;
  reason_id!: number;

  // reasons_report hasMany report_users via reason_id
  report_users!: report_users[];
  getReport_users!: Sequelize.HasManyGetAssociationsMixin<report_users>;
  setReport_users!: Sequelize.HasManySetAssociationsMixin<report_users, report_usersId>;
  addReport_user!: Sequelize.HasManyAddAssociationMixin<report_users, report_usersId>;
  addReport_users!: Sequelize.HasManyAddAssociationsMixin<report_users, report_usersId>;
  createReport_user!: Sequelize.HasManyCreateAssociationMixin<report_users>;
  removeReport_user!: Sequelize.HasManyRemoveAssociationMixin<report_users, report_usersId>;
  removeReport_users!: Sequelize.HasManyRemoveAssociationsMixin<report_users, report_usersId>;
  hasReport_user!: Sequelize.HasManyHasAssociationMixin<report_users, report_usersId>;
  hasReport_users!: Sequelize.HasManyHasAssociationsMixin<report_users, report_usersId>;
  countReport_users!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof reasons_report {
    return reasons_report.init({
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    reason_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'reasons_report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reason_id" },
        ]
      },
    ]
  });
  }
}
