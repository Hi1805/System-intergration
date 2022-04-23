import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { profiles, profilesId } from './profiles';

export interface commentsAttributes {
  comment_id: number;
  uid: string;
  post_id: number;
  content?: string;
  rep?: number;
  img?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type commentsPk = 'comment_id';
export type commentsId = comments[commentsPk];
export type commentsOptionalAttributes =
  | 'comment_id'
  | 'content'
  | 'rep'
  | 'img'
  | 'created_at'
  | 'updated_at';
export type commentsCreationAttributes = Optional<
  commentsAttributes,
  commentsOptionalAttributes
>;

export class comments
  extends Model<commentsAttributes, commentsCreationAttributes>
  implements commentsAttributes
{
  comment_id!: number;
  uid!: string;
  post_id!: number;
  content?: string;
  rep?: number;
  img?: string;
  created_at?: Date;
  updated_at?: Date;

  // comments belongsTo profiles via uid
  uid_profile!: profiles;
  getUid_profile!: Sequelize.BelongsToGetAssociationMixin<profiles>;
  setUid_profile!: Sequelize.BelongsToSetAssociationMixin<profiles, profilesId>;
  createUid_profile!: Sequelize.BelongsToCreateAssociationMixin<profiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comments {
    return comments.init(
      {
        comment_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        uid: {
          type: DataTypes.STRING(100),
          allowNull: false,
          references: {
            model: 'profiles',
            key: 'uid',
          },
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        rep: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        img: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'comments',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'comment_id' }],
          },
          {
            name: 'comments_posts',
            using: 'BTREE',
            fields: [{ name: 'post_id' }],
          },
          {
            name: 'comments_ibfk_3_idx',
            using: 'BTREE',
            fields: [{ name: 'uid' }],
          },
        ],
      }
    );
  }
}
