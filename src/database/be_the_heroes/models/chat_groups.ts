import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type {
  config_chat_group,
  config_chat_groupId,
} from './config_chat_group';
import type { posts, postsId } from './posts';
import type { profiles, profilesId } from './profiles';

export interface chat_groupsAttributes {
  id: number;
  for_post?: number;
  member_uid: string;
  group_chat_id: string;
  created_at: Date;
  updated_at: Date;
}

export type chat_groupsPk = 'id';
export type chat_groupsId = chat_groups[chat_groupsPk];
export type chat_groupsOptionalAttributes =
  | 'id'
  | 'for_post'
  | 'created_at'
  | 'updated_at';
export type chat_groupsCreationAttributes = Optional<
  chat_groupsAttributes,
  chat_groupsOptionalAttributes
>;

export class chat_groups
  extends Model<chat_groupsAttributes, chat_groupsCreationAttributes>
  implements chat_groupsAttributes
{
  id!: number;
  for_post?: number;
  member_uid!: string;
  group_chat_id!: string;
  created_at!: Date;
  updated_at!: Date;

  // chat_groups belongsTo config_chat_group via group_chat_id
  group_chat!: config_chat_group;
  getGroup_chat!: Sequelize.BelongsToGetAssociationMixin<config_chat_group>;
  setGroup_chat!: Sequelize.BelongsToSetAssociationMixin<
    config_chat_group,
    config_chat_groupId
  >;
  createGroup_chat!: Sequelize.BelongsToCreateAssociationMixin<config_chat_group>;
  // chat_groups belongsTo posts via for_post
  for_post_post!: posts;
  getFor_post_post!: Sequelize.BelongsToGetAssociationMixin<posts>;
  setFor_post_post!: Sequelize.BelongsToSetAssociationMixin<posts, postsId>;
  createFor_post_post!: Sequelize.BelongsToCreateAssociationMixin<posts>;
  // chat_groups belongsTo profiles via member_uid
  member_u!: profiles;
  getMember_u!: Sequelize.BelongsToGetAssociationMixin<profiles>;
  setMember_u!: Sequelize.BelongsToSetAssociationMixin<profiles, profilesId>;
  createMember_u!: Sequelize.BelongsToCreateAssociationMixin<profiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chat_groups {
    return chat_groups.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        for_post: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'posts',
            key: 'post_id',
          },
        },
        member_uid: {
          type: DataTypes.STRING(100),
          allowNull: false,
          references: {
            model: 'profiles',
            key: 'uid',
          },
        },
        group_chat_id: {
          type: DataTypes.STRING(45),
          allowNull: false,
          references: {
            model: 'config_chat_group',
            key: 'id',
          },
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
        tableName: 'chat_groups',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'fk_chat_groups_2_idx',
            using: 'BTREE',
            fields: [{ name: 'member_uid' }],
          },
          {
            name: 'fk_chat_groups_1_idx',
            using: 'BTREE',
            fields: [{ name: 'for_post' }],
          },
          {
            name: 'fk_chat_groups_3_idx',
            using: 'BTREE',
            fields: [{ name: 'group_chat_id' }],
          },
        ],
      }
    );
  }
}
