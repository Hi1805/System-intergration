import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { reasons_kyc, reasons_kycId } from './reasons_kyc';

export interface kyc_personalAttributes {
  uid: string;
  passport: 'identity_card' | 'driver_license';
  date_of_birth: Date;
  user_photo: string;
  document_photo: string;
  first_name: string;
  last_name: string;
  residental_address: string;
  user_ip?: string;
  province: string;
  district: string;
  ward: string;
  status: 'pending' | 'failed' | 'verified';
  reason_id: number;
  kyc_id: number;
  midle_name: string;
  reasons_kyc_reason_id: number;
}

export type kyc_personalPk = "uid" | "kyc_id";
export type kyc_personalId = kyc_personal[kyc_personalPk];
export type kyc_personalOptionalAttributes = "user_ip" | "kyc_id";
export type kyc_personalCreationAttributes = Optional<kyc_personalAttributes, kyc_personalOptionalAttributes>;

export class kyc_personal extends Model<kyc_personalAttributes, kyc_personalCreationAttributes> implements kyc_personalAttributes {
  uid!: string;
  passport!: 'identity_card' | 'driver_license';
  date_of_birth!: Date;
  user_photo!: string;
  document_photo!: string;
  first_name!: string;
  last_name!: string;
  residental_address!: string;
  user_ip?: string;
  province!: string;
  district!: string;
  ward!: string;
  status!: 'pending' | 'failed' | 'verified';
  reason_id!: number;
  kyc_id!: number;
  midle_name!: string;
  reasons_kyc_reason_id!: number;

  // kyc_personal belongsTo reasons_kyc via reason_id
  reason!: reasons_kyc;
  getReason!: Sequelize.BelongsToGetAssociationMixin<reasons_kyc>;
  setReason!: Sequelize.BelongsToSetAssociationMixin<reasons_kyc, reasons_kycId>;
  createReason!: Sequelize.BelongsToCreateAssociationMixin<reasons_kyc>;

  static initModel(sequelize: Sequelize.Sequelize): typeof kyc_personal {
    return kyc_personal.init({
    uid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    passport: {
      type: DataTypes.ENUM('identity_card','driver_license'),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_photo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    document_photo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    residental_address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_ip: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    district: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ward: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending','failed','verified'),
      allowNull: false
    },
    reason_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'reasons_kyc',
        key: 'reason_id'
      }
    },
    kyc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    midle_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    reasons_kyc_reason_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'kyc_personal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "kyc_id" },
          { name: "uid" },
        ]
      },
      {
        name: "kyc_personal_reasons_kyc",
        using: "BTREE",
        fields: [
          { name: "reason_id" },
        ]
      },
      {
        name: "kyc_personal_users",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
  }
}
