import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { kyc_org, kyc_orgCreationAttributes, kyc_orgId } from './kyc_org';
import type { permissions, permissionsCreationAttributes, permissionsId } from './permissions';
import type { posts, postsId } from './posts';
import type { report_users, report_usersId } from './report_users';
import type { reviews, reviewsId } from './reviews';

export interface organizationsAttributes {
  org_id: number;
  name: string;
  status: number;
  phone: string;
  avatar: string;
  cover_image: string;
  description: string;
}

export type organizationsPk = "org_id";
export type organizationsId = organizations[organizationsPk];
export type organizationsOptionalAttributes = "org_id";
export type organizationsCreationAttributes = Optional<organizationsAttributes, organizationsOptionalAttributes>;

export class organizations extends Model<organizationsAttributes, organizationsCreationAttributes> implements organizationsAttributes {
  org_id!: number;
  name!: string;
  status!: number;
  phone!: string;
  avatar!: string;
  cover_image!: string;
  description!: string;

  // organizations hasOne kyc_org via org_id
  kyc_org!: kyc_org;
  getKyc_org!: Sequelize.HasOneGetAssociationMixin<kyc_org>;
  setKyc_org!: Sequelize.HasOneSetAssociationMixin<kyc_org, kyc_orgId>;
  createKyc_org!: Sequelize.HasOneCreateAssociationMixin<kyc_org>;
  // organizations hasOne permissions via org_id
  permission!: permissions;
  getPermission!: Sequelize.HasOneGetAssociationMixin<permissions>;
  setPermission!: Sequelize.HasOneSetAssociationMixin<permissions, permissionsId>;
  createPermission!: Sequelize.HasOneCreateAssociationMixin<permissions>;
  // organizations hasMany posts via org_id
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
  // organizations hasMany report_users via org_id
  report_users!: report_users[];
  getReport_users!: Sequelize.HasManyGetAssociationsMixin<report_users>;
  setReport_users!: Sequelize.HasManySetAssociationsMixin<report_users, report_usersId>;
  addReport_user!: Sequelize.HasManyAddAssociationMixin<report_users, report_usersId>;
  addReport_users!: Sequelize.HasManyAddAssociationsMixin<report_users, report_usersId>;
  createReport_user!: Sequelize.HasManyCreateAssociationMixin<report_users>;
  removeReport_user!: Sequelize.HasManyRemoveAssociationMixin<report_users, report_usersId>;
  removeReport_users!: Sequelize.HasManyRemoveAssociationsMixin<report_users, report_usersId>;
  hasReport_user!: Sequelize.HasManyHasAssociationMixin<report_users, report_usersId>;
  hasReport_users!: Sequelize.HasManyHasAssociationsMixin<report_users, report_usersId>;
  countReport_users!: Sequelize.HasManyCountAssociationsMixin;
  // organizations hasMany reviews via org_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof organizations {
    return organizations.init({
    org_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    cover_image: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'organizations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
    ]
  });
  }
}
