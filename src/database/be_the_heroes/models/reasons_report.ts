import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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


  static initModel(sequelize: Sequelize.Sequelize): typeof reasons_report {
    return reasons_report.init({
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    reason_id: {
      type: DataTypes.INTEGER,
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
