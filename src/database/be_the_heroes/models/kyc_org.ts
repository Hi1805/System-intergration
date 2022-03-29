import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { organizations, organizationsId } from './organizations';
import type { reasons_kyc, reasons_kycId } from './reasons_kyc';

export interface kyc_orgAttributes {
  org_id: number;
  document_photo: string;
  created_at: Date;
  update_at: Date;
  reason_id: number;
}

export type kyc_orgPk = 'org_id';
export type kyc_orgId = kyc_org[kyc_orgPk];
export type kyc_orgOptionalAttributes = 'created_at';
export type kyc_orgCreationAttributes = Optional<
  kyc_orgAttributes,
  kyc_orgOptionalAttributes
>;

export class kyc_org
  extends Model<kyc_orgAttributes, kyc_orgCreationAttributes>
  implements kyc_orgAttributes
{
  org_id!: number;
  document_photo!: string;
  created_at!: Date;
  update_at!: Date;
  reason_id!: number;

  // kyc_org belongsTo organizations via org_id
  org!: organizations;
  getOrg!: Sequelize.BelongsToGetAssociationMixin<organizations>;
  setOrg!: Sequelize.BelongsToSetAssociationMixin<
    organizations,
    organizationsId
  >;
  createOrg!: Sequelize.BelongsToCreateAssociationMixin<organizations>;
  // kyc_org belongsTo reasons_kyc via reason_id
  reason!: reasons_kyc;
  getReason!: Sequelize.BelongsToGetAssociationMixin<reasons_kyc>;
  setReason!: Sequelize.BelongsToSetAssociationMixin<
    reasons_kyc,
    reasons_kycId
  >;
  createReason!: Sequelize.BelongsToCreateAssociationMixin<reasons_kyc>;

  static initModel(sequelize: Sequelize.Sequelize): typeof kyc_org {
    return kyc_org.init(
      {
        org_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'organizations',
            key: 'org_id',
          },
        },
        document_photo: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        update_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        reason_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'reasons_kyc',
            key: 'reason_id',
          },
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'kyc_org',
        timestamps: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'org_id' }],
          },
          {
            name: 'kyc_org_reasons_kyc',
            using: 'BTREE',
            fields: [{ name: 'reason_id' }],
          },
        ],
      }
    );
  }
}
