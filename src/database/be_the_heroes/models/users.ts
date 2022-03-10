import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { levels, levelsId } from './levels';
import type { posts, postsId } from './posts';

export interface usersAttributes {
  user_id: number;
  uid: string;
  level: number;
  username: string;
  first_name?: string;
  last_name?: string;
  is_reported: number;
  is_locked: number;
  role: number;
  is_otp: number;
  password: string;
  email: string;
  uid_gg: string;
  status: number;
  updated_at: Date;
  created_at: Date;
}

export type usersPk = 'user_id' | 'uid';
export type usersId = users[usersPk];
export type usersOptionalAttributes =
  | 'user_id'
  | 'uid'
  | 'first_name'
  | 'last_name'
  | 'updated_at'
  | 'created_at';
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
  level!: number;
  username!: string;
  first_name?: string;
  last_name?: string;
  is_reported!: number;
  is_locked!: number;
  role!: number;
  is_otp!: number;
  password!: string;
  email!: string;
  uid_gg!: string;
  status!: number;
  updated_at!: Date;
  created_at!: Date;

  // users belongsTo levels via level
  level_level!: levels;
  getLevel_level!: Sequelize.BelongsToGetAssociationMixin<levels>;
  setLevel_level!: Sequelize.BelongsToSetAssociationMixin<levels, levelsId>;
  createLevel_level!: Sequelize.BelongsToCreateAssociationMixin<levels>;
  // users hasMany posts via user_id
  posts!: posts[];
  getPosts!: Sequelize.HasManyGetAssociationsMixin<posts>;
  setPosts!: Sequelize.HasManySetAssociationsMixin<posts, postsId>;
  addPost!: Sequelize.HasManyAddAssociationMixin<posts, postsId>;
  addPosts!: Sequelize.HasManyAddAssociationsMixin<posts, postsId>;
  createPost!: Sequelize.HasManyCreateAssociationMixin<posts>;
  removePost!: Sequelize.HasManyRemoveAssociationMixin<posts, postsId>;
  removePosts!: Sequelize.HasManyRemoveAssociationsMixin<posts, postsId>;
  hasPost!: Sequelize.HasManyHasAssociationMixin<posts, postsId>;
  hasPosts!: Sequelize.HasManyHasAssociationsMixin<posts, postsId>;
  countPosts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    users.init(
      {
        user_id: {
          autoIncrement: true,
          type: DataTypes.BIGINT,
          allowNull: false,
          primaryKey: true,
        },
        uid: {
          type: DataTypes.STRING(30),
          allowNull: false,
          primaryKey: true,
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
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        last_name: {
          type: DataTypes.STRING(45),
          allowNull: true,
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
          allowNull: false,
          unique: 'email_UNIQUE',
        },
        uid_gg: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
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
            name: 'users_levels',
            using: 'BTREE',
            fields: [{ name: 'level' }],
          },
        ],
      }
    );
    return users;
  }
}
