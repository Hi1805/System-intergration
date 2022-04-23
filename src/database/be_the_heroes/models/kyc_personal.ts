import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface kyc_personalAttributes {
  id: number;
  uid: string;
  document_id?: string;
  user_photo: string;
  residential_address: string;
  fullname: string;
  document_photo: string;
  passport: 'identity_card' | 'driver_license';
  date_of_birth: string;
  reason_id?: number;
  status: 'pending' | 'failed' | 'verified';
  province: string;
  user_ip?: string;
}

export type kyc_personalPk = "id";
export type kyc_personalId = kyc_personal[kyc_personalPk];
export type kyc_personalOptionalAttributes = "document_id" | "passport" | "reason_id" | "user_ip";
export type kyc_personalCreationAttributes = Optional<kyc_personalAttributes, kyc_personalOptionalAttributes>;

export class kyc_personal extends Model<kyc_personalAttributes, kyc_personalCreationAttributes> implements kyc_personalAttributes {
  id!: number;
  uid!: string;
  document_id?: string;
  user_photo!: string;
  residential_address!: string;
  fullname!: string;
  document_photo!: string;
  passport!: 'identity_card' | 'driver_license';
  date_of_birth!: string;
  reason_id?: number;
  status!: 'pending' | 'failed' | 'verified';
  province!: string;
  user_ip?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof kyc_personal {
    return kyc_personal.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    document_id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    user_photo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    residential_address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    document_photo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    passport: {
      type: DataTypes.ENUM('identity_card','driver_license'),
      allowNull: false,
      defaultValue: "identity_card"
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    reason_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending','failed','verified'),
      allowNull: false
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_ip: {
      type: DataTypes.STRING(45),
      allowNull: true
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
          { name: "id" },
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
