import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { kyc_org, kyc_orgId } from './kyc_org';
import type { kyc_personal, kyc_personalId } from './kyc_personal';

export interface reasons_kycAttributes {
  reason_id: number;
  description: string;
}

export type reasons_kycPk = "reason_id";
export type reasons_kycId = reasons_kyc[reasons_kycPk];
export type reasons_kycOptionalAttributes = "reason_id";
export type reasons_kycCreationAttributes = Optional<reasons_kycAttributes, reasons_kycOptionalAttributes>;

export class reasons_kyc extends Model<reasons_kycAttributes, reasons_kycCreationAttributes> implements reasons_kycAttributes {
  reason_id!: number;
  description!: string;

  // reasons_kyc hasMany kyc_org via reason_id
  kyc_orgs!: kyc_org[];
  getKyc_orgs!: Sequelize.HasManyGetAssociationsMixin<kyc_org>;
  setKyc_orgs!: Sequelize.HasManySetAssociationsMixin<kyc_org, kyc_orgId>;
  addKyc_org!: Sequelize.HasManyAddAssociationMixin<kyc_org, kyc_orgId>;
  addKyc_orgs!: Sequelize.HasManyAddAssociationsMixin<kyc_org, kyc_orgId>;
  createKyc_org!: Sequelize.HasManyCreateAssociationMixin<kyc_org>;
  removeKyc_org!: Sequelize.HasManyRemoveAssociationMixin<kyc_org, kyc_orgId>;
  removeKyc_orgs!: Sequelize.HasManyRemoveAssociationsMixin<kyc_org, kyc_orgId>;
  hasKyc_org!: Sequelize.HasManyHasAssociationMixin<kyc_org, kyc_orgId>;
  hasKyc_orgs!: Sequelize.HasManyHasAssociationsMixin<kyc_org, kyc_orgId>;
  countKyc_orgs!: Sequelize.HasManyCountAssociationsMixin;
  // reasons_kyc hasMany kyc_personal via reason_id
  kyc_personals!: kyc_personal[];
  getKyc_personals!: Sequelize.HasManyGetAssociationsMixin<kyc_personal>;
  setKyc_personals!: Sequelize.HasManySetAssociationsMixin<kyc_personal, kyc_personalId>;
  addKyc_personal!: Sequelize.HasManyAddAssociationMixin<kyc_personal, kyc_personalId>;
  addKyc_personals!: Sequelize.HasManyAddAssociationsMixin<kyc_personal, kyc_personalId>;
  createKyc_personal!: Sequelize.HasManyCreateAssociationMixin<kyc_personal>;
  removeKyc_personal!: Sequelize.HasManyRemoveAssociationMixin<kyc_personal, kyc_personalId>;
  removeKyc_personals!: Sequelize.HasManyRemoveAssociationsMixin<kyc_personal, kyc_personalId>;
  hasKyc_personal!: Sequelize.HasManyHasAssociationMixin<kyc_personal, kyc_personalId>;
  hasKyc_personals!: Sequelize.HasManyHasAssociationsMixin<kyc_personal, kyc_personalId>;
  countKyc_personals!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof reasons_kyc {
    return reasons_kyc.init({
    reason_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
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
