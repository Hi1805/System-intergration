import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments_photo, comments_photoId } from './comments_photo';
import type { posts, postsId } from './posts';
import type { users, usersId } from './users';

export interface commentsAttributes {
  uid: string;
  comment_id: number;
  content?: string;
  created_at?: Date;
  updated_at?: Date;
  post_id: number;
  users_user_id: number;
  users_uid: string;
}

export type commentsPk = "comment_id";
export type commentsId = comments[commentsPk];
export type commentsOptionalAttributes = "content" | "created_at" | "updated_at";
export type commentsCreationAttributes = Optional<commentsAttributes, commentsOptionalAttributes>;

export class comments extends Model<commentsAttributes, commentsCreationAttributes> implements commentsAttributes {
  uid!: string;
  comment_id!: number;
  content?: string;
  created_at?: Date;
  updated_at?: Date;
  post_id!: number;
  users_user_id!: number;
  users_uid!: string;

  // comments hasMany comments_photo via comment_id
  comments_photos!: comments_photo[];
  getComments_photos!: Sequelize.HasManyGetAssociationsMixin<comments_photo>;
  setComments_photos!: Sequelize.HasManySetAssociationsMixin<comments_photo, comments_photoId>;
  addComments_photo!: Sequelize.HasManyAddAssociationMixin<comments_photo, comments_photoId>;
  addComments_photos!: Sequelize.HasManyAddAssociationsMixin<comments_photo, comments_photoId>;
  createComments_photo!: Sequelize.HasManyCreateAssociationMixin<comments_photo>;
  removeComments_photo!: Sequelize.HasManyRemoveAssociationMixin<comments_photo, comments_photoId>;
  removeComments_photos!: Sequelize.HasManyRemoveAssociationsMixin<comments_photo, comments_photoId>;
  hasComments_photo!: Sequelize.HasManyHasAssociationMixin<comments_photo, comments_photoId>;
  hasComments_photos!: Sequelize.HasManyHasAssociationsMixin<comments_photo, comments_photoId>;
  countComments_photos!: Sequelize.HasManyCountAssociationsMixin;
  // comments belongsTo posts via post_id
  post!: posts;
  getPost!: Sequelize.BelongsToGetAssociationMixin<posts>;
  setPost!: Sequelize.BelongsToSetAssociationMixin<posts, postsId>;
  createPost!: Sequelize.BelongsToCreateAssociationMixin<posts>;
  // comments belongsTo users via uid
  uid_user!: users;
  getUid_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUid_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUid_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comments {
    return comments.init({
    uid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'users',
        key: 'uid'
      }
    },
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    },
    users_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    users_uid: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "comments_posts",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "comments_users",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
  }
}
