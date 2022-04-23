import type { Sequelize } from "sequelize";
import { chat_groups as _chat_groups } from "./chat_groups";
import type { chat_groupsAttributes, chat_groupsCreationAttributes } from "./chat_groups";
import { chat_messages as _chat_messages } from "./chat_messages";
import type { chat_messagesAttributes, chat_messagesCreationAttributes } from "./chat_messages";
import { comments as _comments } from "./comments";
import type { commentsAttributes, commentsCreationAttributes } from "./comments";
import { config_chat_group as _config_chat_group } from "./config_chat_group";
import type { config_chat_groupAttributes, config_chat_groupCreationAttributes } from "./config_chat_group";
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
  _chat_groups as chat_groups,
  _chat_messages as chat_messages,
  _comments as comments,
  _config_chat_group as config_chat_group,
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
  chat_groupsAttributes,
  chat_groupsCreationAttributes,
  chat_messagesAttributes,
  chat_messagesCreationAttributes,
  commentsAttributes,
  commentsCreationAttributes,
  config_chat_groupAttributes,
  config_chat_groupCreationAttributes,
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
  const chat_groups = _chat_groups.initModel(sequelize);
  const chat_messages = _chat_messages.initModel(sequelize);
  const comments = _comments.initModel(sequelize);
  const config_chat_group = _config_chat_group.initModel(sequelize);
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

  config_chat_group.belongsToMany(profiles, { as: 'uid_profiles', through: chat_messages, foreignKey: "to_group", otherKey: "uid" });
  profiles.belongsToMany(config_chat_group, { as: 'to_group_config_chat_groups', through: chat_messages, foreignKey: "uid", otherKey: "to_group" });
  chat_groups.belongsTo(config_chat_group, { as: "group_chat", foreignKey: "group_chat_id"});
  config_chat_group.hasMany(chat_groups, { as: "chat_groups", foreignKey: "group_chat_id"});
  chat_messages.belongsTo(config_chat_group, { as: "to_group_config_chat_group", foreignKey: "to_group"});
  config_chat_group.hasMany(chat_messages, { as: "chat_messages", foreignKey: "to_group"});
  users.belongsTo(levels, { as: "level_level", foreignKey: "level"});
  levels.hasMany(users, { as: "users", foreignKey: "level"});
  chat_groups.belongsTo(posts, { as: "for_post_post", foreignKey: "for_post"});
  posts.hasMany(chat_groups, { as: "chat_groups", foreignKey: "for_post"});
  chat_groups.belongsTo(profiles, { as: "member_u", foreignKey: "member_uid"});
  profiles.hasMany(chat_groups, { as: "chat_groups", foreignKey: "member_uid"});
  chat_messages.belongsTo(profiles, { as: "uid_profile", foreignKey: "uid"});
  profiles.hasMany(chat_messages, { as: "chat_messages", foreignKey: "uid"});
  comments.belongsTo(profiles, { as: "uid_profile", foreignKey: "uid"});
  profiles.hasMany(comments, { as: "comments", foreignKey: "uid"});
  profiles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(profiles, { as: "profiles", foreignKey: "user_id"});
  reviews.belongsTo(users, { as: "uid_review_user", foreignKey: "uid_review"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "uid_review"});

  return {
    chat_groups: chat_groups,
    chat_messages: chat_messages,
    comments: comments,
    config_chat_group: config_chat_group,
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
