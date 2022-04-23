import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chat_groups, chat_groupsId } from './chat_groups';

export interface postsAttributes {
  post_id: number;
  uid?: string;
  user_id?: number;
  org_id?: number;
  residential_address?: string;
  status: string;
  ward?: string;
  district?: string;
  long?: number;
  lat?: number;
  is_edited: number;
  type?: 'share' | 'post';
  end_date?: Date;
  start_date?: Date;
  updated_at?: Date;
  from_post?: number;
  content_share?: string;
  photos?: string;
  title?: string;
  joined?: string;
  join_url?: string;
  content?: string;
  fullname?: string;
  avatar?: string;
  province?: string;
}

export type postsPk = "post_id";
export type postsId = posts[postsPk];
export type postsOptionalAttributes = "post_id" | "uid" | "user_id" | "org_id" | "residential_address" | "ward" | "district" | "long" | "lat" | "type" | "end_date" | "start_date" | "updated_at" | "from_post" | "content_share" | "photos" | "title" | "joined" | "join_url" | "content" | "fullname" | "avatar" | "province";
export type postsCreationAttributes = Optional<postsAttributes, postsOptionalAttributes>;

export class posts extends Model<postsAttributes, postsCreationAttributes> implements postsAttributes {
  post_id!: number;
  uid?: string;
  user_id?: number;
  org_id?: number;
  residential_address?: string;
  status!: string;
  ward?: string;
  district?: string;
  long?: number;
  lat?: number;
  is_edited!: number;
  type?: 'share' | 'post';
  end_date?: Date;
  start_date?: Date;
  updated_at?: Date;
  from_post?: number;
  content_share?: string;
  photos?: string;
  title?: string;
  joined?: string;
  join_url?: string;
  content?: string;
  fullname?: string;
  avatar?: string;
  province?: string;

  // posts hasMany chat_groups via for_post
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

  static initModel(sequelize: Sequelize.Sequelize): typeof posts {
    return posts.init({
    post_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    org_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    long: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_edited: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
      type: DataTypes.INTEGER,
      allowNull: true
    },
    content_share: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    joined: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    join_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(45),
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
