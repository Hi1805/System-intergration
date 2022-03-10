import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comments, commentsId } from './comments';

export interface comments_photoAttributes {
  photo_id: number;
  comment_id: number;
  photo: string;
  comments_id_comment: number;
}

export type comments_photoPk = "photo_id";
export type comments_photoId = comments_photo[comments_photoPk];
export type comments_photoOptionalAttributes = "photo_id";
export type comments_photoCreationAttributes = Optional<comments_photoAttributes, comments_photoOptionalAttributes>;

export class comments_photo extends Model<comments_photoAttributes, comments_photoCreationAttributes> implements comments_photoAttributes {
  photo_id!: number;
  comment_id!: number;
  photo!: string;
  comments_id_comment!: number;

  // comments_photo belongsTo comments via comment_id
  comment!: comments;
  getComment!: Sequelize.BelongsToGetAssociationMixin<comments>;
  setComment!: Sequelize.BelongsToSetAssociationMixin<comments, commentsId>;
  createComment!: Sequelize.BelongsToCreateAssociationMixin<comments>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comments_photo {
    return comments_photo.init({
    photo_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    comment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'comments',
        key: 'comment_id'
      }
    },
    photo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    comments_id_comment: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comments_photo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "photo_id" },
        ]
      },
      {
        name: "comments_photo_comments",
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
    ]
  });
  }
}
