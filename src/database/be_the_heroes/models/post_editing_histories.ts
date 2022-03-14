import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { posts, postsId } from './posts';

export interface post_editing_historiesAttributes {
  id_post: number;
  created_at?: Date;
  start_date?: Date;
  end_date?: Date;
  residential_address: string;
  district: string;
  province?: string;
  ward?: string;
  phone: string;
}

export type post_editing_historiesPk = "id_post";
export type post_editing_historiesId = post_editing_histories[post_editing_historiesPk];
export type post_editing_historiesOptionalAttributes = "id_post" | "created_at" | "start_date" | "end_date" | "province" | "ward";
export type post_editing_historiesCreationAttributes = Optional<post_editing_historiesAttributes, post_editing_historiesOptionalAttributes>;

export class post_editing_histories extends Model<post_editing_historiesAttributes, post_editing_historiesCreationAttributes> implements post_editing_historiesAttributes {
  id_post!: number;
  created_at?: Date;
  start_date?: Date;
  end_date?: Date;
  residential_address!: string;
  district!: string;
  province?: string;
  ward?: string;
  phone!: string;

  // post_editing_histories belongsTo posts via id_post
  id_post_post!: posts;
  getId_post_post!: Sequelize.BelongsToGetAssociationMixin<posts>;
  setId_post_post!: Sequelize.BelongsToSetAssociationMixin<posts, postsId>;
  createId_post_post!: Sequelize.BelongsToCreateAssociationMixin<posts>;

  static initModel(sequelize: Sequelize.Sequelize): typeof post_editing_histories {
    return post_editing_histories.init({
    id_post: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    residential_address: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    province: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ward: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post_editing_histories',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_post" },
        ]
      },
    ]
  });
  }
}
