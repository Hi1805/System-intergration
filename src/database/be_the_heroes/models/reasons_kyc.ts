import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface reasons_kycAttributes {
  reason_id: number;
  description: string;
}

export type reasons_kycPk = "reason_id";
export type reasons_kycId = reasons_kyc[reasons_kycPk];
export type reasons_kycCreationAttributes = reasons_kycAttributes;

export class reasons_kyc extends Model<reasons_kycAttributes, reasons_kycCreationAttributes> implements reasons_kycAttributes {
  reason_id!: number;
  description!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof reasons_kyc {
    return reasons_kyc.init({
    reason_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reasons_kyc',
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
