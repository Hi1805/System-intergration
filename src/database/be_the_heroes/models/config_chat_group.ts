import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat_groups, chat_groupsId } from './chat_groups';
import type { chat_messages, chat_messagesId } from './chat_messages';
import type { profiles, profilesId } from './profiles';

export interface config_chat_groupAttributes {
  id: string;
  name_group: string;
  avatar?: string;
}

export type config_chat_groupPk = "id";
export type config_chat_groupId = config_chat_group[config_chat_groupPk];
export type config_chat_groupOptionalAttributes = "avatar";
export type config_chat_groupCreationAttributes = Optional<config_chat_groupAttributes, config_chat_groupOptionalAttributes>;

export class config_chat_group extends Model<config_chat_groupAttributes, config_chat_groupCreationAttributes> implements config_chat_groupAttributes {
  id!: string;
  name_group!: string;
  avatar?: string;

  // config_chat_group hasMany chat_groups via group_chat_id
  chat_groups!: chat_groups[];
  getChat_groups!: Sequelize.HasManyGetAssociationsMixin<chat_groups>;
  setChat_groups!: Sequelize.HasManySetAssociationsMixin<chat_groups, chat_groupsId>;
  addChat_group!: Sequelize.HasManyAddAssociationMixin<chat_groups, chat_groupsId>;
  addChat_groups!: Sequelize.HasManyAddAssociationsMixin<chat_groups, chat_groupsId>;
  createChat_group!: Sequelize.HasManyCreateAssociationMixin<chat_groups>;
  removeChat_group!: Sequelize.HasManyRemoveAssociationMixin<chat_groups, chat_groupsId>;
  removeChat_groups!: Sequelize.HasManyRemoveAssociationsMixin<chat_groups, chat_groupsId>;
  hasChat_group!: Sequelize.HasManyHasAssociationMixin<chat_groups, chat_groupsId>;
  hasChat_groups!: Sequelize.HasManyHasAssociationsMixin<chat_groups, chat_groupsId>;
  countChat_groups!: Sequelize.HasManyCountAssociationsMixin;
  // config_chat_group hasMany chat_messages via to_group
  chat_messages!: chat_messages[];
  getChat_messages!: Sequelize.HasManyGetAssociationsMixin<chat_messages>;
  setChat_messages!: Sequelize.HasManySetAssociationsMixin<chat_messages, chat_messagesId>;
  addChat_message!: Sequelize.HasManyAddAssociationMixin<chat_messages, chat_messagesId>;
  addChat_messages!: Sequelize.HasManyAddAssociationsMixin<chat_messages, chat_messagesId>;
  createChat_message!: Sequelize.HasManyCreateAssociationMixin<chat_messages>;
  removeChat_message!: Sequelize.HasManyRemoveAssociationMixin<chat_messages, chat_messagesId>;
  removeChat_messages!: Sequelize.HasManyRemoveAssociationsMixin<chat_messages, chat_messagesId>;
  hasChat_message!: Sequelize.HasManyHasAssociationMixin<chat_messages, chat_messagesId>;
  hasChat_messages!: Sequelize.HasManyHasAssociationsMixin<chat_messages, chat_messagesId>;
  countChat_messages!: Sequelize.HasManyCountAssociationsMixin;
  // config_chat_group belongsToMany profiles via to_group and uid
  uid_profiles!: profiles[];
  getUid_profiles!: Sequelize.BelongsToManyGetAssociationsMixin<profiles>;
  setUid_profiles!: Sequelize.BelongsToManySetAssociationsMixin<profiles, profilesId>;
  addUid_profile!: Sequelize.BelongsToManyAddAssociationMixin<profiles, profilesId>;
  addUid_profiles!: Sequelize.BelongsToManyAddAssociationsMixin<profiles, profilesId>;
  createUid_profile!: Sequelize.BelongsToManyCreateAssociationMixin<profiles>;
  removeUid_profile!: Sequelize.BelongsToManyRemoveAssociationMixin<profiles, profilesId>;
  removeUid_profiles!: Sequelize.BelongsToManyRemoveAssociationsMixin<profiles, profilesId>;
  hasUid_profile!: Sequelize.BelongsToManyHasAssociationMixin<profiles, profilesId>;
  hasUid_profiles!: Sequelize.BelongsToManyHasAssociationsMixin<profiles, profilesId>;
  countUid_profiles!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof config_chat_group {
    return config_chat_group.init({
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    name_group: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "https:\/\/i.pinimg.com\/originals\/1d\/b1\/6f\/1db16f4c3fb15a1586d308671ddac4cf.jpg"
    }
  }, {
    sequelize,
    tableName: 'config_chat_group',
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
    ]
  });
  }
}
