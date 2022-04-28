import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { levels, levelsId } from './levels';
import type { profiles, profilesId } from './profiles';
import type { reviews, reviewsId } from './reviews';

export interface usersAttributes {
  user_id: number;
  uid: string;
  status?: number;
  level: number;
  username: string;
  is_reported: number;
  is_locked: number;
  role: number;
  is_otp: number;
  password: string;
  email?: string;
  updated_at: Date;
  created_at: Date;
  uid_gg?: string;
  uid_fb?: string;
}

export type usersPk = 'user_id' | 'uid';
export type usersId = users[usersPk];
export type usersOptionalAttributes =
  | 'user_id'
  | 'status'
  | 'email'
  | 'updated_at'
  | 'created_at'
  | 'uid_gg'
  | 'uid_fb';
export type usersCreationAttributes = Optional<
  usersAttributes,
  usersOptionalAttributes
>;

export class users
  extends Model<usersAttributes, usersCreationAttributes>
  implements usersAttributes
{
  user_id!: number;
  uid!: string;
  status?: number;
  level!: number;
  username!: string;
  is_reported!: number;
  is_locked!: number;
  role!: number;
  is_otp!: number;
  password!: string;
  email?: string;
  updated_at!: Date;
  created_at!: Date;
  uid_gg?: string;
  uid_fb?: string;

  // users belongsTo levels via level
  level_level!: levels;
  getLevel_level!: Sequelize.BelongsToGetAssociationMixin<levels>;
  setLevel_level!: Sequelize.BelongsToSetAssociationMixin<levels, levelsId>;
  createLevel_level!: Sequelize.BelongsToCreateAssociationMixin<levels>;
  // users hasMany profiles via user_id
  profiles!: profiles[];
  getProfiles!: Sequelize.HasManyGetAssociationsMixin<profiles>;
  setProfiles!: Sequelize.HasManySetAssociationsMixin<profiles, profilesId>;
  addProfile!: Sequelize.HasManyAddAssociationMixin<profiles, profilesId>;
  addProfiles!: Sequelize.HasManyAddAssociationsMixin<profiles, profilesId>;
  createProfile!: Sequelize.HasManyCreateAssociationMixin<profiles>;
  removeProfile!: Sequelize.HasManyRemoveAssociationMixin<profiles, profilesId>;
  removeProfiles!: Sequelize.HasManyRemoveAssociationsMixin<
    profiles,
    profilesId
  >;
  hasProfile!: Sequelize.HasManyHasAssociationMixin<profiles, profilesId>;
  hasProfiles!: Sequelize.HasManyHasAssociationsMixin<profiles, profilesId>;
  countProfiles!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany reviews via uid_review
  reviews!: reviews[];
  getReviews!: Sequelize.HasManyGetAssociationsMixin<reviews>;
  setReviews!: Sequelize.HasManySetAssociationsMixin<reviews, reviewsId>;
  addReview!: Sequelize.HasManyAddAssociationMixin<reviews, reviewsId>;
  addReviews!: Sequelize.HasManyAddAssociationsMixin<reviews, reviewsId>;
  createReview!: Sequelize.HasManyCreateAssociationMixin<reviews>;
  removeReview!: Sequelize.HasManyRemoveAssociationMixin<reviews, reviewsId>;
  removeReviews!: Sequelize.HasManyRemoveAssociationsMixin<reviews, reviewsId>;
  hasReview!: Sequelize.HasManyHasAssociationMixin<reviews, reviewsId>;
  hasReviews!: Sequelize.HasManyHasAssociationsMixin<reviews, reviewsId>;
  countReviews!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init(
      {
        user_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        uid: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        level: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'levels',
            key: 'level',
          },
        },
        username: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        is_reported: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        is_locked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        is_otp: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(200),
          allowNull: true,
          unique: 'email_UNIQUE',
        },
        uid_gg: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        uid_fb: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }, { name: 'uid' }],
          },
          {
            name: 'uid',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'uid' }],
          },
          {
            name: 'user_id',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
          {
            name: 'email_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'email' }],
          },
          {
            name: 'uid_fb_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'uid_fb' }],
          },
          {
            name: 'uid_gg_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'uid_gg' }],
          },
          {
            name: 'users_levels',
            using: 'BTREE',
            fields: [{ name: 'level' }],
          },
        ],
      }
    );
  }
}
