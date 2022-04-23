import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type {
  config_chat_group,
  config_chat_groupId,
} from './config_chat_group';
import type { profiles, profilesId } from './profiles';

export interface chat_messagesAttributes {
  to_group: string;
  id: string;
  uid: string;
  type: 'text' | 'file' | 'img';
  contents: string;
  updated_at: Date;
  created_at: Date;
}

export type chat_messagesPk = 'to_group' | 'id' | 'uid';
export type chat_messagesId = chat_messages[chat_messagesPk];
export type chat_messagesOptionalAttributes = 'updated_at' | 'created_at';
export type chat_messagesCreationAttributes = Optional<
  chat_messagesAttributes,
  chat_messagesOptionalAttributes
>;

export class chat_messages
  extends Model<chat_messagesAttributes, chat_messagesCreationAttributes>
  implements chat_messagesAttributes
{
  to_group!: string;
  id!: string;
  uid!: string;
  type!: 'text' | 'file' | 'img';
  contents!: string;
  updated_at!: Date;
  created_at!: Date;

  // chat_messages belongsTo config_chat_group via to_group
  to_group_config_chat_group!: config_chat_group;
  getTo_group_config_chat_group!: Sequelize.BelongsToGetAssociationMixin<config_chat_group>;
  setTo_group_config_chat_group!: Sequelize.BelongsToSetAssociationMixin<
    config_chat_group,
    config_chat_groupId
  >;
  createTo_group_config_chat_group!: Sequelize.BelongsToCreateAssociationMixin<config_chat_group>;
  // chat_messages belongsTo profiles via uid
  uid_profile!: profiles;
  getUid_profile!: Sequelize.BelongsToGetAssociationMixin<profiles>;
  setUid_profile!: Sequelize.BelongsToSetAssociationMixin<profiles, profilesId>;
  createUid_profile!: Sequelize.BelongsToCreateAssociationMixin<profiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_messages {
    return chat_messages.init(
      {
        to_group: {
          type: DataTypes.STRING(45),
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'config_chat_group',
            key: 'id',
          },
        },
        id: {
          type: DataTypes.STRING(45),
          allowNull: false,
          primaryKey: true,
        },
        uid: {
          type: DataTypes.STRING(100),
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'profiles',
            key: 'uid',
          },
        },
        type: {
          type: DataTypes.ENUM('text', 'file', 'img'),
          allowNull: false,
        },
        contents: {
          type: DataTypes.STRING(1000),
          allowNull: false,
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
        tableName: 'chat_messages',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'to_group' }, { name: 'id' }, { name: 'uid' }],
          },
          {
            name: 'fk_chat_messages_1_idx',
            using: 'BTREE',
            fields: [{ name: 'uid' }],
          },
          {
            name: 'fk_chat_messages_2_idx',
            using: 'BTREE',
            fields: [{ name: 'to_group' }],
          },
          {
            name: 'index4',
            using: 'BTREE',
            fields: [{ name: 'created_at' }],
          },
        ],
      }
    );
  }
}
