import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments, commentsId } from './comments';
import type { organizations, organizationsId } from './organizations';
import type { post_editing_histories, post_editing_historiesCreationAttributes, post_editing_historiesId } from './post_editing_histories';
import type { users, usersId } from './users';

export interface postsAttributes {
  post_id: number;
  uid?: string;
  org_id?: number;
  residential_address?: string;
  status: string;
  ward: string;
  district: string;
  long: number;
  lat: number;
  is_edited: number;
  user_id?: number;
  type?: 'share' | 'post';
  end_date?: Date;
  start_date?: Date;
  updated_at?: Date;
  from_post?: number;
  content_share?: string;
}

export type postsPk = "post_id";
export type postsId = posts[postsPk];
export type postsOptionalAttributes = "post_id" | "uid" | "org_id" | "residential_address" | "user_id" | "type" | "end_date" | "start_date" | "updated_at" | "from_post" | "content_share";
export type postsCreationAttributes = Optional<postsAttributes, postsOptionalAttributes>;

export class posts extends Model<postsAttributes, postsCreationAttributes> implements postsAttributes {
  post_id!: number;
  uid?: string;
  org_id?: number;
  residential_address?: string;
  status!: string;
  ward!: string;
  district!: string;
  long!: number;
  lat!: number;
  is_edited!: number;
  user_id?: number;
  type?: 'share' | 'post';
  end_date?: Date;
  start_date?: Date;
  updated_at?: Date;
  from_post?: number;
  content_share?: string;

  // posts belongsTo organizations via org_id
  org!: organizations;
  getOrg!: Sequelize.BelongsToGetAssociationMixin<organizations>;
  setOrg!: Sequelize.BelongsToSetAssociationMixin<organizations, organizationsId>;
  createOrg!: Sequelize.BelongsToCreateAssociationMixin<organizations>;
  // posts hasMany comments via post_id
  comments!: comments[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<comments>;
  setComments!: Sequelize.HasManySetAssociationsMixin<comments, commentsId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<comments, commentsId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<comments, commentsId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<comments>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<comments, commentsId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<comments, commentsId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<comments, commentsId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<comments, commentsId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // posts hasOne post_editing_histories via id_post
  post_editing_history!: post_editing_histories;
  getPost_editing_history!: Sequelize.HasOneGetAssociationMixin<post_editing_histories>;
  setPost_editing_history!: Sequelize.HasOneSetAssociationMixin<post_editing_histories, post_editing_historiesId>;
  createPost_editing_history!: Sequelize.HasOneCreateAssociationMixin<post_editing_histories>;
  // posts belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof posts {
    return posts.init({
    post_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    org_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'organizations',
        key: 'org_id'
      }
    },
    residential_address: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ward: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    long: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_edited: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    type: {
      type: DataTypes.ENUM('share','post'),
      allowNull: true,
      defaultValue: "post"
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    from_post: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    content_share: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'posts',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "id_post",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "posts_organizations",
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
      {
        name: "posts_users",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
