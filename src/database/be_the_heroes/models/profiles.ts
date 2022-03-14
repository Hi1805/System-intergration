import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface profilesAttributes {
  uid: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  date_of_birth?: string;
  phone?: string;
  status?: 'private' | 'public';
  avatar?: string;
  cover_image?: string;
  users_user_id?: number;
  users_uid?: string;
}

export type profilesPk = "uid";
export type profilesId = profiles[profilesPk];
export type profilesOptionalAttributes = "middle_name" | "date_of_birth" | "phone" | "status" | "avatar" | "cover_image" | "users_user_id" | "users_uid";
export type profilesCreationAttributes = Optional<profilesAttributes, profilesOptionalAttributes>;

export class profiles extends Model<profilesAttributes, profilesCreationAttributes> implements profilesAttributes {
  uid!: string;
  first_name!: string;
  last_name!: string;
  middle_name?: string;
  date_of_birth?: string;
  phone?: string;
  status?: 'private' | 'public';
  avatar?: string;
  cover_image?: string;
  users_user_id?: number;
  users_uid?: string;

  // profiles belongsTo users via uid
  uid_user!: users;
  getUid_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUid_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUid_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof profiles {
    return profiles.init({
    uid: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'uid'
      }
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    middle_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('private','public'),
      allowNull: true,
      defaultValue: "public"
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cover_image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    users_user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    users_uid: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'profiles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
  }
}
