import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { organizations, organizationsId } from './organizations';
import type { users, usersId } from './users';

export interface reviewsAttributes {
  id: number;
  user_id: number;
  uid_review: string;
  org_id: number;
  content: string;
  created_at: Date;
}

export type reviewsPk = "id" | "uid_review";
export type reviewsId = reviews[reviewsPk];
export type reviewsOptionalAttributes = "created_at";
export type reviewsCreationAttributes = Optional<reviewsAttributes, reviewsOptionalAttributes>;

export class reviews extends Model<reviewsAttributes, reviewsCreationAttributes> implements reviewsAttributes {
  id!: number;
  user_id!: number;
  uid_review!: string;
  org_id!: number;
  content!: string;
  created_at!: Date;

  // reviews belongsTo organizations via org_id
  org!: organizations;
  getOrg!: Sequelize.BelongsToGetAssociationMixin<organizations>;
  setOrg!: Sequelize.BelongsToSetAssociationMixin<organizations, organizationsId>;
  createOrg!: Sequelize.BelongsToCreateAssociationMixin<organizations>;
  // reviews belongsTo users via uid_review
  uid_review_user!: users;
  getUid_review_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUid_review_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUid_review_user!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // reviews belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof reviews {
    return reviews.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    uid_review: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'uid'
      }
    },
    org_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'org_id'
      }
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reviews',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "uid_review" },
        ]
      },
      {
        name: "reviews_organizations",
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
      {
        name: "reviews_users",
        using: "BTREE",
        fields: [
          { name: "uid_review" },
        ]
      },
      {
        name: "user_id_reviewed",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
