import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface profilesAttributes {
  user_id: number;
  uid: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  date_of_birth?: string;
  phone?: string;
  status?: 'private' | 'public';
  avatar?: string;
  cover_image?: string;
}

export type profilesPk = 'user_id';
export type profilesId = profiles[profilesPk];
export type profilesOptionalAttributes =
  | 'middle_name'
  | 'date_of_birth'
  | 'phone'
  | 'status'
  | 'avatar'
  | 'cover_image';
export type profilesCreationAttributes = Optional<
  profilesAttributes,
  profilesOptionalAttributes
>;

export class profiles
  extends Model<profilesAttributes, profilesCreationAttributes>
  implements profilesAttributes
{
  user_id!: number;
  uid!: string;
  first_name!: string;
  last_name!: string;
  middle_name?: string;
  date_of_birth?: string;
  phone?: string;
  status?: 'private' | 'public';
  avatar?: string;
  cover_image?: string;

  // profiles belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof profiles {
    return profiles.init(
      {
        uid: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        middle_name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        date_of_birth: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(12),
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('private', 'public'),
          allowNull: true,
          defaultValue: 'public',
        },
        avatar: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        cover_image: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'users',
            key: 'user_id',
          },
        },
      },
      {
        sequelize,
        tableName: 'profiles',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
        ],
      }
    );
  }
}
