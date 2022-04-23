import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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

  static initModel(sequelize: Sequelize.Sequelize): typeof kyc_org {
    return kyc_org.init(
      {
        org_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
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
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'kyc_org',
        timestamps: false,
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
