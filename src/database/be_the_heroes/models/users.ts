import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments, commentsId } from './comments';
import type { kyc_personal, kyc_personalId } from './kyc_personal';
import type { levels, levelsId } from './levels';
import type { organizations, organizationsId } from './organizations';
import type { permissions, permissionsId } from './permissions';
import type { posts, postsId } from './posts';
import type {
  profiles,
  profilesCreationAttributes,
  profilesId,
} from './profiles';
import type { report_users, report_usersId } from './report_users';
import type { reviews, reviewsId } from './reviews';

export interface usersAttributes {
  user_id: number;
  uid: string;
  level: number;
  username: string;
  is_reported: number;
  is_locked: number;
  role: number;
  is_otp: number;
  password: string;
  email: string;
  status: number;
  updated_at: Date;
  created_at: Date;
  uid_gg?: string;
  uid_fb?: string;
}

export type usersPk = 'user_id' | 'uid' | 'status';
export type usersId = users[usersPk];
export type usersOptionalAttributes =
  | 'user_id'
  | 'updated_at'
  | 'created_at'
  | 'uid_gg'
  | 'uid_fb';
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
  is_reported!: number;
  is_locked!: number;
  role!: number;
  is_otp!: number;
  password!: string;
  email!: string;
  status!: number;
  updated_at!: Date;
  created_at!: Date;
  uid_gg?: string;
  uid_fb?: string;

  // users belongsTo levels via level
  level_level!: levels;
  getLevel_level!: Sequelize.BelongsToGetAssociationMixin<levels>;
  setLevel_level!: Sequelize.BelongsToSetAssociationMixin<levels, levelsId>;
  createLevel_level!: Sequelize.BelongsToCreateAssociationMixin<levels>;
  // users hasMany comments via uid
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
  // users hasMany kyc_personal via uid
  kyc_personals!: kyc_personal[];
  getKyc_personals!: Sequelize.HasManyGetAssociationsMixin<kyc_personal>;
  setKyc_personals!: Sequelize.HasManySetAssociationsMixin<
    kyc_personal,
    kyc_personalId
  >;
  addKyc_personal!: Sequelize.HasManyAddAssociationMixin<
    kyc_personal,
    kyc_personalId
  >;
  addKyc_personals!: Sequelize.HasManyAddAssociationsMixin<
    kyc_personal,
    kyc_personalId
  >;
  createKyc_personal!: Sequelize.HasManyCreateAssociationMixin<kyc_personal>;
  removeKyc_personal!: Sequelize.HasManyRemoveAssociationMixin<
    kyc_personal,
    kyc_personalId
  >;
  removeKyc_personals!: Sequelize.HasManyRemoveAssociationsMixin<
    kyc_personal,
    kyc_personalId
  >;
  hasKyc_personal!: Sequelize.HasManyHasAssociationMixin<
    kyc_personal,
    kyc_personalId
  >;
  hasKyc_personals!: Sequelize.HasManyHasAssociationsMixin<
    kyc_personal,
    kyc_personalId
  >;
  countKyc_personals!: Sequelize.HasManyCountAssociationsMixin;
  // users belongsToMany organizations via user_id and org_id
  org_id_organizations!: organizations[];
  getOrg_id_organizations!: Sequelize.BelongsToManyGetAssociationsMixin<organizations>;
  setOrg_id_organizations!: Sequelize.BelongsToManySetAssociationsMixin<
    organizations,
    organizationsId
  >;
  addOrg_id_organization!: Sequelize.BelongsToManyAddAssociationMixin<
    organizations,
    organizationsId
  >;
  addOrg_id_organizations!: Sequelize.BelongsToManyAddAssociationsMixin<
    organizations,
    organizationsId
  >;
  createOrg_id_organization!: Sequelize.BelongsToManyCreateAssociationMixin<organizations>;
  removeOrg_id_organization!: Sequelize.BelongsToManyRemoveAssociationMixin<
    organizations,
    organizationsId
  >;
  removeOrg_id_organizations!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    organizations,
    organizationsId
  >;
  hasOrg_id_organization!: Sequelize.BelongsToManyHasAssociationMixin<
    organizations,
    organizationsId
  >;
  hasOrg_id_organizations!: Sequelize.BelongsToManyHasAssociationsMixin<
    organizations,
    organizationsId
  >;
  countOrg_id_organizations!: Sequelize.BelongsToManyCountAssociationsMixin;
  // users hasMany permissions via user_id
  permissions!: permissions[];
  getPermissions!: Sequelize.HasManyGetAssociationsMixin<permissions>;
  setPermissions!: Sequelize.HasManySetAssociationsMixin<
    permissions,
    permissionsId
  >;
  addPermission!: Sequelize.HasManyAddAssociationMixin<
    permissions,
    permissionsId
  >;
  addPermissions!: Sequelize.HasManyAddAssociationsMixin<
    permissions,
    permissionsId
  >;
  createPermission!: Sequelize.HasManyCreateAssociationMixin<permissions>;
  removePermission!: Sequelize.HasManyRemoveAssociationMixin<
    permissions,
    permissionsId
  >;
  removePermissions!: Sequelize.HasManyRemoveAssociationsMixin<
    permissions,
    permissionsId
  >;
  hasPermission!: Sequelize.HasManyHasAssociationMixin<
    permissions,
    permissionsId
  >;
  hasPermissions!: Sequelize.HasManyHasAssociationsMixin<
    permissions,
    permissionsId
  >;
  countPermissions!: Sequelize.HasManyCountAssociationsMixin;
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
  // users hasOne profiles via uid
  profile!: profiles;
  getProfile!: Sequelize.HasOneGetAssociationMixin<profiles>;
  setProfile!: Sequelize.HasOneSetAssociationMixin<profiles, profilesId>;
  createProfile!: Sequelize.HasOneCreateAssociationMixin<profiles>;
  // users hasMany report_users via uid_report
  report_users!: report_users[];
  getReport_users!: Sequelize.HasManyGetAssociationsMixin<report_users>;
  setReport_users!: Sequelize.HasManySetAssociationsMixin<
    report_users,
    report_usersId
  >;
  addReport_user!: Sequelize.HasManyAddAssociationMixin<
    report_users,
    report_usersId
  >;
  addReport_users!: Sequelize.HasManyAddAssociationsMixin<
    report_users,
    report_usersId
  >;
  createReport_user!: Sequelize.HasManyCreateAssociationMixin<report_users>;
  removeReport_user!: Sequelize.HasManyRemoveAssociationMixin<
    report_users,
    report_usersId
  >;
  removeReport_users!: Sequelize.HasManyRemoveAssociationsMixin<
    report_users,
    report_usersId
  >;
  hasReport_user!: Sequelize.HasManyHasAssociationMixin<
    report_users,
    report_usersId
  >;
  hasReport_users!: Sequelize.HasManyHasAssociationsMixin<
    report_users,
    report_usersId
  >;
  countReport_users!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany report_users via user_id
  user_report_users!: report_users[];
  getUser_report_users!: Sequelize.HasManyGetAssociationsMixin<report_users>;
  setUser_report_users!: Sequelize.HasManySetAssociationsMixin<
    report_users,
    report_usersId
  >;
  addUser_report_user!: Sequelize.HasManyAddAssociationMixin<
    report_users,
    report_usersId
  >;
  addUser_report_users!: Sequelize.HasManyAddAssociationsMixin<
    report_users,
    report_usersId
  >;
  createUser_report_user!: Sequelize.HasManyCreateAssociationMixin<report_users>;
  removeUser_report_user!: Sequelize.HasManyRemoveAssociationMixin<
    report_users,
    report_usersId
  >;
  removeUser_report_users!: Sequelize.HasManyRemoveAssociationsMixin<
    report_users,
    report_usersId
  >;
  hasUser_report_user!: Sequelize.HasManyHasAssociationMixin<
    report_users,
    report_usersId
  >;
  hasUser_report_users!: Sequelize.HasManyHasAssociationsMixin<
    report_users,
    report_usersId
  >;
  countUser_report_users!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany reviews via uid_review
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
  // users hasMany reviews via user_id
  user_reviews!: reviews[];
  getUser_reviews!: Sequelize.HasManyGetAssociationsMixin<reviews>;
  setUser_reviews!: Sequelize.HasManySetAssociationsMixin<reviews, reviewsId>;
  addUser_review!: Sequelize.HasManyAddAssociationMixin<reviews, reviewsId>;
  addUser_reviews!: Sequelize.HasManyAddAssociationsMixin<reviews, reviewsId>;
  createUser_review!: Sequelize.HasManyCreateAssociationMixin<reviews>;
  removeUser_review!: Sequelize.HasManyRemoveAssociationMixin<
    reviews,
    reviewsId
  >;
  removeUser_reviews!: Sequelize.HasManyRemoveAssociationsMixin<
    reviews,
    reviewsId
  >;
  hasUser_review!: Sequelize.HasManyHasAssociationMixin<reviews, reviewsId>;
  hasUser_reviews!: Sequelize.HasManyHasAssociationsMixin<reviews, reviewsId>;
  countUser_reviews!: Sequelize.HasManyCountAssociationsMixin;
  // users belongsToMany users via uid_report and user_id
  user_id_users_report_users!: users[];
  getUser_id_users_report_users!: Sequelize.BelongsToManyGetAssociationsMixin<users>;
  setUser_id_users_report_users!: Sequelize.BelongsToManySetAssociationsMixin<
    users,
    usersId
  >;
  addUser_id_users_report_user!: Sequelize.BelongsToManyAddAssociationMixin<
    users,
    usersId
  >;
  addUser_id_users_report_users!: Sequelize.BelongsToManyAddAssociationsMixin<
    users,
    usersId
  >;
  createUser_id_users_report_user!: Sequelize.BelongsToManyCreateAssociationMixin<users>;
  removeUser_id_users_report_user!: Sequelize.BelongsToManyRemoveAssociationMixin<
    users,
    usersId
  >;
  removeUser_id_users_report_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    users,
    usersId
  >;
  hasUser_id_users_report_user!: Sequelize.BelongsToManyHasAssociationMixin<
    users,
    usersId
  >;
  hasUser_id_users_report_users!: Sequelize.BelongsToManyHasAssociationsMixin<
    users,
    usersId
  >;
  countUser_id_users_report_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // users belongsToMany users via user_id and uid_report
  uid_report_users!: users[];
  getUid_report_users!: Sequelize.BelongsToManyGetAssociationsMixin<users>;
  setUid_report_users!: Sequelize.BelongsToManySetAssociationsMixin<
    users,
    usersId
  >;
  addUid_report_user!: Sequelize.BelongsToManyAddAssociationMixin<
    users,
    usersId
  >;
  addUid_report_users!: Sequelize.BelongsToManyAddAssociationsMixin<
    users,
    usersId
  >;
  createUid_report_user!: Sequelize.BelongsToManyCreateAssociationMixin<users>;
  removeUid_report_user!: Sequelize.BelongsToManyRemoveAssociationMixin<
    users,
    usersId
  >;
  removeUid_report_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<
    users,
    usersId
  >;
  hasUid_report_user!: Sequelize.BelongsToManyHasAssociationMixin<
    users,
    usersId
  >;
  hasUid_report_users!: Sequelize.BelongsToManyHasAssociationsMixin<
    users,
    usersId
  >;
  countUid_report_users!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init(
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
          type: DataTypes.STRING(100),
          allowNull: false,
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
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          primaryKey: true,
        },
        uid_gg: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        uid_fb: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
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
            fields: [{ name: 'user_id' }, { name: 'uid' }, { name: 'status' }],
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
  }
}
