import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat_groups, chat_groupsId } from './chat_groups';
import type { chat_messages, chat_messagesId } from './chat_messages';
import type { comments, commentsId } from './comments';
import type {
  config_chat_group,
  config_chat_groupId,
} from './config_chat_group';
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
  bio?: string;
  city?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

export type profilesPk = 'user_id' | 'uid';
export type profilesId = profiles[profilesPk];
export type profilesOptionalAttributes =
  | 'middle_name'
  | 'date_of_birth'
  | 'phone'
  | 'status'
  | 'avatar'
  | 'cover_image'
  | 'bio'
  | 'city'
  | 'address'
  | 'created_at'
  | 'updated_at';
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
  bio?: string;
  city?: string;
  address?: string;
  created_at!: Date;
  updated_at!: Date;

  // profiles hasMany chat_groups via member_uid
  chat_groups!: chat_groups[];
  getChat_groups!: Sequelize.HasManyGetAssociationsMixin<chat_groups>;
  setChat_groups!: Sequelize.HasManySetAssociationsMixin<
    chat_groups,
    chat_groupsId
  >;
  addChat_group!: Sequelize.HasManyAddAssociationMixin<
    chat_groups,
    chat_groupsId
  >;
  addChat_groups!: Sequelize.HasManyAddAssociationsMixin<
    chat_groups,
    chat_groupsId
  >;
  createChat_group!: Sequelize.HasManyCreateAssociationMixin<chat_groups>;
  removeChat_group!: Sequelize.HasManyRemoveAssociationMixin<
    chat_groups,
    chat_groupsId
  >;
  removeChat_groups!: Sequelize.HasManyRemoveAssociationsMixin<
    chat_groups,
    chat_groupsId
  >;
  hasChat_group!: Sequelize.HasManyHasAssociationMixin<
    chat_groups,
    chat_groupsId
  >;
  hasChat_groups!: Sequelize.HasManyHasAssociationsMixin<
    chat_groups,
    chat_groupsId
  >;
  countChat_groups!: Sequelize.HasManyCountAssociationsMixin;
  // profiles hasMany chat_messages via uid
  chat_messages!: chat_messages[];
  getChat_messages!: Sequelize.HasManyGetAssociationsMixin<chat_messages>;
  setChat_messages!: Sequelize.HasManySetAssociationsMixin<
    chat_messages,
    chat_messagesId
  >;
  addChat_message!: Sequelize.HasManyAddAssociationMixin<
    chat_messages,
    chat_messagesId
  >;
  addChat_messages!: Sequelize.HasManyAddAssociationsMixin<
    chat_messages,
    chat_messagesId
  >;
  createChat_message!: Sequelize.HasManyCreateAssociationMixin<chat_messages>;
  removeChat_message!: Sequelize.HasManyRemoveAssociationMixin<
    chat_messages,
    chat_messagesId
  >;
  removeChat_messages!: Sequelize.HasManyRemoveAssociationsMixin<
    chat_messages,
    chat_messagesId
  >;
  hasChat_message!: Sequelize.HasManyHasAssociationMixin<
    chat_messages,
    chat_messagesId
  >;
  hasChat_messages!: Sequelize.HasManyHasAssociationsMixin<
    chat_messages,
    chat_messagesId
  >;
  countChat_messages!: Sequelize.HasManyCountAssociationsMixin;
  // profiles hasMany comments via uid
  comments!: comments[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<comments>;
  setComments!: Sequelize.HasManySetAssociationsMixin<comments, commentsId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<comments, commentsId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<comments, commentsId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<comments>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<comments, commentsId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<
    comments,
    commentsId
  >;
  hasComment!: Sequelize.HasManyHasAssociationMixin<comments, commentsId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<comments, commentsId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // profiles belongsToMany config_chat_group via uid and to_group
  to_group_config_chat_groups!: config_chat_group[];
  getTo_group_config_chat_groups!: Sequelize.BelongsToManyGetAssociationsMixin<config_chat_group>;
  setTo_group_config_chat_groups!: Sequelize.BelongsToManySetAssociationsMixin<
    config_chat_group,
    config_chat_groupId
  >;
  addTo_group_config_chat_group!: Sequelize.BelongsToManyAddAssociationMixin<
    config_chat_group,
    config_chat_groupId
  >;
  addTo_group_config_chat_groups!: Sequelize.BelongsToManyAddAssociationsMixin<
    config_chat_group,
    config_chat_groupId
  >;
  createTo_group_config_chat_group!: Sequelize.BelongsToManyCreateAssociationMixin<config_chat_group>;
  removeTo_group_config_chat_group!: Sequelize.BelongsToManyRemoveAssociationMixin<
    config_chat_group,
    config_chat_groupId
  >;
  removeTo_group_config_chat_groups!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    config_chat_group,
    config_chat_groupId
  >;
  hasTo_group_config_chat_group!: Sequelize.BelongsToManyHasAssociationMixin<
    config_chat_group,
    config_chat_groupId
  >;
  hasTo_group_config_chat_groups!: Sequelize.BelongsToManyHasAssociationsMixin<
    config_chat_group,
    config_chat_groupId
  >;
  countTo_group_config_chat_groups!: Sequelize.BelongsToManyCountAssociationsMixin;
  // profiles belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof profiles {
    return profiles.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'users',
            key: 'user_id',
          },
        },
        uid: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
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
        bio: {
          type: DataTypes.STRING(1000),
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(100),
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
        tableName: 'profiles',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }, { name: 'uid' }],
          },
          {
            name: 'user_id_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
          {
            name: 'uid_UNIQUE',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'uid' }],
          },
          {
            name: 'uid_idx',
            using: 'BTREE',
            fields: [{ name: 'uid' }],
          },
        ],
      }
    );
  }
}
