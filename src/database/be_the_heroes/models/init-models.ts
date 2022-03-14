import type { Sequelize } from "sequelize";
import { comments as _comments } from "./comments";
import type { commentsAttributes, commentsCreationAttributes } from "./comments";
import { comments_photo as _comments_photo } from "./comments_photo";
import type { comments_photoAttributes, comments_photoCreationAttributes } from "./comments_photo";
import { kyc_org as _kyc_org } from "./kyc_org";
import type { kyc_orgAttributes, kyc_orgCreationAttributes } from "./kyc_org";
import { kyc_personal as _kyc_personal } from "./kyc_personal";
import type { kyc_personalAttributes, kyc_personalCreationAttributes } from "./kyc_personal";
import { levels as _levels } from "./levels";
import type { levelsAttributes, levelsCreationAttributes } from "./levels";
import { organizations as _organizations } from "./organizations";
import type { organizationsAttributes, organizationsCreationAttributes } from "./organizations";
import { permissions as _permissions } from "./permissions";
import type { permissionsAttributes, permissionsCreationAttributes } from "./permissions";
import { post_editing_histories as _post_editing_histories } from "./post_editing_histories";
import type { post_editing_historiesAttributes, post_editing_historiesCreationAttributes } from "./post_editing_histories";
import { posts as _posts } from "./posts";
import type { postsAttributes, postsCreationAttributes } from "./posts";
import { profiles as _profiles } from "./profiles";
import type { profilesAttributes, profilesCreationAttributes } from "./profiles";
import { reasons_kyc as _reasons_kyc } from "./reasons_kyc";
import type { reasons_kycAttributes, reasons_kycCreationAttributes } from "./reasons_kyc";
import { reasons_report as _reasons_report } from "./reasons_report";
import type { reasons_reportAttributes, reasons_reportCreationAttributes } from "./reasons_report";
import { report_users as _report_users } from "./report_users";
import type { report_usersAttributes, report_usersCreationAttributes } from "./report_users";
import { reviews as _reviews } from "./reviews";
import type { reviewsAttributes, reviewsCreationAttributes } from "./reviews";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _comments as comments,
  _comments_photo as comments_photo,
  _kyc_org as kyc_org,
  _kyc_personal as kyc_personal,
  _levels as levels,
  _organizations as organizations,
  _permissions as permissions,
  _post_editing_histories as post_editing_histories,
  _posts as posts,
  _profiles as profiles,
  _reasons_kyc as reasons_kyc,
  _reasons_report as reasons_report,
  _report_users as report_users,
  _reviews as reviews,
  _users as users,
};

export type {
  commentsAttributes,
  commentsCreationAttributes,
  comments_photoAttributes,
  comments_photoCreationAttributes,
  kyc_orgAttributes,
  kyc_orgCreationAttributes,
  kyc_personalAttributes,
  kyc_personalCreationAttributes,
  levelsAttributes,
  levelsCreationAttributes,
  organizationsAttributes,
  organizationsCreationAttributes,
  permissionsAttributes,
  permissionsCreationAttributes,
  post_editing_historiesAttributes,
  post_editing_historiesCreationAttributes,
  postsAttributes,
  postsCreationAttributes,
  profilesAttributes,
  profilesCreationAttributes,
  reasons_kycAttributes,
  reasons_kycCreationAttributes,
  reasons_reportAttributes,
  reasons_reportCreationAttributes,
  report_usersAttributes,
  report_usersCreationAttributes,
  reviewsAttributes,
  reviewsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const comments = _comments.initModel(sequelize);
  const comments_photo = _comments_photo.initModel(sequelize);
  const kyc_org = _kyc_org.initModel(sequelize);
  const kyc_personal = _kyc_personal.initModel(sequelize);
  const levels = _levels.initModel(sequelize);
  const organizations = _organizations.initModel(sequelize);
  const permissions = _permissions.initModel(sequelize);
  const post_editing_histories = _post_editing_histories.initModel(sequelize);
  const posts = _posts.initModel(sequelize);
  const profiles = _profiles.initModel(sequelize);
  const reasons_kyc = _reasons_kyc.initModel(sequelize);
  const reasons_report = _reasons_report.initModel(sequelize);
  const report_users = _report_users.initModel(sequelize);
  const reviews = _reviews.initModel(sequelize);
  const users = _users.initModel(sequelize);

  comments_photo.belongsTo(comments, { as: "comment", foreignKey: "comment_id"});
  comments.hasMany(comments_photo, { as: "comments_photos", foreignKey: "comment_id"});
  users.belongsTo(levels, { as: "level_level", foreignKey: "level"});
  levels.hasMany(users, { as: "users", foreignKey: "level"});
  kyc_org.belongsTo(organizations, { as: "org", foreignKey: "org_id"});
  organizations.hasOne(kyc_org, { as: "kyc_org", foreignKey: "org_id"});
  permissions.belongsTo(organizations, { as: "org", foreignKey: "org_id"});
  organizations.hasOne(permissions, { as: "permission", foreignKey: "org_id"});
  posts.belongsTo(organizations, { as: "org", foreignKey: "org_id"});
  organizations.hasMany(posts, { as: "posts", foreignKey: "org_id"});
  report_users.belongsTo(organizations, { as: "org", foreignKey: "org_id"});
  organizations.hasMany(report_users, { as: "report_users", foreignKey: "org_id"});
  reviews.belongsTo(organizations, { as: "org", foreignKey: "org_id"});
  organizations.hasMany(reviews, { as: "reviews", foreignKey: "org_id"});
  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  post_editing_histories.belongsTo(posts, { as: "id_post_post", foreignKey: "id_post"});
  posts.hasOne(post_editing_histories, { as: "post_editing_history", foreignKey: "id_post"});
  kyc_org.belongsTo(reasons_kyc, { as: "reason", foreignKey: "reason_id"});
  reasons_kyc.hasMany(kyc_org, { as: "kyc_orgs", foreignKey: "reason_id"});
  kyc_personal.belongsTo(reasons_kyc, { as: "reason", foreignKey: "reason_id"});
  reasons_kyc.hasMany(kyc_personal, { as: "kyc_personals", foreignKey: "reason_id"});
  report_users.belongsTo(reasons_report, { as: "reason", foreignKey: "reason_id"});
  reasons_report.hasMany(report_users, { as: "report_users", foreignKey: "reason_id"});
  comments.belongsTo(users, { as: "uid_user", foreignKey: "uid"});
  users.hasMany(comments, { as: "comments", foreignKey: "uid"});
  permissions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(permissions, { as: "permissions", foreignKey: "user_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  profiles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(profiles, { as: "profile", foreignKey: "user_id"});
  report_users.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(report_users, { as: "report_users", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "uid_review_user", foreignKey: "uid_review"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "uid_review"});
  reviews.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(reviews, { as: "user_reviews", foreignKey: "user_id"});

  return {
    comments: comments,
    comments_photo: comments_photo,
    kyc_org: kyc_org,
    kyc_personal: kyc_personal,
    levels: levels,
    organizations: organizations,
    permissions: permissions,
    post_editing_histories: post_editing_histories,
    posts: posts,
    profiles: profiles,
    reasons_kyc: reasons_kyc,
    reasons_report: reasons_report,
    report_users: report_users,
    reviews: reviews,
    users: users,
  };
}
